"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { GameState } from "../../types/game";
import { GridMesh } from "./GridMesh";
import { SnakeMesh } from "./SnakeMesh";
import { StoneMesh } from "./StoneMesh";
import { ObstacleMesh } from "./ObstacleMesh";
import { SnapEvent } from "./SnapEvent";
import { gridToWorld } from "../../lib/coordMap";
import { Vector2 } from "three";

interface GameCanvasProps {
  state: GameState;
  onSnapComplete: () => void;
}

export function GameCanvas({ state, onSnapComplete }: GameCanvasProps) {
  const stoneWorldPos = state.currentStone ? gridToWorld(state.currentStone.position) : { x: 0, y: 0, z: 0 };

  return (
    <Canvas camera={{ position: [10, 14, 10], fov: 45 }} className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #050508 100%)' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 8, 0]} color="#C9A84C" intensity={1} />
      
      {state.currentStone && (
        <pointLight 
          position={[stoneWorldPos.x, 2, stoneWorldPos.z]} 
          color={state.currentStone.color} 
          intensity={2} 
        />
      )}

      <GridMesh />
      <SnakeMesh snake={state.snake} />
      <StoneMesh stone={state.currentStone} />
      <ObstacleMesh obstacles={state.obstacles} />

      {state.status === "SNAP_EVENT" && <SnapEvent onComplete={onSnapComplete} />}

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.6} />
        {/* @ts-ignore - type mismatch in R3F postprocessing */}
        <ChromaticAberration offset={new Vector2(0.002, 0.002)} />
      </EffectComposer>
    </Canvas>
  );
}
