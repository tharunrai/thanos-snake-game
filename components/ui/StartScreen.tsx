export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#050508]/90 backdrop-blur-sm text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop" alt="Cosmic Background" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700 relative z-10">
        <h1 className="text-6xl text-[#C9A84C] font-bold uppercase tracking-[0.1em] font-serif" style={{ textShadow: '0 0 20px rgba(201,168,76,0.5)' }}>
          Thanos Snake
        </h1>
        <p className="text-[#F0F0FF]/70 max-w-md text-lg font-serif italic tracking-[2px] uppercase">
          Collect the Infinity Stones. <br/>
          Restore balance.
        </p>
        
        <button 
          onClick={onStart}
          className="mt-12 px-10 py-3 border border-[#C9A84C] bg-[rgba(201,168,76,0.1)] hover:bg-[rgba(201,168,76,0.3)] text-[#C9A84C] font-mono text-sm transition-all shadow-[0_0_15px_rgba(201,168,76,0.2)] hover:shadow-[0_0_30px_rgba(201,168,76,0.6)] uppercase tracking-[4px]"
        >
          Initialize
        </button>
      </div>
    </div>
  );
}
