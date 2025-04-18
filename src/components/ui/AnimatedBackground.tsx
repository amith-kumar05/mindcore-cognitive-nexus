
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesCount = 300;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    const color1 = new THREE.Color('#00D1FF');
    const color2 = new THREE.Color('#7B4DFF');
    const color3 = new THREE.Color('#FF3E9A');
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Color
      const mixFactor1 = Math.random();
      const mixFactor2 = Math.random();
      const particleColor = new THREE.Color();
      
      if (i % 3 === 0) {
        particleColor.copy(color1).lerp(color2, mixFactor1);
      } else if (i % 3 === 1) {
        particleColor.copy(color2).lerp(color3, mixFactor1);
      } else {
        particleColor.copy(color3).lerp(color1, mixFactor1);
      }
      
      colors[i * 3] = particleColor.r;
      colors[i * 3 + 1] = particleColor.g;
      colors[i * 3 + 2] = particleColor.b;
      
      // Size
      sizes[i] = Math.random() * 2;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });
    
    // Create particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Create connections between particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7B4DFF,
      transparent: true,
      opacity: 0.1,
    });
    
    const maxDistance = 15;
    const connectionUpdateInterval = 5; // Update connections every 5 frames
    let frameCount = 0;
    let lineSegments: THREE.LineSegments | null = null;
    
    const updateConnections = () => {
      if (lineSegments) {
        scene.remove(lineSegments);
      }
      
      const indices = [];
      const positions = particleSystem.geometry.attributes.position.array;
      
      for (let i = 0; i < particlesCount; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];
        
        for (let j = i + 1; j < particlesCount; j++) {
          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          const z2 = positions[j * 3 + 2];
          
          const distance = Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2) +
            Math.pow(z2 - z1, 2)
          );
          
          if (distance < maxDistance) {
            indices.push(i, j);
          }
        }
      }
      
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(indices.length * 3);
      
      for (let i = 0; i < indices.length; i++) {
        const index = indices[i];
        linePositions[i * 3] = positions[index * 3];
        linePositions[i * 3 + 1] = positions[index * 3 + 1];
        linePositions[i * 3 + 2] = positions[index * 3 + 2];
      }
      
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);
    };
    
    // Animation loop
    const originalPositions = new Float32Array(positions);
    let time = 0;
    
    const animate = () => {
      time += 0.001;
      
      // Update particle positions
      const positions = particleSystem.geometry.attributes.position.array;
      
      for (let i = 0; i < particlesCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;
        
        // Apply sine wave movement
        positions[ix] = originalPositions[ix] + Math.sin(time * (i % 5) + i) * 0.3;
        positions[iy] = originalPositions[iy] + Math.cos(time * (i % 3) + i) * 0.3;
        positions[iz] = originalPositions[iz] + Math.sin(time * (i % 7) + i) * 0.3;
      }
      
      particleSystem.geometry.attributes.position.needsUpdate = true;
      
      // Update connections periodically to save performance
      frameCount++;
      if (frameCount % connectionUpdateInterval === 0) {
        updateConnections();
      }
      
      // Rotate the entire particle system
      particleSystem.rotation.y += 0.0003;
      if (lineSegments) {
        lineSegments.rotation.y += 0.0003;
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial connection setup
    updateConnections();
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 opacity-30 pointer-events-none" 
    />
  );
};

export default AnimatedBackground;
