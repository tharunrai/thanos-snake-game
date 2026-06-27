"use client";

import { useGameState } from "../hooks/useGameState";
import { useKeyboard } from "../hooks/useKeyboard";
import { useGameLoop } from "../hooks/useGameLoop";
import dynamic from 'next/dynamic';
import { StartScreen } from "../components/ui/StartScreen";
import { GameOverScreen } from "../components/ui/GameOverScreen";
import { ScoreDisplay } from "../components/ui/ScoreDisplay";
import { GauntletHUD } from "../components/ui/GauntletHUD";
import { ActivePowerUp } from "../components/ui/ActivePowerUp";

const GameCanvas = dynamic(() => import('../components/game/GameCanvas').then(mod => mod.GameCanvas), {
  ssr: false,
});

export default function Home() {
  const { state, startGame, setDirection, tick, endSnapEvent } = useGameState();

  useKeyboard(setDirection);
  
  const isPowerActive = state.activeEffect?.stoneType === "POWER";
  useGameLoop(state.status, state.score, isPowerActive, tick);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050508] font-sans selection:bg-transparent">
      {/* 3D R3F Layer */}
      <div className="absolute inset-0">
        <GameCanvas state={state} onSnapComplete={endSnapEvent} />
      </div>

      {/* UI Layer */}
      {state.status === "IDLE" && <StartScreen onStart={startGame} />}
      
      {state.status === "GAME_OVER" && (
        <GameOverScreen state={state} onRestart={startGame} />
      )}

      {(state.status === "PLAYING" || state.status === "PAUSED" || state.status === "GAME_OVER") && (
        <>
          <ScoreDisplay state={state} />
          <ActivePowerUp state={state} />
          <GauntletHUD gauntlet={state.gauntlet} />
        </>
      )}

      {state.status === "SNAP_EVENT" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <h2 className="text-4xl text-[#F0F0FF] font-serif tracking-[0.2em] uppercase animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Perfectly balanced...
          </h2>
        </div>
      )}
    </main>
  );
}
