import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const shapes = [
  { type: 'circle', color: '#F9B949', size: 80 },
  { type: 'square', color: '#FF6B6B', size: 60 },
  { type: 'circle', color: '#2EC4B6', size: 100 },
  { type: 'triangle', color: '#F6B6C4', size: 70 },
  { type: 'circle', color: '#C7F464', size: 50 },
  { type: 'square', color: '#A18CD1', size: 90 },
];

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const shapeElements = container.querySelectorAll('.floating-shape');

    shapeElements.forEach((shape, i) => {
      // Random initial position
      gsap.set(shape, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
      });

      // Floating animation
      gsap.to(shape, {
        y: '+=30',
        x: '+=20',
        rotation: '+=15',
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });

      // Pulsing glow
      gsap.to(shape, {
        boxShadow: `0 0 ${30 + Math.random() * 20}px currentColor`,
        duration: 1.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      gsap.killTweensOf(shapeElements);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="floating-shape absolute opacity-20"
          style={{
            width: shape.size,
            height: shape.size,
            color: shape.color,
            filter: `drop-shadow(0 0 20px ${shape.color})`,
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="w-full h-full rounded-lg"
              style={{ backgroundColor: shape.color }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className="w-0 h-0"
              style={{
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
