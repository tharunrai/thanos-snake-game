import { useEffect, useRef } from "react";
import { BASE_TICK_MS, MIN_TICK_MS, SPEED_STEP_SCORE } from "../lib/constants";
import { GameStatus } from "../types/game";

export function useGameLoop(
  status: GameStatus,
  score: number,
  isPowerActive: boolean,
  tick: () => void
) {
  const requestRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    if (status !== "PLAYING") {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const loop = (time: number) => {
      let currentTickMs = Math.max(MIN_TICK_MS, BASE_TICK_MS - Math.floor(score / SPEED_STEP_SCORE) * 10);
      if (isPowerActive) currentTickMs /= 3; // +200% speed

      if (time - lastTickRef.current >= currentTickMs) {
        tick();
        lastTickRef.current = time;
      }
      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [status, score, isPowerActive, tick]);
}
