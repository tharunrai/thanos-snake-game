import { useEffect } from "react";
import { Direction } from "../types/game";

export function useKeyboard(setDirection: (dir: Direction) => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          setDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          setDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setDirection]);
}
