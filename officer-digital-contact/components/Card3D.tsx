import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Image } from '@react-three/drei';
import * as THREE from 'three';
import { OfficerDetails } from '../types';

// Bypass TS check for 'group' intrinsic element which often has type definition issues in R3F
const Group = 'group' as any;

interface Card3DProps {
  onAnimationComplete: () => void;
  data: OfficerDetails;
}

export const Card3D: React.FC<Card3DProps> = ({ onAnimationComplete, data }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [complete, setComplete] = useState(false);
  const isMounted = useRef(true);
  
  // Animation Parameters
  const DURATION = 2.4; 
  const START_ROTATION_X = 0.5; 
  const START_ROTATION_Y = Math.PI * 2.5; 
  const START_SCALE = 1.3; 
  const END_SCALE = 1.0;   
  
  const easeOut = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = START_ROTATION_X;
      meshRef.current.rotation.y = START_ROTATION_Y;
      meshRef.current.scale.set(START_SCALE, START_SCALE, START_SCALE);
    }
  }, [START_ROTATION_X, START_ROTATION_Y, START_SCALE]);

  useFrame((state) => {
    if (!meshRef.current || complete || !isMounted.current) return;
    
    try {
      const time = state.clock.getElapsedTime();
      const progress = Math.min(time / DURATION, 1);
      const eased = easeOut(progress);

      // Animation logic
      meshRef.current.rotation.x = THREE.MathUtils.lerp(START_ROTATION_X, 0, eased);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(START_ROTATION_Y, 0, eased);
      const currentScale = THREE.MathUtils.lerp(START_SCALE, END_SCALE, eased);
      meshRef.current.scale.set(currentScale, currentScale, currentScale);
      
      // Add subtle float/tilt when animation is done (Alive feel)
      if (progress >= 1) {
         meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.02;
         meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.03;
      }

      if (progress >= 0.98 && !complete) {
        setComplete(true);
        onAnimationComplete();
      }
    } catch (err) {
      console.warn("Card animation interrupted or failed", err);
    }
  });

  const CARD_COLOR = "#0A0A0A"; 
  const TEXT_COLOR = "#FFFFFF";
  const SECONDARY_TEXT_COLOR = "#94a3b8"; 
  const FONT_URL = "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff";

  // Card Dimensions
  const WIDTH = 3.3;
  const HEIGHT = 2.1;
  const THICKNESS = 0.08; // Increased for physical slab feel
  const SURFACE_Z = THICKNESS / 2;

  return (
    <Group ref={meshRef}>
      
      {/* Main Acrylic Slab */}
      <RoundedBox args={[WIDTH, HEIGHT, THICKNESS]} radius={0.12} smoothness={8}>
        {/* Premium Acrylic Material: Dark, glossy coat, matte core */}
        {/* @ts-ignore */}
        <meshPhysicalMaterial 
          color={CARD_COLOR}
          roughness={0.4}         // Matte surface finish
          metalness={0.5}         // Slight metallic for premium feel
          clearcoat={1.0}         // Glass-like top layer
          clearcoatRoughness={0.15} // Sharp reflections on the clearcoat
          reflectivity={0.5}
          sheen={0.2}             // Subtle velvet sheen
          sheenColor="#ffffff"
        />
      </RoundedBox>

      {/* Content Group - Layered for Depth Hierarchy */}
      <Group position={[0, 0, SURFACE_Z]}>
        
        {/* Layer 1: Background (Logo & Brand) - Lowest Z, subtle opacity */}
        <Group position={[0, 0, 0.005]}>
            <Image 
                url="https://i.ibb.co/bM6YsBJ7/police-scotland-logo-removebg-preview.png"
                transparent
                opacity={0.9}
                scale={[1.1, 1.1]}
                position={[1.05, 0.55, 0]}
            />
            <Text 
                font={FONT_URL} 
                position={[-0.85, 0.75, 0]} 
                anchorX="left" 
                anchorY="middle" 
                fontSize={0.10} 
                color={SECONDARY_TEXT_COLOR} 
                letterSpacing={0.2} 
                fillOpacity={0.6}
            >
                POLICE SCOTLAND
            </Text>
        </Group>

        {/* Layer 2: Midground (Secondary Info) - Mid Z */}
        <Group position={[0, 0, 0.015]}>
            <Text 
                font={FONT_URL} 
                position={[0, -0.2, 0]} 
                anchorX="center" 
                anchorY="middle" 
                fontSize={0.13} 
                color={SECONDARY_TEXT_COLOR} 
                letterSpacing={0.05}
                fillOpacity={0.9}
            >
                {data.department}
            </Text>

            <Text 
                font={FONT_URL} 
                position={[0, -0.7, 0]} 
                anchorX="center" 
                anchorY="middle" 
                fontSize={0.11} 
                color={SECONDARY_TEXT_COLOR} 
                letterSpacing={0.15}
                fillOpacity={0.7}
            >
                {data.shoulderNumber}
            </Text>
        </Group>

        {/* Layer 3: Foreground (Primary Name) - Highest Z, Crisp White */}
        <Group position={[0, 0, 0.03]}>
            <Text 
                font={FONT_URL} 
                position={[0, 0.1, 0]} 
                anchorX="center" 
                anchorY="middle" 
                fontSize={0.28} 
                color={TEXT_COLOR}
                outlineColor="#000000"
                outlineOpacity={0.1}
                outlineWidth={0.01} // Subtle shadow for legibility
            >
                {data.rank} {data.name}
            </Text>
        </Group>

      </Group>
    </Group>
  );
};