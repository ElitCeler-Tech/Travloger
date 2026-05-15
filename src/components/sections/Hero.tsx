'use client';

import React from 'react';
import Image from 'next/image';
import heroBg from '../../../public/hero-bg.png';
import { accessibility } from '@/lib/mobile-first-patterns';
// trackEvent imported for CTA tracking — uncomment when blackout test ends
// import { trackEvent } from '@/lib/engagement';

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
  const [showWaForm, setShowWaForm] = React.useState(false);
  const [waName, setWaName] = React.useState('');
  const [waPhone, setWaPhone] = React.useState('');

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
    <>
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
              aria-hidden="true"
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
              aria-hidden="true"
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

      {/* Static Trust Indicators with Glass Effect */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-white/20 backdrop-blur-sm ">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-center items-center space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-16">
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
    {showWaForm && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowWaForm(false)}>
        <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Connect on WhatsApp</h3>
          <p className="text-sm text-gray-500 mb-4">Enter your details to get instant help</p>
          <input type="text" placeholder="Your Name" value={waName} onChange={e => setWaName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input type="tel" placeholder="Phone Number" value={waPhone} onChange={e => setWaPhone(e.target.value.replace(/[^0-9]/g, ''))} maxLength={10} className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <button onClick={() => {
            if (!waName || waPhone.length < 10) { alert('Please enter name and 10-digit phone'); return }
            const phoneNumber = (content?.whatsappPhone || defaultContent?.whatsappPhone || '+919876543210').replace(/[^0-9]/g, '');
            const params = new URLSearchParams(window.location.search);
            const page = window.location.pathname.replace(/^\//, '').split('/')[0] || 'home';
            const src = params.get('utm_source') || '';
            const srcCode = src.toLowerCase().includes('google') || params.get('gclid') ? 'Gg' : src.toLowerCase().includes('meta') || params.get('fbclid') ? 'Mt' : src ? 'Og' : 'Dr';
            const tag = `#Ad${srcCode}${page.charAt(0).toUpperCase() + page.slice(1)}`;
            const msg = encodeURIComponent(`${tag} ${content?.whatsappMessage || defaultContent?.whatsappMessage || 'Hi! I am interested in planning a trip.'}`);
            window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
            setShowWaForm(false);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://travelogerapi.travloger.in';
            fetch(`${apiUrl}/api/public/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: waName, phone: waPhone, source: 'WhatsApp', destination: page.charAt(0).toUpperCase() + page.slice(1), landing_page_slug: page, landing_page: page, utm_source: params.get('utm_source'), utm_medium: params.get('utm_medium'), utm_campaign: params.get('utm_campaign'), gclid: params.get('gclid'), fbclid: params.get('fbclid'), session_id: sessionStorage.getItem('travloger_engagement_session') }) }).catch(() => {});
            setWaName(''); setWaPhone('');
          }} className="w-full py-3 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold rounded-lg transition-all">Open WhatsApp</button>
          <button onClick={() => setShowWaForm(false)} className="w-full mt-2 text-sm text-gray-400 hover:text-gray-600">Cancel</button>
        </div>
      </div>
    )}
    </>
  );
});

Hero.displayName = 'Hero';

export default Hero; 
