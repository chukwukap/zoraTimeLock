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
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-16">
            {/* Main Title with Creative Styling */}
            <div className="relative">
              <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-400 font-syne transform hover:scale-105 transition-transform duration-500">
                ZoraTimeLock
              </h1>
              {/* Decorative Elements */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
            </div>

            {/* Tagline with Creative Layout */}
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="relative">
                <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed tracking-wider font-space-grotesk transform hover:translate-y-1 transition-transform duration-300">
                  <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                    Tokenize
                  </span>{" "}
                  <span className="inline-block transform hover:-rotate-3 transition-transform duration-300">
                    your
                  </span>{" "}
                  <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                    upcoming
                  </span>{" "}
                  <span className="inline-block transform hover:-rotate-3 transition-transform duration-300">
                    content.
                  </span>
                </p>
                <p className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed tracking-wider font-space-grotesk mt-4">
                  <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                    Set
                  </span>{" "}
                  <span className="inline-block transform hover:-rotate-3 transition-transform duration-300">
                    release
                  </span>{" "}
                  <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                    dates.
                  </span>{" "}
                  <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                    Start
                  </span>{" "}
                  <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                    earning
                  </span>{" "}
                  <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                    before
                  </span>{" "}
                  <span className="inline-block transform hover:rotate-3 transition-transform duration-300">
                    creation.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Disabled Button */}
          <div className="mt-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full blur opacity-25"></div>
            <button
              disabled
              className="relative px-12 py-6 bg-gray-400 text-gray-600 rounded-full text-xl font-medium cursor-not-allowed font-space-grotesk"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Creative Footer */}
      <footer className="absolute bottom-0 w-full py-8 text-center">
        <div className="max-w-2xl mx-auto">
          {/* <p className="text-gray-500 text-sm tracking-wider font-light font-space-grotesk transform hover:translate-y-1 transition-transform duration-300">
            © 2024 ZoraTimeLock. All rights reserved.
          </p> */}
          <div className="mt-4 flex justify-center space-x-4">
            <span className="text-gray-600 text-xs tracking-widest font-space-grotesk">
              INNOVATION
            </span>
            <span className="text-gray-600 text-xs tracking-widest font-space-grotesk">
              CREATIVITY
            </span>
            <span className="text-gray-600 text-xs tracking-widest font-space-grotesk">
              FUTURE
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
