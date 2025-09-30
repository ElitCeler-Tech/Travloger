'use client';

import React from 'react';
import Image from 'next/image';
import heroBg from '../../../public/hero-bg.png';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks';
import { mobileFirst, accessibility } from '@/lib/mobile-first-patterns';

interface HeroContent {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string;
  mobileVideoUrl?: string;
  ctaText?: string;
  ctaSecondaryText?: string;
}

interface GokarnaHeroProps {
  content?: HeroContent;
}

const GokarnaHero = React.memo(({ content }: GokarnaHeroProps) => {
  const prefersReducedMotion = useReducedMotion();

  // WhatsApp contact function
  const handleWhatsAppClick = () => {
    const phoneNumber = '+919876543210'; // Replace with actual number
    const message = encodeURIComponent('Hi! I am interested in Gokarna tour packages. Can you help me plan my trip?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Scroll to packages section
  const handleItineraryClick = () => {
    const packagesSection = document.querySelector('#packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Static trust indicators data
  const trustIndicators = [
    {
      icon: (
        <Image 
          src="/trustedIcons/googel.svg" 
          alt="Google" 
          width={24}
          height={24}
          className="w-6 h-6" 
        />
      ),
      rating: "4.9",
      text: "Ratings"
    },
    {
      icon: (
        <Image 
          src="/trustedIcons/payLater.svg" 
          alt="Pay Later" 
          width={20}
          height={20}
          className="w-6 h-6" 
        />
      ),
      rating: "Pay Later",
      text: "Flexible"
    },
    {
      icon: (
        <Image 
          src="/trustedIcons/insta.svg" 
          alt="Instagram" 
          width={24}
          height={24}
          className="w-6 h-6" 
        />
      ),
      rating: "5K+",
      text: "Followers"
    }
  ];

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Skip link for accessibility */}
      <a href="#packages" className={accessibility.skipLink}>
        Skip to main content
      </a>

      {/* Background Video for Small Screens */}
      <div className="absolute inset-0 z-0 md:hidden">
        {content?.mobileVideoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ objectPosition: '30% center' }}
          >
            <source src={content.mobileVideoUrl} type="video/mp4" />
            {/* Fallback to image if video fails to load */}
            <Image
              src={content?.backgroundImageUrl || heroBg}
              alt="Gokarna landscape with beaches and temples"
              fill
              className="object-cover"
              style={{ objectPosition: '30% center' }}
              priority
              sizes="100vw"
              {...(!content?.backgroundImageUrl && { placeholder: "blur" })}
              quality={85}
            />
          </video>
        ) : (
          <Image
            src={content?.backgroundImageUrl || heroBg}
            alt="Gokarna landscape with beaches and temples"
            fill
            className="object-cover"
            style={{ objectPosition: '30% center' }}
            priority
            sizes="100vw"
            {...(!content?.backgroundImageUrl && { placeholder: "blur" })}
            quality={85}
          />
        )}
      </div>

      {/* Background Image for Large Screens */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src={content?.backgroundImageUrl || heroBg}
          alt="Gokarna landscape with beaches and temples"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          {...(!content?.backgroundImageUrl && { placeholder: "blur" })}
          quality={85}
        />
      </div>
      {/* Gradient Overlay - Mobile Optimized */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/1 to-black/1" />

      {/* Content Container - Mobile First Left Aligned */}
      <div className={`relative z-20 h-[70vh] flex items-center ${mobileFirst.container('xl')}`}>
        {!prefersReducedMotion ? (
          <motion.div 
            className="w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-3xl px-4 sm:px-6 lg:px-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Main Heading - Left Aligned */}
            <motion.h1 
              className={`text-white font-heading leading-tight tracking-wide sm:mb-6 text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}
              variants={staggerItem}
            >
              Two Ways To{' '}
              <span className="text-teal-400 inline-block">
                Explore Gokarna
              </span>
              .
            </motion.h1>

            <motion.p 
              className={`text-white font-subheading leading-tight tracking-wide mb-8 sm:mb-10 md:mb-12 text-left ${mobileFirst.text('heroSubtitle')}`}
              variants={staggerItem}
            >
              One Story to Remember.
            </motion.p>
      
            {/* CTA Buttons - Vertical Stack */}
            <motion.div 
              className="flex flex-col items-start gap-4 mt-57"
              variants={staggerItem}
            >
              <motion.button
                onClick={handleWhatsAppClick}
                className={`${mobileFirst.button('primary', 'responsive')} font-cta shadow-lg hover:shadow-xl w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px] h-12 md:h-14 flex items-center justify-center px-6 py-3 ${accessibility.focus}`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                aria-label="Contact us on WhatsApp to plan your Gokarna trip"
              >
                <span className="flex items-end justify-end gap-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Plan on WhatsApp
                </span>
              </motion.button>
              
              <motion.button
                onClick={handleItineraryClick}
                className={`bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-cta transition-all duration-300 hover:shadow-lg w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px] h-12 md:h-14 flex items-center justify-center px-6 py-3 ${mobileFirst.button('ghost', 'responsive')} ${accessibility.focus}`}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                aria-label="View our Gokarna tour packages and itineraries"
              >
                <span className="flex items-center justify-center gap-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Get My Itinerary
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          // Fallback for users who prefer reduced motion
          <div className="w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className={`text-white font-heading leading-tight tracking-wide mb-4 sm:mb-6 text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}>
              Two Ways To{' '}
              <span className="text-teal-400 inline-block">
                Explore Gokarna
              </span>
              .
            </h1>

            <p className={`text-white font-subheading leading-tight tracking-wide mb-8 sm:mb-10 md:mb-12 text-left ${mobileFirst.text('heroSubtitle')}`}>
              One Story to Remember.
            </p>
            
            {/* CTA Buttons - Static Version - Vertical Stack */}
            <div className="flex flex-col items-start gap-4">
              <button
                onClick={handleWhatsAppClick}
                className={`${mobileFirst.button('primary', 'responsive')} font-cta shadow-lg hover:shadow-xl w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px] h-12 md:h-14 flex items-center justify-center px-6 py-3 ${accessibility.focus}`}
                aria-label="Contact us on WhatsApp to plan your Gokarna trip"
              >
                <span className="flex items-center justify-center gap-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Plan on WhatsApp
                </span>
              </button>
              
              <button
                onClick={handleItineraryClick}
                className={`bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-white/50 text-white font-cta transition-all duration-300 hover:shadow-lg w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px] h-12 md:h-14 flex items-center justify-center px-6 py-3 ${mobileFirst.button('ghost', 'responsive')} ${accessibility.focus}`}
                aria-label="View our Gokarna tour packages and itineraries"
              >
                <span className="flex items-center justify-center gap-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Get My Itinerary
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Static Trust Indicators with Glass Effect */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-white/20 backdrop-blur-sm ">
          <div className="container mx-auto px- py-2">
            <div className="flex justify-center items-center space-x-10 md:space-x-12 lg:space-x-16">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    {indicator.icon}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      {indicator.rating === "4.9" && (
                        <span className="text-yellow-400 text-sm drop-shadow-sm">★</span>
                      )}
                      <span className="text-white font-semibold text-xs md:text-base drop-shadow-sm">
                        {indicator.rating}
                      </span>
                    </div>
                    <div className="text-white/90 text-xs md:text-xs font-small drop-shadow-sm">
                      {indicator.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

GokarnaHero.displayName = 'GokarnaHero';

export default GokarnaHero; 