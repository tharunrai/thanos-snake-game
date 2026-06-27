import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SnapEvent({ onComplete }: { onComplete: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, material.opacity - 0.01);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color="#F0F0FF" transparent opacity={1} side={THREE.DoubleSide} />
    </mesh>
  );
}
