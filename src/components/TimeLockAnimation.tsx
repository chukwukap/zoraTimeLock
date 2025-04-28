"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Interactive lock mechanism
function LockMechanism({
  isUnlocked,
  onUnlock,
}: {
  isUnlocked: boolean;
  onUnlock: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useFrame(() => {
    if (groupRef.current && !isUnlocked) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (rotation > 2 * Math.PI) {
      onUnlock();
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging && !isUnlocked) {
      setRotation((prev) => prev + e.movementX * 0.01);
    }
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Lock body */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <cylinderGeometry args={[1, 1, 0.5, 32]} />
        <meshStandardMaterial
          color={hovered ? "#4f46e5" : "#ffffff"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Lock shackle */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.8, 0.1, 16, 32]} />
        <meshStandardMaterial
          color={isUnlocked ? "#10b981" : "#ffffff"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Time particles */}
      {!isUnlocked && (
        <group>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={i} position={[Math.sin(i) * 2, Math.cos(i) * 2, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

// Content capsule that appears when unlocked
function ContentCapsule({ isVisible }: { isVisible: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current && isVisible) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (!isVisible) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#10b981"
        metalness={0.8}
        roughness={0.2}
        emissive="#10b981"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function TimeLockAnimation() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[500px] w-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <LockMechanism
          isUnlocked={isUnlocked}
          onUnlock={() => setIsUnlocked(true)}
        />
        <ContentCapsule isVisible={isUnlocked} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
        />
      </Canvas>
      {showInstructions && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
          <p className="text-sm">Drag to unlock your content</p>
        </div>
      )}
    </div>
  );
}
