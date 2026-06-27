import { useReducer, useEffect, useCallback } from "react";
import { Direction, GameState, Position, StoneType } from "../types/game";
import { GRID_SIZE, STONE_ORDER, STONE_COLORS, POST_SNAP_DURATION, POST_SNAP_MULTIPLIER } from "../lib/constants";

type Action = 
  | { type: "START_GAME" }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" }
  | { type: "SET_DIRECTION"; payload: Direction }
  | { type: "TICK" }
  | { type: "END_SNAP_EVENT" };

const getInitialSnake = () => ({
  body: [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ],
  direction: "UP" as Direction,
  nextDirection: "UP" as Direction,
});

const getEmptyGauntlet = () => ({
  slots: { POWER: false, SPACE: false, REALITY: false, SOUL: false, TIME: false, MIND: false },
  snapCount: 0,
  isSnapping: false,
});

const generateRandomPos = (): Position => {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
};

const getInitialState = (): GameState => ({
  status: "IDLE",
  snake: getInitialSnake(),
  currentStone: null,
  gauntlet: getEmptyGauntlet(),
  activeEffect: null,
  obstacles: [],
  score: 0,
  highScore: typeof window !== "undefined" ? parseInt(localStorage.getItem("thanos_snake_highscore") || "0", 10) : 0,
  scoreMultiplier: 1,
  tick: 0,
});

function spawnStone(state: GameState): GameState {
  const missingStones = STONE_ORDER.filter(s => !state.gauntlet.slots[s]);
  if (missingStones.length === 0) return state; // Should trigger snap
  const stoneType = missingStones[Math.floor(Math.random() * missingStones.length)];
  
  let pos = generateRandomPos();
  // Simplified collision check for spawn
  while (state.snake.body.some(s => s.x === pos.x && s.y === pos.y)) {
    pos = generateRandomPos();
  }
  
  return {
    ...state,
    currentStone: {
      type: stoneType,
      position: pos,
      color: STONE_COLORS[stoneType],
      collected: false,
    }
  };
}

