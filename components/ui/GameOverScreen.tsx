import { GameState } from "../../types/game";

export function GameOverScreen({ state, onRestart }: { state: GameState, onRestart: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050508]/90 backdrop-blur-sm text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop" alt="Cosmic Background" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center gap-6 p-12 bg-[rgba(10,10,15,0.8)] border border-[rgba(239,68,68,0.3)] rounded-[4px] shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-in fade-in slide-in-from-bottom-10 duration-500 relative z-10">
        <h2 className="text-5xl text-[#EF4444] font-bold uppercase tracking-[0.2em] font-serif mb-2" style={{ textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>
          Inevitable
        </h2>
        
        <div className="text-white/80 text-xl flex flex-col gap-3 font-mono mb-6 uppercase tracking-widest">
          <p className="text-sm text-[#C9A84C]">Final Score</p>
          <p className="text-4xl text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{state.score.toString().padStart(6, '0')}</p>
        </div>

        <button 
          onClick={onRestart}
          className="px-10 py-3 border border-[#EF4444] bg-[rgba(239,68,68,0.1)] hover:bg-[rgba(239,68,68,0.3)] text-[#EF4444] font-mono text-sm transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] uppercase tracking-[4px]"
        >
          Reset Timeline
        </button>
      </div>
    </div>
  );
}
