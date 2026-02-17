'use client';

import React from 'react';
import Image from 'next/image';
import heroBg from '../../../public/hero-bg.png';
import { accessibility } from '@/lib/mobile-first-patterns';

interface HeroContent {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string; // Desktop/Fallback image
  mobileBackgroundImageUrl?: string; // New: Mobile specific image
  mobileVideoUrl?: string;
  desktopVideoUrl?: string;    // New: Desktop specific video
  ctaText?: string;
  ctaSecondaryText?: string;
  whatsappPhone?: string;
  whatsappMessage?: string;
  trustIndicators?: {
    google: { rating: string; label: string };
    payLater: { rating: string; label: string };
    instagram: { rating: string; label: string; url?: string };
  };
}

// Extended props to allow passing defaults from wrapper components
interface HeroProps {
  content?: HeroContent;
  defaultContent?: HeroContent; // Optional default values for fallback
}

const Hero = React.memo(({ content, defaultContent }: HeroProps) => {



  /* Commented out for blackout test
  const handleWhatsAppClick = () => {
    const phoneNumber = (content?.whatsappPhone || defaultContent?.whatsappPhone || '+919876543210').replace(/\s+/g, '');
    const message = encodeURIComponent(content?.whatsappMessage || defaultContent?.whatsappMessage || 'Hi! I am interested in planning a trip. Can you help me?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleItineraryClick = () => {
    const packagesSection = document.querySelector('#packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  */

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
      rating: content?.trustIndicators?.google?.rating || "4.9",
      text: content?.trustIndicators?.google?.label || "Ratings"
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
      rating: content?.trustIndicators?.payLater?.rating || "Pay Later",
      text: content?.trustIndicators?.payLater?.label || "Flexible"
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
      rating: content?.trustIndicators?.instagram?.rating || "5K+",
      text: content?.trustIndicators?.instagram?.label || "Followers",
      url: content?.trustIndicators?.instagram?.url
    }
  ];

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Skip link for accessibility */}
      <a href="#packages" className={accessibility.skipLink}>
        Skip to main content
      </a>

      {/* Background Video/Image for Mobile */}
      <div className="absolute inset-0 z-0 md:hidden">

        {content?.mobileVideoUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={content?.mobileBackgroundImageUrl || content?.backgroundImageUrl || heroBg}
              alt="Background"
              fill
              className="object-cover"
              style={{ objectPosition: '30% center' }}
              priority
              sizes="100vw"
              {...(!(content?.mobileBackgroundImageUrl || content?.backgroundImageUrl) && { placeholder: "blur" })}
              quality={85}
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
              style={{ objectPosition: '30% center' }}
              key={content.mobileVideoUrl}
            >
              <source src={content.mobileVideoUrl} type="video/mp4" />
            </video>
          </div>
        ) : (
          <Image
            src={content?.mobileBackgroundImageUrl || content?.backgroundImageUrl || heroBg}
            alt="Background"
            fill
            className="object-cover"
            style={{ objectPosition: '30% center' }}
            priority
            sizes="100vw"
            {...(!(content?.mobileBackgroundImageUrl || content?.backgroundImageUrl) && { placeholder: "blur" })}
            quality={85}
          />
        )}
      </div>

      {/* Background Image/Video for Large Screens */}
      <div className="absolute inset-0 z-0 hidden md:block">

        {content?.desktopVideoUrl ? (
          <div className="relative w-full h-full">
            {/* Fallback Image behind the video */}
            <Image
              src={content?.backgroundImageUrl || defaultContent?.backgroundImageUrl || heroBg}
              alt="Hero background"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
              placeholder={typeof (content?.backgroundImageUrl || defaultContent?.backgroundImageUrl || heroBg) === 'string' ? undefined : 'blur'}
              quality={85}
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
              style={{ objectPosition: 'center center' }}
              key={content.desktopVideoUrl} // Force re-render if URL changes
            >
              <source src={content.desktopVideoUrl} type="video/mp4" />
            </video>
          </div>
        ) : (
          <Image
            src={content?.backgroundImageUrl || defaultContent?.backgroundImageUrl || heroBg}
            alt={content?.title || defaultContent?.title || "Hero background"}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            placeholder={typeof (content?.backgroundImageUrl || defaultContent?.backgroundImageUrl || heroBg) === 'string' ? undefined : 'blur'}
            quality={85}
          />
        )}
      </div>

      {/* BLACKOUT TEST - Temporarily Hiding Content */}
      {/* 
      <div className={`relative z-30 min-h-[600px] h-[70vh] flex items-start pt-32 sm:pt-40 lg:pt-48 ${mobileFirst.container('xl')}`}>
        <div className="w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-4xl px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-white font-heading leading-tight tracking-tight mb-4 sm:mb-6 text-left text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {content?.title || defaultContent?.title || (
                <>Two Ways To <span className="text-teal-400">Explore</span></>
              )}
            </h1>

            <p className="text-white font-subheading leading-relaxed tracking-wide mb-8 sm:mb-10 text-left text-lg sm:text-xl md:text-2xl opacity-90">
              {content?.subtitle || defaultContent?.subtitle || "One Story to Remember."}
            </p>

            <div className="flex flex-wrap items-start gap-4">
              <button
                onClick={handleWhatsAppClick}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full transition-all duration-300 font-cta w-full sm:w-auto min-w-[200px] h-12 md:h-14 flex items-center justify-center px-8 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  {content?.ctaText || defaultContent?.ctaText || "Plan on WhatsApp"}
                </span>
              </button>

              <button
                onClick={handleItineraryClick}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full transition-all duration-300 font-cta w-full sm:w-auto min-w-[200px] h-12 md:h-14 flex items-center justify-center px-8 shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {content?.ctaSecondaryText || defaultContent?.ctaSecondaryText || "Get My Itinerary"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      */}

      {/* Static Trust Indicators with Glass Effect */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-white/20 backdrop-blur-sm ">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-center items-center space-x-10 md:space-x-12 lg:space-x-16">
              {trustIndicators.map((indicator, index) => {
                const innerContent = (
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
                      <div className="text-white/90 text-[10px] md:text-xs font-small drop-shadow-sm">
                        {indicator.text}
                      </div>
                    </div>
                  </div>
                );

                if ('url' in indicator && indicator.url) {
                  return (
                    <a
                      key={index}
                      href={indicator.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      {innerContent}
                    </a>
                  );
                }

                return innerContent;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero; 
