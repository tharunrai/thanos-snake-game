import { Position, WorldPosition } from "../types/game";

export const CELL_SIZE = 1.1;
export const GRID_OFFSET = 10;

export function gridToWorld(pos: Position): WorldPosition {
  return {
    x: (pos.x - GRID_OFFSET) * CELL_SIZE,
    y: 0,
    z: (pos.y - GRID_OFFSET) * CELL_SIZE,
  };
}
