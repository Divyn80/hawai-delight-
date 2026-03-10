import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-navy/90 backdrop-blur-lg border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="font-poppins font-bold text-xl lg:text-2xl text-white hover:text-sunset transition-colors"
            >
              Hawaii'n Delight
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('menu')}
                className="font-space font-medium text-white/80 hover:text-white transition-colors"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('order')}
                className="font-space font-medium text-white/80 hover:text-white transition-colors"
              >
                Order
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="font-space font-medium text-white/80 hover:text-white transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('visit')}
                className="font-space font-medium text-white/80 hover:text-white transition-colors"
              >
                Visit
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 
                         flex items-center justify-center hover:bg-white/20 transition-all"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sunset text-navy 
                                 text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-white/10 border border-white/20 
                         flex items-center justify-center hover:bg-white/20 transition-all"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-navy/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              <button
                onClick={() => scrollToSection('menu')}
                className="block w-full text-left font-space font-medium text-white/80 hover:text-white py-2"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('order')}
                className="block w-full text-left font-space font-medium text-white/80 hover:text-white py-2"
              >
                Order
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="block w-full text-left font-space font-medium text-white/80 hover:text-white py-2"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('visit')}
                className="block w-full text-left font-space font-medium text-white/80 hover:text-white py-2"
              >
                Visit
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
