import React, { useEffect, useRef } from 'react';

export const BackgroundEffects = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 3;
    let currentX = mouseX;
    let currentY = mouseY;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animateGlow = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
      animationFrameId = requestAnimationFrame(animateGlow);
    };

    animateGlow();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="video-background-container fixed top-0 w-full h-screen -z-10 mix-blend-overlay opacity-30" style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, transparent 100%)' }}>
        <video src="https://www.youtube.com/watch?v=tVz2L" autoPlay loop muted playsInline className="w-full h-full object-cover grayscale"></video>
      </div>

      <div ref={glowRef} id="orange-glow" className="fixed -top-48 -left-48 w-96 h-96 bg-[#ff9146] rounded-full blur-[100px] opacity-70 pointer-events-none z-0" style={{ willChange: 'transform' }}></div>

      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] opacity-80 pointer-events-none">
          <div className="absolute top-24 right-1/4 w-[28rem] h-[28rem] bg-[#46d4c6] rounded-full blur-[140px] mix-blend-color-burn opacity-40"></div>
        </div>
      </div>
    </>
  );
};
