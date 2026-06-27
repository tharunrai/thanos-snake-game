import { InfinityStone } from "../../types/game";
import { gridToWorld } from "../../lib/coordMap";
import { Float } from "@react-three/drei";

export function StoneMesh({ stone }: { stone: InfinityStone | null }) {
  if (!stone) return null;

  const { x, y, z } = gridToWorld(stone.position);

  return (
    <group position={[x, 0.5, z]}>
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial 
            color={stone.color} 
            emissive={stone.color}
            emissiveIntensity={2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}
