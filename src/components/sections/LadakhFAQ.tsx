'use client';
import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { FAQ as FAQType } from '@/types';
import { useIntersectionObserver, useReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import './FAQ.css';

interface FAQContent {
  heading?: string;
  items?: FAQType[];
}

interface LadakhFAQProps {
  content?: FAQContent;
}

const defaultLadakhFaqData: FAQType[] = [
  {
    id: '1',
    question: "What's included in the Travlogers Ladakh package?",
    answer: "Our Ladakh package includes hotel stays, daily breakfast & dinner, private cab for sightseeing, and photography. Flight bookings, monastery visits, and adventure activities can be added as extras. You'll also get 24/7 trip support from our team."
  },
  {
    id: '2',
    question: "Is photography included in the group trip?",
    answer: "Yes, professional photography is included in all our Ladakh group trips. Our experienced photographers will capture your best moments throughout the journey, including stunning landscapes and monastery visits, and you'll receive a curated collection of high-quality photos after the trip."
  },
  {
    id: '3',
    question: "How does the booking process work?",
    answer: "The booking process is simple: 1) Choose your preferred Ladakh package and dates, 2) Pay a small booking amount to secure your spot, 3) Complete the remaining payment before the trip, 4) Receive your detailed itinerary and travel documents. Our team will guide you through each step."
  },
  {
    id: '4',
    question: "Will someone assist us during the trip?",
    answer: "Absolutely! You'll have a dedicated trip coordinator who will be available 24/7 throughout your Ladakh journey. Additionally, our local guides will accompany you to all major attractions and provide insights about Ladakh's culture, history, and hidden gems."
  },
  {
    id: '5',
    question: "Do you arrange adventure activities or surprises for couples?",
    answer: "Yes, we specialize in creating magical experiences in Ladakh! We can arrange adventure activities like trekking, mountain biking, and river rafting (seasonal). For couples, we offer romantic surprises like candlelight dinners, private monastery visits, and special photography sessions at scenic locations like Pangong Lake."
  }
];

const LadakhFAQ = ({ content }: LadakhFAQProps) => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null); // Default first FAQ open
  const prefersReducedMotion = useReducedMotion();

  // Merge CMS content with defaults
  const faqData = React.useMemo(() => {
    if (!content?.items || content.items.length === 0) {
      return defaultLadakhFaqData;
    }
    
    // Smart merging: combine default items with CMS items
    return defaultLadakhFaqData.map(defaultItem => {
      const cmsItem = content.items?.find((item: FAQType) => item.id === defaultItem.id);
      return cmsItem || defaultItem;
    });
  }, [content?.items]);

  // Intersection observers for animations
  const { setRef: setHeaderRef, isInView: isHeaderVisible } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });

  const { setRef: setFaqListRef, isInView: isFaqListVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="faq-section relative py-16 lg:py-24 overflow-hidden font-body">
      {/* Background Design Pattern */}
      <div className="faq-background-overlay absolute inset-0">
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={setHeaderRef}
          className={`text-center mb-8 md:mb-12 transition-all duration-1000 ease-out ${
            isHeaderVisible && !prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className={cn(
            "font-bold text-gray-900 mb-4 font-heading",
            mobileFirst.text('h1')
          )}>
            {content?.heading || (
              <>
                Before You Pack, <span className='text-[#134956]'>Read This FAQs.</span>
              </>
            )}
          </h2>
        </div>

        {/* FAQ List */}
        <div
          ref={setFaqListRef}
          className="max-w-4xl mx-auto space-y-4 lg:space-y-6"
        >
          {faqData.map((faq, index) => {
            const isOpen = openFAQ === faq.id;
            return (
              <div
                key={faq.id}
                className={`border-2 rounded-xl lg:rounded-2xl transition-all duration-500 ease-out overflow-hidden transform hover:scale-[1.02] hover:shadow-lg ${
                  isOpen
                    ? 'bg-[#134956] border-[#134956]'
                    : 'bg-transparent border-black'
                } ${
                  isFaqListVisible && !prefersReducedMotion
                    ? 'opacity-100 translate-y-0'
                    : prefersReducedMotion
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                } ${!prefersReducedMotion ? `animate-fade-in-delay-${index}` : ''}`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-4 sm:p-6 lg:p-8 flex items-center justify-between group focus:outline-none transition-all duration-300 hover:bg-black/5"
                  data-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <h3
                    className={`text-sm sm:text-base lg:text-lg font-semibold transition-colors duration-300 pr-4 font-subheading ${
                      isOpen ? 'text-white' : 'text-black group-hover:text-[#134956]'
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <div
                    className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 transition-all duration-500 ease-out group-hover:scale-110 ${
                      isOpen ? 'text-white rotate-180' : 'text-black group-hover:text-[#134956]'
                    }`}
                  >
                    {isOpen ? (
                      <XMarkIcon className="w-full h-full" />
                    ) : (
                      <PlusIcon className="w-full h-full" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-700 ease-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div
                    className={`px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 transition-all duration-500 delay-150 ease-out ${
                      isOpen ? 'transform translate-y-0' : 'transform -translate-y-2'
                    }`}
                  >
                    <p className="text-white text-sm sm:text-base leading-relaxed font-body">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LadakhFAQ;