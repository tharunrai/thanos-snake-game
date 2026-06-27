import { GameState } from "../../types/game";
import { useEffect, useState } from "react";
import { STONE_COLORS } from "../../lib/constants";

export function ActivePowerUp({ state }: { state: GameState }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!state.activeEffect) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      const remaining = state.activeEffect!.expiresAt - Date.now();
      const total = 4000;
      
      if (remaining <= 0) {
        setProgress(0);
      } else {
        setProgress(Math.min(100, Math.max(0, (remaining / total) * 100)));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [state.activeEffect]);

  if (!state.activeEffect || progress <= 0) return null;

  const color = STONE_COLORS[state.activeEffect.stoneType];

  return (
    <div className="absolute bottom-[40px] left-[40px] w-[200px] z-10 pointer-events-none">
      <div className="text-[10px] uppercase tracking-[2px] mb-[8px] font-sans" style={{ color: color }}>
        {state.activeEffect.stoneType} Stone Active
      </div>
      <div className="h-[4px] w-full bg-[rgba(255,255,255,0.1)] relative">
        <div 
          className="h-full transition-all duration-75 ease-linear absolute left-0 top-0"
          style={{ 
            width: `${progress}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
        />
      </div>
    </div>
  );
}
