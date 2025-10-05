"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { MeshStandardMaterial } from "three";

function Orb() {
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#19b47c",
        roughness: 0.3,
        metalness: 0.4,
        emissive: "#0a5c3b",
        emissiveIntensity: 0.25
      }),
    []
  );

  return (
    <mesh rotation={[0.5, 0.8, 0]} material={material}>
      <icosahedronGeometry args={[1.1, 1]} />
    </mesh>
  );
}

export function HeroOrb() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 3]} intensity={1.2} />
        <directionalLight position={[-2, -2, -3]} intensity={0.6} color="#f97316" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.9} />
        <Orb />
      </Suspense>
    </Canvas>
  );
}
