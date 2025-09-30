'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition, useReducedMotion } from '@/lib/hooks';
import EnquireModal from './EnquireModal';
import Image from 'next/image';

const FloatingActionBar = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const { scrollY } = useScrollPosition();
  const prefersReducedMotion = useReducedMotion();

  // Show/hide based on scroll position
  useEffect(() => {
    const packagesSection = document.querySelector('#packages'); // TripOptions section
    const footerSection = document.querySelector('footer');
    
    if (packagesSection && footerSection) {
      const packagesTop = (packagesSection as HTMLElement).offsetTop;
      const footerTop = (footerSection as HTMLElement).offsetTop;
      const windowHeight = window.innerHeight;
      
      // Show when scrolled past packages and before footer
      // Hide when at the very top to prevent infinite loop
      const shouldShow = scrollY > packagesTop - windowHeight / 2 && 
                        scrollY < footerTop - windowHeight && 
                        scrollY > 50; // Reduced threshold for better UX
      setIsVisible(shouldShow);
    } else {
      // Fallback for pages without specific sections (like all-trips pages)
      // Show when scrolled down a bit and hide when near the top
      const shouldShow = scrollY > 300 && scrollY < document.body.scrollHeight - window.innerHeight - 100;
      setIsVisible(shouldShow);
    }
  }, [scrollY]);

  const handleWhatsApp = () => {
    // Replace with your WhatsApp number
    const phoneNumber = '+919876543210'; // Replace with actual number
    const message = encodeURIComponent('Hi! I am interested in tour packages. Can you help me plan my trip?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEnquire = () => {
    setIsEnquireModalOpen(true);
  };

  const handleCloseEnquireModal = () => {
    setIsEnquireModalOpen(false);
  };

  const handleScrollToTop = () => {
    // Temporarily hide the floating action bar to prevent infinite loop
    setIsVisible(false);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Re-enable visibility check after a short delay
    setTimeout(() => {
      const packagesSection = document.querySelector('#packages');
      const footerSection = document.querySelector('footer');
      
      if (packagesSection && footerSection) {
        const packagesTop = (packagesSection as HTMLElement).offsetTop;
        const footerTop = (footerSection as HTMLElement).offsetTop;
        const windowHeight = window.innerHeight;
        const currentScrollY = window.pageYOffset;
        
        const shouldShow = currentScrollY > packagesTop - windowHeight / 2 && 
                          currentScrollY < footerTop - windowHeight && 
                          currentScrollY > 50;
        setIsVisible(shouldShow);
      } else {
        // Fallback for pages without specific sections
        const currentScrollY = window.pageYOffset;
        const shouldShow = currentScrollY > 300 && currentScrollY < document.body.scrollHeight - window.innerHeight - 100;
        setIsVisible(shouldShow);
      }
    }, 1000); // Wait for scroll animation to complete
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : "hidden"}
            animate="visible"
            exit="exit"
          >
            {/* Desktop Layout */}
            <div className="hidden md:flex flex-col pointer-events-auto">
              {/* Scroll to Top Button - Positioned on right */}
              <div className="flex justify-end px-6 pb-2">
                <motion.button
                  onClick={handleScrollToTop}
                  className="rounded-full shadow-lg transition-colors duration-200 mb-2"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                  aria-label="Scroll to top"
                >
                  <div className="w-13 h-13 relative">
                    <Image
                      src="/up.png"
                      alt="Scroll to top"
                      fill
                      className="object-contain filter brightness-0 invert sepia hue-rotate-[140deg] saturate-[3] brightness-[0.7]"
                    />
                  </div>
                </motion.button>
              </div>
              
              {/* WhatsApp Button - Positioned on right */}
              <div className="flex justify-end px-6 pb-2">
                <motion.button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors duration-200"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                  aria-label="Contact via WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </motion.button>
              </div>
              
              {/* Enquire Now Button - White container with padding */}
              <div className="bg-white border-t-2 border-gray-200 px-6 py-4 shadow-sm">
                <motion.button
                  onClick={handleEnquire}
                  className="w-full bg-[#134956] hover:bg-[#0f3d47] text-white py-3 font-semibold text-lg rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                >
                  Enquire Now
                </motion.button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col pointer-events-auto">
              {/* Scroll to Top Button - Positioned on right */}
              <div className="flex justify-end px-4 pb-2">
                <motion.button
                  onClick={handleScrollToTop}
                  className=" rounded-full shadow-lg transition-colors duration-200 mb-2"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                  aria-label="Scroll to top"
                >
                  <div className="w-12 h-12 relative">
                    <Image
                      src="/up.png"
                      alt="Scroll to top"
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.button>
              </div>
              
              {/* WhatsApp Button - Positioned on right */}
              <div className="flex justify-end px-4 pb-2">
                <motion.button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                  aria-label="Contact via WhatsApp"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </motion.button>
              </div>
              
              {/* Enquire Now Button - White container with padding */}
              <div className="bg-white border-t-2 border-gray-200 px-4 py-3 shadow-sm">
                <motion.button
                  onClick={handleEnquire}
                  className="w-full bg-[#134956] hover:bg-[#0f3d47] text-white py-3 font-semibold font-cta text-base rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                >
                  Talk to an Expert
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquire Modal */}
      <EnquireModal 
        isOpen={isEnquireModalOpen} 
        onClose={handleCloseEnquireModal} 
      />
    </>
  );
});

FloatingActionBar.displayName = 'FloatingActionBar';

export default FloatingActionBar; 