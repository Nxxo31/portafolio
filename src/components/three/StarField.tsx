"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ================================================================
   CONSTELLATION PORTFOLIO — Interactive 3D Space
   ================================================================ */

interface StarFieldCanvasProps {
  onNodeClick?: (name: string) => void;
}

// 8000 stars with random positions
function Stars() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  const stars = useMemo(() => {
    const arr = new Float32Array(8000 * 3);
    for (let i = 0; i < 8000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 20 + Math.random() * 80;
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0001;
    }
    camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseRef.current.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(stars, 3));
    return g;
  }, []);

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.5}
        color="#ffffff"
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Clickable constellation nodes
function Nodes({ onNodeClick }: { onNodeClick?: (name: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  const nodes = useMemo(
    () => [
      { position: new THREE.Vector3(-5, 2, -10), name: "Projects", color: "#22d3ee" },
      { position: new THREE.Vector3(5, 3, -15), name: "About", color: "#7c5cff" },
      { position: new THREE.Vector3(0, -3, -20), name: "Skills", color: "#f5c451" },
      { position: new THREE.Vector3(-7, -1, -8), name: "Contact", color: "#22d3ee" },
      { position: new THREE.Vector3(3, -2, -12), name: "Blog", color: "#7c5cff" },
      { position: new THREE.Vector3(-2, 4, -18), name: "Social", color: "#f5c451" },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(t * 0.5 + i) * 0.001;
      const s = 1 + Math.sin(t * 2 + i) * 0.1;
      child.scale.setScalar(s);
    });
  });

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const handle = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      if (!groupRef.current) return;
      const intersects = raycaster.intersectObjects(groupRef.current.children);
      if (intersects.length > 0 && onNodeClick) {
        const idx = groupRef.current.children.indexOf(intersects[0].object);
        if (idx >= 0) onNodeClick(nodes[idx].name);
      }
    };
    gl.domElement.addEventListener("click", handle);
    return () => gl.domElement.removeEventListener("click", handle);
  }, [camera, gl, onNodeClick, nodes]);

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <mesh key={node.name} position={node.position}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Main Canvas ---------- */
export default function StarFieldCanvas({ onNodeClick }: StarFieldCanvasProps) {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
        style={{
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          width: "100%",
          height: "100%",
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#7c5cff" />
        <Stars />
        <Nodes onNodeClick={onNodeClick} />
      </Canvas>
    </div>
  );
}
