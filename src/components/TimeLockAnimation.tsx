"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Time capsule shape that represents locked content
function TimeCapsule({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Create a custom shader material for the time capsule
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      if (materialRef.current) {
        materialRef.current.uniforms.time.value += delta;
      }
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={hovered || isHovered ? 1.1 : 1}
      >
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            time: { value: 0 },
            color1: { value: new THREE.Color("#3B82F6") },
            color2: { value: new THREE.Color("#10B981") },
            hovered: { value: hovered || isHovered ? 1 : 0 },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float time;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform float hovered;
            varying vec2 vUv;
            
            void main() {
              float pulse = sin(time * 2.0) * 0.5 + 0.5;
              vec3 color = mix(color1, color2, pulse);
              float glow = hovered * 0.3;
              gl_FragColor = vec4(color + glow, 1.0);
            }
          `}
        />
      </mesh>
      <Text
        position={[0, -2, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {clicked ? "Content Unlocked!" : "Time-Locked Content"}
      </Text>
    </group>
  );
}

// Floating particles representing time
function TimeParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} />
    </points>
  );
}

export default function TimeLockAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-[500px] w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <TimeCapsule isHovered={isHovered} />
        <TimeParticles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
