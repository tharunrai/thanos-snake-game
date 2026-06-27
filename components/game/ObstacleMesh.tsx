import { Obstacle } from "../../types/game";
import { gridToWorld } from "../../lib/coordMap";

export function ObstacleMesh({ obstacles }: { obstacles: Obstacle[] }) {
  return (
    <group>
      {obstacles.map(obs => (
        <group key={obs.id}>
          {obs.positions.map((pos, idx) => {
            const { x, y, z } = gridToWorld(pos);
            return (
              <mesh key={idx} position={[x, 0.5, z]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#333333" roughness={0.8} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}
