'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/hooks';

interface NavItem {
  label: string;
  href: string;
}

const defaultNavItems: NavItem[] = [
  { label: 'Plan my trip', href: '#packages' },
  { label: 'Stays', href: '#accommodation' },
  { label: 'Highlights', href: '#highlights' },
];

type HeaderContent = {
  navItems?: NavItem[]
  enquireLabel?: string
  callNumber?: string
}

const Header = React.memo(({ content }: { content?: HeaderContent | null }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Debug logging to see what content we're receiving
  console.log('Header - Content received:', content);

  // Use CMS data or fallback to defaults
  const getValidNavItems = () => {
    if (!content || !content.navItems || content.navItems.length === 0) {
      console.log('Header - No CMS nav items, using defaults');
      return defaultNavItems;
    }
    
    console.log('Header - Using CMS nav items:', content.navItems);
    return content.navItems;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveNav(href);
    setIsMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireClick = () => {
    setIsMobileMenuOpen(false);
    // Scroll to contact section
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        'absolute top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        isScrolled 
          ? 'bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-transparent backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button - Left side */}
          <button
            className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <Image
                src="/menu2.svg"
                alt="Menu"
                width={32}
                height={32}
                className={cn(
                  "transition-all duration-300 filter brightness-0 invert",
                  isMobileMenuOpen ? "rotate-90" : ""
                )}
              />
            </div>
          </button>

          {/* Logo - Center */}
          <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="/logo.png"
              alt="Travloger"
              width={120}
              height={40}
              className="h-10 lg:h-15 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {getValidNavItems().map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  'relative px-4 py-2 text-white font-medium transition-all duration-300 font-subheading',
                  'hover:text-white/90 rounded-lg transform hover:scale-105',
                  'focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent',
                  'hover:bg-[#FFFFFF4D] hover:shadow-lg hover:-translate-y-0.5',
                  activeNav === item.href && 'bg-[#FFFFFF4D] ring-2 ring-white/30 shadow-lg scale-105'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Enquire Now Button - Hidden on mobile, visible on desktop */}
            <button
              onClick={handleEnquireClick}
              className={cn(
                'hidden md:block border-2 border-white/60 px-6 py-2 lg:px-8 lg:py-3 rounded-lg font-semibold text-white font-cta',
                'bg-[#134956] hover:bg-[#0f3d47] transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-[#134956]/50 focus:ring-offset-2 focus:ring-offset-transparent',
                'transform hover:scale-105 active:scale-95',
                'shadow-md hover:shadow-lg shadow-white/40'
              )}
            >
              {content?.enquireLabel || 'Enquire now'}
            </button>

            {/* Call Button - Right side */}
            <button
              onClick={() => window.location.href = `tel:${content?.callNumber || '+919876543210'}`}
              className="p-2 text-white hover:text-white/80 transition-colors"
              aria-label="Call us"
            >
              <Image
                src="/callFinal.svg"
                alt="Call"
                width={20}
                height={20}
                className={cn(
                  "transition-all duration-300 filter brightness-0 invert",
                  !prefersReducedMotion && "animate-[shake_1.5s_ease-in-out_infinite]"
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          'md:hidden transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}>
          <div className={cn(
            'px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2',
            isScrolled 
              ? 'bg-white/15 backdrop-blur-md shadow-lg border border-white/20' 
              : 'bg-white/10 backdrop-blur-md'
          )}>
            {getValidNavItems().map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                                  className={cn(
                    'block w-full text-left px-3 py-2 text-white font-medium transition-all duration-300 font-subheading',
                  'hover:bg-[#FFFFFF4D] hover:text-white/90 rounded-md',
                  'focus:outline-none focus:ring-2 focus:ring-white/20',
                  activeNav === item.href && 'bg-[#FFFFFF4D] ring-2 ring-white/30'
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={handleEnquireClick}
                className={cn(
                  'w-full px-4 py-2 rounded-lg font-semibold text-white font-cta',
                  'bg-[#134956] hover:bg-[#0f3d47] transition-all duration-300',
                  'focus:outline-none focus:ring-2 focus:ring-[#134956]/50 border-2 border-white/60'
                )}
              >
                {content?.enquireLabel || 'Enquire now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
