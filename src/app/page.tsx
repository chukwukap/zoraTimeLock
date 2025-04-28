"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particle({
  position,
  mouse,
}: {
  position: [number, number, number];
  mouse: [number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const [x, y, z] = position;
      const [mx, my] = mouse;

      // Calculate distance from mouse
      const dx = x - mx;
      const dy = y - my;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Animate based on mouse position
      meshRef.current.position.x =
        x + Math.sin(state.clock.elapsedTime + x) * 0.1;
      meshRef.current.position.y =
        y + Math.cos(state.clock.elapsedTime + y) * 0.1;
      meshRef.current.position.z = z + (hovered ? 0.5 : 0);

      // Scale based on mouse distance
      const scale = Math.max(0.5, 1 - distance * 0.5);
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial
        color={hovered ? "#ffffff" : "#4f46e5"}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Particles({ mouse }: { mouse: [number, number] }) {
  const particles = Array.from({ length: 50 }, () => {
    const x = (Math.random() - 0.5) * 20;
    const y = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 5;
    return [x, y, z] as [number, number, number];
  });

  return (
    <>
      {particles.map((position, i) => (
        <Particle key={i} position={position} mouse={mouse} />
      ))}
    </>
  );
}

function BackgroundEffect() {
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
  const { viewport } = useThree();

  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles mouse={mouse} />
      <mesh
        onPointerMove={(e) => {
          const x = (e.point.x / viewport.width) * 2;
          const y = (e.point.y / viewport.height) * 2;
          setMouse([x, y]);
        }}
      >
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

export default function Home() {
  return (
    <main className="h-screen bg-black text-white overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <BackgroundEffect />
        </Canvas>
      </div>

      {/* Hero Section */}
      <section className="h-full flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-7xl md:text-9xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400">
              ZoraTimeLock
            </h1>
            <div className="mt-8 max-w-2xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                Tokenize your upcoming content. Set release dates. Start earning
                before creation.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <button className="px-10 py-5 bg-white text-black rounded-full text-xl font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Creating
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-6 text-center">
        <p className="text-gray-500 text-sm tracking-wide font-light">
          © 2024 ZoraTimeLock. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
