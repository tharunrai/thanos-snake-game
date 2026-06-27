import { GauntletState } from "../../types/game";
import { STONE_COLORS, STONE_ORDER } from "../../lib/constants";

export function GauntletHUD({ gauntlet }: { gauntlet: GauntletState }) {
  const collectedCount = STONE_ORDER.filter(s => gauntlet.slots[s]).length;

  return (
    <div className="absolute bottom-10 right-10 w-[300px] bg-[rgba(10,10,15,0.8)] border border-[rgba(201,168,76,0.3)] p-[20px] rounded-[4px] backdrop-blur-[10px] z-10 pointer-events-none">
      <div className="text-[11px] uppercase tracking-[3px] text-[#C9A84C] mb-[15px] flex justify-between font-sans">
        <span>Infinity Gauntlet</span>
        <span>{collectedCount}/6</span>
      </div>
      <div className="grid grid-cols-6 gap-[10px]">
        {STONE_ORDER.map((stoneType) => {
          const isActive = gauntlet.slots[stoneType];
          const color = STONE_COLORS[stoneType];
          return (
            <div 
              key={stoneType}
              className="h-[40px] border flex items-center justify-center relative transition-all duration-300"
              style={{
                borderColor: isActive ? color : 'rgba(255,255,255,0.1)',
                backgroundColor: isActive ? `${color}44` : 'rgba(255,255,255,0.05)',
                opacity: isActive ? 1 : 0.3
              }}
            >
              {isActive && (
                <div 
                  className="absolute inset-[4px]"
                  style={{ boxShadow: `0 0 15px ${color}` }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {gauntlet.snapCount > 0 ? (
        <div className="mt-[20px] text-[10px] text-white/40 text-center uppercase tracking-[1px] font-mono">
          SNAPS COMPLETED: {gauntlet.snapCount}
        </div>
      ) : (
        <div className="mt-[20px] text-[10px] text-white/40 text-center uppercase tracking-[1px] font-sans">
          {collectedCount === 6 ? "THE SNAP IS INEVITABLE" : "Collect the Mind Stone to initiate THE SNAP"}
        </div>
      )}
    </div>
  );
}
