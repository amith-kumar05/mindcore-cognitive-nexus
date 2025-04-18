
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
      // Subtle floating animation
      sphereRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.0005;
      
      // Pulsing effect when hovered
      if (hovered.current) {
        sphereRef.current.scale.x = THREE.MathUtils.lerp(sphereRef.current.scale.x, 1.2, 0.1);
        sphereRef.current.scale.y = THREE.MathUtils.lerp(sphereRef.current.scale.y, 1.2, 0.1);
        sphereRef.current.scale.z = THREE.MathUtils.lerp(sphereRef.current.scale.z, 1.2, 0.1);
      } else {
        sphereRef.current.scale.x = THREE.MathUtils.lerp(sphereRef.current.scale.x, 1.0, 0.1);
        sphereRef.current.scale.y = THREE.MathUtils.lerp(sphereRef.current.scale.y, 1.0, 0.1);
        sphereRef.current.scale.z = THREE.MathUtils.lerp(sphereRef.current.scale.z, 1.0, 0.1);
      }
    }
    
    if (linesMaterial.current) {
      // Pulsing opacity for connection lines
      linesMaterial.current.opacity = (Math.sin(state.clock.elapsedTime) + 1) / 2 * 0.4 + 0.3;
    }
  });

  // Create connection lines geometry
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
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="#00D1FF" 
          emissive="#00D1FF"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
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

interface NeuralNetworkProps {
  neurons?: number;
  connectionsPer?: number;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ 
  neurons = 30, 
  connectionsPer = 3
}) => {
  const { size, camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [ref, inView] = useInView({ threshold: 0.1 });
  
  useEffect(() => {
    camera.position.z = 15;
  }, [camera]);
  
  useFrame((state) => {
    if (groupRef.current && inView) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });
  
  // Generate random neurons and connections
  const neuronsData: Array<{ position: [number, number, number]; connections: Array<[number, number, number]> }> = [];
  
  for (let i = 0; i < neurons; i++) {
    const position: [number, number, number] = [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    ];
    
    const connections: Array<[number, number, number]> = [];
    
    // Create random connections to other neurons
    for (let j = 0; j < connectionsPer; j++) {
      const targetIndex = Math.floor(Math.random() * neurons);
      if (targetIndex < neuronsData.length) {
        connections.push(neuronsData[targetIndex].position);
      }
    }
    
    neuronsData.push({ position, connections });
  }

  return (
    <div ref={ref} className="w-full h-full">
      <group ref={groupRef}>
        {neuronsData.map((neuron, index) => (
          <Neuron 
            key={index} 
            position={neuron.position} 
            connections={neuron.connections} 
          />
        ))}
      </group>
    </div>
  );
};

interface DataStreamProps {
  count?: number;
}

export const DataStream: React.FC<DataStreamProps> = ({ count = 15 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="data-stream"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${Math.random() * 30 + 15}%`,
            animationDuration: `${Math.random() * 4 + 4}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export const NeuralScene: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <NeuralNetwork />
      <DataStream />
    </div>
  );
};
