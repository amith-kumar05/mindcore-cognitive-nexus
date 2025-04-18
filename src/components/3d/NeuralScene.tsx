
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useInView } from 'react-intersection-observer';

interface NeuronProps {
  position: [number, number, number];
  connections: Array<[number, number, number]>;
}

const Neuron: React.FC<NeuronProps> = ({ position, connections }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const linesMaterial = useRef<THREE.LineBasicMaterial>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const hovered = useRef(false);
  
  useFrame((state) => {
    if (sphereRef.current) {
      // More organic floating animation
      sphereRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.002;
      sphereRef.current.position.x += Math.cos(state.clock.elapsedTime * 0.5) * 0.001;
      
      // Smoother hover effect
      if (hovered.current) {
        sphereRef.current.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.1);
      } else {
        sphereRef.current.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
      }
    }
    
    if (linesMaterial.current) {
      // Smoother connection pulse
      linesMaterial.current.opacity = (Math.sin(state.clock.elapsedTime * 0.8) + 1) / 2 * 0.5 + 0.2;
    }
  });

  const linesGeometry = new THREE.BufferGeometry();
  const linePositions: number[] = [];
  
  connections.forEach(connectionPos => {
    linePositions.push(position[0], position[1], position[2]);
    linePositions.push(connectionPos[0], connectionPos[1], connectionPos[2]);
  });
  
  linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

  return (
    <group>
      <mesh 
        ref={sphereRef} 
        position={new THREE.Vector3(...position)}
        onPointerOver={() => (hovered.current = true)}
        onPointerOut={() => (hovered.current = false)}
      >
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial 
          color="#00D1FF" 
          emissive="#00D1FF"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial 
          ref={linesMaterial} 
          color="#7B4DFF" 
          transparent 
          opacity={0.4} 
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
};

export const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [ref, inView] = useInView({ threshold: 0.1 });
  const { camera } = useThree();
  
  useEffect(() => {
    if (camera) {
      camera.position.z = 12;
      camera.position.y = 2;
    }
  }, [camera]);
  
  useFrame((state) => {
    if (groupRef.current && inView) {
      // Smoother rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Create brain-shaped neural network
  const neuronsData: Array<{ position: [number, number, number]; connections: Array<[number, number, number]> }> = [];
  const brainRadius = 4;
  const brainHeight = 5;
  
  // Generate neurons in a brain-like shape
  for (let i = 0; i < 40; i++) {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    
    // Brain shape equation
    const x = brainRadius * Math.sin(theta) * Math.cos(phi);
    const y = brainHeight * Math.cos(theta);
    const z = brainRadius * Math.sin(theta) * Math.sin(phi);
    
    // Add some randomness to make it more organic
    const jitter = 0.5;
    const position: [number, number, number] = [
      x + (Math.random() - 0.5) * jitter,
      y + (Math.random() - 0.5) * jitter,
      z + (Math.random() - 0.5) * jitter
    ];
    
    const connections: Array<[number, number, number]> = [];
    
    // Create connections to nearby neurons
    for (let j = 0; j < 3; j++) {
      const targetIndex = Math.floor(Math.random() * neuronsData.length);
      if (targetIndex < neuronsData.length) {
        connections.push(neuronsData[targetIndex].position);
      }
    }
    
    neuronsData.push({ position, connections });
  }

  return (
    <group ref={groupRef}>
      {neuronsData.map((neuron, index) => (
        <Neuron 
          key={index} 
          position={neuron.position} 
          connections={neuron.connections} 
        />
      ))}
    </group>
  );
};
