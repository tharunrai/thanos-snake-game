import { SnakeState } from "../../types/game";
import { gridToWorld } from "../../lib/coordMap";

export function SnakeMesh({ snake }: { snake: SnakeState }) {
  return (
    <group>
      {snake.body.map((segment, index) => {
        const { x, y, z } = gridToWorld(segment);
        const isHead = index === 0;
        const size = isHead ? 0.95 : 0.85;
        
        return (
          <mesh key={index} position={[x, size / 2, z]}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial 
              color="#C9A84C" 
              metalness={0.8} 
              roughness={0.2} 
              emissive={isHead ? "#C9A84C" : "#000000"}
              emissiveIntensity={isHead ? 0.5 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}