function checkCollisions(state: GameState, oldTail: Position): GameState {
  let head = { ...state.snake.body[0] };
  const isGhost = state.activeEffect?.stoneType === "SPACE";
  
  // Wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    if (isGhost) {
      // Wrap around
      head.x = (head.x + GRID_SIZE) % GRID_SIZE;
      head.y = (head.y + GRID_SIZE) % GRID_SIZE;
      state.snake.body[0] = head;
    } else {
      return { ...state, status: "GAME_OVER" };
    }
  }

  // Self collision
  for (let i = 1; i < state.snake.body.length; i++) {
    if (head.x === state.snake.body[i].x && head.y === state.snake.body[i].y) {
      return { ...state, status: "GAME_OVER" };
    }
  }

  // Obstacle collision
  for (const obs of state.obstacles) {
    if (obs.positions.some(p => p.x === head.x && p.y === head.y)) {
      if (isGhost) continue;
      return { ...state, status: "GAME_OVER" };
    }
  }

  // Stone collision
  if (state.currentStone && head.x === state.currentStone.position.x && head.y === state.currentStone.position.y) {
    // Collect stone
    const newGauntlet = { ...state.gauntlet, slots: { ...state.gauntlet.slots, [state.currentStone.type]: true } };
    
    let newScore = state.score + 10 * state.scoreMultiplier;
    let newBody = [...state.snake.body, oldTail];
    let newActiveEffect = { stoneType: state.currentStone.type, expiresAt: Date.now() + 4000 };

    if (state.currentStone.type === "SOUL") {
      newBody = newBody.slice(0, Math.max(1, newBody.length - 3));
      newScore += 50 * state.scoreMultiplier;
    }
    if (state.currentStone.type === "SPACE") newActiveEffect.expiresAt = Date.now() + 6000;
    if (state.currentStone.type === "REALITY") newActiveEffect.expiresAt = Date.now() + 5000;
    if (state.currentStone.type === "TIME") newActiveEffect.expiresAt = Date.now() + 3000;
    if (state.currentStone.type === "MIND") newActiveEffect.expiresAt = Date.now() + 8000;

    let nextState = {
      ...state,
      score: newScore,
      snake: { ...state.snake, body: newBody },
      gauntlet: newGauntlet,
      activeEffect: newActiveEffect,
      currentStone: null,
    };

    // Check for snap
    if (Object.values(newGauntlet.slots).every(v => v)) {
      return {
        ...nextState,
        status: "SNAP_EVENT",
        gauntlet: { ...newGauntlet, isSnapping: true, snapCount: newGauntlet.snapCount + 1 },
      };
    }

    return spawnStone(nextState);
  }

  return state;
}

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START_GAME": {
      let newState = getInitialState();
      newState.status = "PLAYING";
      newState.gauntlet.snapCount = state.gauntlet.snapCount;
      newState = spawnStone(newState);
      return newState;
    }
    case "PAUSE_GAME":
      return state.status === "PLAYING" ? { ...state, status: "PAUSED" } : state;
    case "RESUME_GAME":
      return state.status === "PAUSED" ? { ...state, status: "PLAYING" } : state;
    case "SET_DIRECTION": {
      const isOpposite = 
        (action.payload === "UP" && state.snake.direction === "DOWN") ||
        (action.payload === "DOWN" && state.snake.direction === "UP") ||
        (action.payload === "LEFT" && state.snake.direction === "RIGHT") ||
        (action.payload === "RIGHT" && state.snake.direction === "LEFT");
      
      const isTimeStoneActive = state.activeEffect?.stoneType === "TIME";
      
      if (!isOpposite || isTimeStoneActive) {
        return {
          ...state,
          snake: { ...state.snake, nextDirection: action.payload }
        };
      }
      return state;
    }
    case "TICK": {
      if (state.status !== "PLAYING") return state;

      // Update effects
      let newActiveEffect = state.activeEffect;
      if (newActiveEffect && Date.now() > newActiveEffect.expiresAt) {
        newActiveEffect = null;
      }
      
      let newScoreMultiplier = state.scoreMultiplier;

      const currentDir = state.snake.nextDirection;
      const head = state.snake.body[0];
      const oldTail = state.snake.body[state.snake.body.length - 1];
      const newHead = { ...head };

      if (currentDir === "UP") newHead.y -= 1;
      if (currentDir === "DOWN") newHead.y += 1;
      if (currentDir === "LEFT") newHead.x -= 1;
      if (currentDir === "RIGHT") newHead.x += 1;

      const newBody = [newHead, ...state.snake.body.slice(0, -1)];
      
      let nextState = {
        ...state,
        tick: state.tick + 1,
        activeEffect: newActiveEffect,
        snake: { ...state.snake, body: newBody, direction: currentDir },
      };

      nextState = checkCollisions(nextState, oldTail);
      
      if (nextState.status === "GAME_OVER") {
        if (nextState.score > nextState.highScore) {
          nextState.highScore = nextState.score;
          if (typeof window !== "undefined") {
            localStorage.setItem("thanos_snake_highscore", nextState.score.toString());
          }
        }
      }

      return nextState;
    }
    case "END_SNAP_EVENT": {
      return spawnStone({
        ...state,
        status: "PLAYING",
        gauntlet: { ...getEmptyGauntlet(), snapCount: state.gauntlet.snapCount },
        snake: { ...state.snake, body: state.snake.body.slice(0, Math.ceil(state.snake.body.length / 2)) },
        obstacles: [],
        scoreMultiplier: POST_SNAP_MULTIPLIER,
        activeEffect: { stoneType: "POWER" as StoneType, expiresAt: Date.now() + POST_SNAP_DURATION }
      });
    }
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, getInitialState());

  const startGame = useCallback(() => dispatch({ type: "START_GAME" }), []);
  const pauseGame = useCallback(() => dispatch({ type: "PAUSE_GAME" }), []);
  const resumeGame = useCallback(() => dispatch({ type: "RESUME_GAME" }), []);
  const setDirection = useCallback((dir: Direction) => dispatch({ type: "SET_DIRECTION", payload: dir }), []);
  const tick = useCallback(() => dispatch({ type: "TICK" }), []);
  const endSnapEvent = useCallback(() => dispatch({ type: "END_SNAP_EVENT" }), []);

  return { state, startGame, pauseGame, resumeGame, setDirection, tick, endSnapEvent };
}
