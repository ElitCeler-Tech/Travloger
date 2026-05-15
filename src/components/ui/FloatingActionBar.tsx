'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition, useReducedMotion } from '@/lib/hooks';
import EnquireModal from './EnquireModal';
import Image from 'next/image';
import { trackEvent } from '@/lib/engagement';

interface FloatingActionBarProps {
  content?: {
    contact?: {
      formBackgroundImageUrl?: string;
      formBackgroundImageUrlMobile?: string;
      whatsapp?: string;
      expertButtonText?: string;
    };
  };
}

const FloatingActionBar = React.memo(({ content }: FloatingActionBarProps) => {
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

  const [showWaPopup, setShowWaPopup] = useState(false);
  const [waName, setWaName] = useState('');
  const [waPhone, setWaPhone] = useState('');
  const [waEmail, setWaEmail] = useState('');
  const [waTravelers, setWaTravelers] = useState('');
  const [waDates, setWaDates] = useState('');
  const [waNotes, setWaNotes] = useState('');

  const [waSubmitting, setWaSubmitting] = useState(false);
  const [waSuccess, setWaSuccess] = useState(false);

  const handleWhatsApp = () => {
    setShowWaPopup(true);
    setWaSuccess(false);
  };

  const submitWhatsApp = async () => {
    if (!waName || waPhone.length < 10) { alert('Please enter name and 10-digit phone'); return; }
    setWaSubmitting(true);
    trackEvent('whatsapp_click', { cta_position: 'floating-bar' });
    const rawNumber = content?.contact?.whatsapp || '+919876543210';
    const phoneNumber = rawNumber.replace(/[^0-9]/g, '');
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source') || '';
    const page = window.location.pathname.replace(/^\//, '').split('/')[0] || 'home';
    const srcCode = source.toLowerCase().includes('google') || params.get('gclid') ? 'Gg' : source.toLowerCase().includes('meta') || source.toLowerCase().includes('facebook') || params.get('fbclid') ? 'Mt' : source ? 'Og' : 'Dr';
    const pageName = page.charAt(0).toUpperCase() + page.slice(1);
    const tag = `#Ad${srcCode}${pageName}`;
    const message = encodeURIComponent(`${tag} Hi! I am interested in tour packages. Can you help me plan my trip?`);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://travelogerapi.travloger.in';
    try {
      const res = await fetch(`${apiUrl}/api/public/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: waName, phone: waPhone, email: waEmail, number_of_travelers: waTravelers, travel_dates: waDates, custom_notes: waNotes, source: params.get('gclid') ? 'Google Ads + WhatsApp' : params.get('fbclid') ? 'Meta Ads + WhatsApp' : source.toLowerCase().includes('google') ? 'Google Ads + WhatsApp' : source.toLowerCase().includes('meta') || source.toLowerCase().includes('facebook') ? 'Meta Ads + WhatsApp' : 'WhatsApp', destination: pageName, landing_page_slug: page, landing_page: page, utm_source: params.get('utm_source'), utm_medium: params.get('utm_medium'), utm_campaign: params.get('utm_campaign'), gclid: params.get('gclid'), fbclid: params.get('fbclid'), session_id: sessionStorage.getItem('travloger_engagement_session') }) });
      if (res.ok) {
        setWaSuccess(true);
        setTimeout(() => {
          window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
          setShowWaPopup(false);
          setWaSuccess(false);
          setWaName(''); setWaPhone(''); setWaEmail(''); setWaTravelers(''); setWaDates(''); setWaNotes('');
        }, 1000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    }
    setWaSubmitting(false);
  };

  const handleEnquire = () => {
    trackEvent('cta_click', { cta_position: 'floating-bar' });
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
            <div className="hidden md:flex flex-col pointer-events-none">
              {/* Scroll to Top Button - Positioned on right */}
              <div className="flex justify-end px-6 pb-2">
                <motion.button
                  onClick={handleScrollToTop}
                  className="rounded-full shadow-lg transition-colors duration-200 mb-2 pointer-events-auto"
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
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors duration-200 pointer-events-auto"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                  aria-label="Contact via WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </motion.button>
              </div>

              {/* Enquire Now Button - White container with padding */}
              <div className="bg-white border-t-2 border-gray-200 px-6 py-4 shadow-sm pointer-events-auto">
                <motion.button
                  onClick={handleEnquire}
                  className="w-full max-w-md mx-auto bg-[#134956] hover:bg-[#0f3d47] text-white py-3 font-semibold text-lg rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                >
                  {content?.contact?.expertButtonText || 'Talk to an Expert'}
                </motion.button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col pointer-events-none">
              {/* Scroll to Top Button - Positioned on right */}
              <div className="flex justify-end px-4 pb-2">
                <motion.button
                  onClick={handleScrollToTop}
                  className=" rounded-full shadow-lg transition-colors duration-200 mb-2 pointer-events-auto"
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
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200 pointer-events-auto"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                  aria-label="Contact via WhatsApp"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </motion.button>
              </div>

              {/* Enquire Now Button - White container with padding */}
              <div className="bg-white border-t-2 border-gray-200 px-4 py-3 shadow-sm pointer-events-auto">
                <motion.button
                  onClick={handleEnquire}
                  className="w-full bg-[#134956] hover:bg-[#0f3d47] text-white py-3 font-semibold font-cta text-base rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                  variants={prefersReducedMotion ? undefined : buttonVariants}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : "tap"}
                >
                  {content?.contact?.expertButtonText || 'Talk to an Expert'}
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
        backgroundImageUrl={content?.contact?.formBackgroundImageUrl}
        backgroundImageUrlMobile={content?.contact?.formBackgroundImageUrlMobile}
      />
      {showWaPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowWaPopup(false)}>
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Connect on WhatsApp</h3>
            <p className="text-sm text-gray-500 mb-4">Fill your details to get instant help</p>
            <input type="text" placeholder="Your Name *" value={waName} onChange={e => setWaName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <input type="tel" placeholder="Phone Number *" value={waPhone} onChange={e => setWaPhone(e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <input type="email" placeholder="Email Address" value={waEmail} onChange={e => setWaEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <input type="text" placeholder="Number of Travelers" value={waTravelers} onChange={e => setWaTravelers(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <input type="text" placeholder="Travel Dates (e.g. 15 Jun - 20 Jun)" value={waDates} onChange={e => setWaDates(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <textarea placeholder="Any specific requirements?" value={waNotes} onChange={e => setWaNotes(e.target.value)} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
            <button onClick={submitWhatsApp} disabled={waSubmitting} className="w-full py-3 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold rounded-lg transition-all disabled:opacity-50">
              {waSuccess ? '✓ Submitted! Opening WhatsApp...' : waSubmitting ? 'Submitting...' : 'Open WhatsApp'}
            </button>
            <button onClick={() => setShowWaPopup(false)} className="w-full mt-2 text-sm text-gray-400 hover:text-gray-600">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
});

FloatingActionBar.displayName = 'FloatingActionBar';

export default FloatingActionBar; 