export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type GameStatus = "IDLE" | "PLAYING" | "PAUSED" | "SNAP_EVENT" | "GAME_OVER";
export type StoneType = "POWER" | "SPACE" | "REALITY" | "SOUL" | "TIME" | "MIND";

export interface Position {
  x: number;
  y: number;
}

export interface WorldPosition {
  x: number;
  y: number;
  z: number;
}

export interface InfinityStone {
  type: StoneType;
  position: Position;
  color: string;
  collected: boolean;
}

export interface GauntletState {
  slots: Record<StoneType, boolean>;
  snapCount: number;
  isSnapping: boolean;
}

export interface ActiveEffect {
  stoneType: StoneType;
  expiresAt: number;
}

export interface Obstacle {
  id: string;
  type: "CHITAURI" | "LEVIATHAN" | "BLACK_ORDER" | "DEBRIS";
  positions: Position[];
  velocity?: Position;
}

export interface SnakeState {
  body: Position[];
  direction: Direction;
  nextDirection: Direction;
}

export interface GameState {
  status: GameStatus;
  snake: SnakeState;
  currentStone: InfinityStone | null;
  gauntlet: GauntletState;
  activeEffect: ActiveEffect | null;
  obstacles: Obstacle[];
  score: number;
  highScore: number;
  scoreMultiplier: number;
  tick: number;
}
