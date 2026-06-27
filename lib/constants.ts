import { StoneType } from "../types/game";

export const GRID_SIZE = 20;
export const BASE_TICK_MS = 160;
export const MIN_TICK_MS = 55;
export const SPEED_STEP_SCORE = 5;
export const MAX_OBSTACLES = 6;
export const OBSTACLE_SCORE_STEP = 10;
export const POST_SNAP_MULTIPLIER = 3;
export const POST_SNAP_DURATION = 15000;
export const STONE_ORDER: StoneType[] = [
  "POWER", "SPACE", "REALITY", "SOUL", "TIME", "MIND"
];

export const STONE_COLORS: Record<StoneType, string> = {
  POWER: "#7B2FBE",
  SPACE: "#3B82F6",
  REALITY: "#EF4444",
  SOUL: "#F97316",
  TIME: "#10B981",
  MIND: "#EAB308",
};
