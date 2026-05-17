'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      // Synchronize GSAP ScrollTrigger updates with Lenis scroll events
      lenis.on('scroll', ScrollTrigger.update);
    }
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.12,          // Snappier, responsive deceleration curve
        duration: 0.8,       // Elegant, crisp slide transition duration (under 1s)
        smoothWheel: true,   // Ensure buttery smooth desktop scrolling
        wheelMultiplier: 1.1, // Premium, high-end scrolling speed multiplier
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
