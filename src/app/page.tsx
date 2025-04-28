"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BackgroundEffect() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y =
        Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial
        color="#000000"
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function Home() {
  return (
    <main className="h-screen bg-black text-white overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <BackgroundEffect />
        </Canvas>
      </div>

      {/* Hero Section */}
      <section className="h-full flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ZoraTimeLock
            </h1>
            <p className="text-2xl md:text-3xl text-gray-400 mt-4 font-light tracking-wide">
              Tokenize your upcoming content. Set release dates. Start earning
              before creation.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button className="px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl">
              Start Creating
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 text-center text-gray-500 text-sm">
        <p>© 2024 ZoraTimeLock. All rights reserved.</p>
      </footer>
    </main>
  );
}
