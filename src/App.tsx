import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import CartDrawer from './components/CartDrawer';
import ParticleBackground from './components/ParticleBackground';
import FloatingShapes from './components/FloatingShapes';
import HeroSection from './sections/HeroSection';
import MenuSection from './sections/MenuSection';
import OrderSection from './sections/OrderSection';
import GallerySection from './sections/GallerySection';
import VisitSection from './sections/VisitSection';
import FooterSection from './sections/FooterSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Global scroll snap configuration
  useEffect(() => {
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative">
        {/* Particle background */}
        <ParticleBackground />
        
        {/* Floating shapes */}
        <FloatingShapes />

        {/* Grain overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Cart Drawer */}
        <CartDrawer />

        {/* Main content */}
        <main className="relative">
          <HeroSection />
          <MenuSection />
          <OrderSection />
          <GallerySection />
          <VisitSection />
          <FooterSection />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
