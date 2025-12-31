import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Card3D } from './Card3D';
import { OfficerDetails } from '../types';

interface SceneProps {
  onIntroComplete: () => void;
  isHidden: boolean;
  data: OfficerDetails;
}

export const Scene: React.FC<SceneProps> = ({ onIntroComplete, isHidden, data }) => {
  const [cameraZ, setCameraZ] = useState(5.5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setCameraZ(9.5);
      else if (width < 1024) setCameraZ(7.0);
      else setCameraZ(5.0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out pointer-events-none ${isHidden ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, toneMappingExposure: 1.2 }}>
        <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={35} />
        <Suspense fallback={null}>
          
          {/* 1. Key Light (Top-Left) - Creates the main definition and edge highlight */}
          {/* @ts-ignore */}
          <spotLight 
            position={[-4, 6, 4]} 
            angle={0.3} 
            penumbra={0.5} 
            intensity={2.5} 
            castShadow 
            shadow-bias={-0.0001}
            color="#ffffff" 
          />
          
          {/* 2. Rim/Fill Light (Right-Bottom) - Softens the shadows */}
          {/* @ts-ignore */}
          <pointLight position={[5, -2, 3]} intensity={0.5} color="#e2e8f0" />
          
          {/* 3. Top Rim Light - Catches the top bevel */}
          {/* @ts-ignore */}
          <rectAreaLight 
            width={10} 
            height={2} 
            position={[0, 5, -2]} 
            intensity={1.0} 
            color="#ffffff" 
            lookAt={() => [0, 0, 0]} 
          />

          {/* @ts-ignore */}
          <group position={[0, 0, 0]}>
              <Card3D onAnimationComplete={onIntroComplete} data={data} />
          {/* @ts-ignore */}
          </group>

          {/* Shadow System: Dual Layer for Realism */}
          
          {/* A) Ambient Shadow (Wide, Soft) */}
          <ContactShadows 
            position={[0, -1.4, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2.5} 
            far={5} 
            color="#000000" 
          />

          {/* B) Contact Shadow (Tight, Dark, grounded) */}
          <ContactShadows 
            position={[0, -1.25, 0]} 
            opacity={0.7} 
            scale={5} 
            blur={0.6} 
            far={1.5} 
            color="#000000" 
          />

          {/* Environment for subtle reflections on the acrylic surface */}
          <Environment preset="city" environmentIntensity={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
};