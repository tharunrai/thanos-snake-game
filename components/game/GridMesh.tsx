import { useMemo } from "react";
import { GRID_SIZE } from "../../lib/constants";
import { gridToWorld } from "../../lib/coordMap";

export function GridMesh() {
  const tiles = useMemo(() => {
    const arr = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        arr.push({ x, y });
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {tiles.map((tile, i) => {
        const { x, y, z } = gridToWorld(tile);
        return (
          <mesh key={i} position={[x, -0.025, z]}>
            <boxGeometry args={[1, 0.05, 1]} />
            <meshStandardMaterial color="#050508" emissive="#2D1B69" emissiveIntensity={0.2} roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}
