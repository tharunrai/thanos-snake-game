import { GameState } from "../../types/game";

export function ScoreDisplay({ state }: { state: GameState }) {
  return (
    <div className="absolute top-10 left-10 right-10 z-10 pointer-events-none select-none flex justify-between items-start">
      <div className="font-mono text-left">
        <div className="text-[12px] uppercase tracking-[4px] text-[#C9A84C] mb-1">
          Eternity Score
        </div>
        <div className="text-5xl font-black text-[#F0F0FF] drop-shadow-[0_0_10px_rgba(240,240,255,0.4)]">
          {state.score.toString().padStart(6, '0')}
        </div>
        <div className="text-[10px] uppercase tracking-[2px] text-white/50 mt-1">
          High: {state.highScore.toString().padStart(6, '0')}
        </div>
      </div>
      
      <div className="hidden md:block font-serif italic text-[18px] uppercase tracking-[2px] text-white/60 border-l border-[#C9A84C] pl-5">
        Perfectly Balanced,<br/>as all things should be.
      </div>
      
      {state.scoreMultiplier > 1 && (
        <div className="absolute top-24 left-0 text-[#EF4444] text-lg font-bold mt-2 animate-pulse font-mono tracking-widest">
          {state.scoreMultiplier}x MULTIPLIER
        </div>
      )}
    </div>
  );
}
