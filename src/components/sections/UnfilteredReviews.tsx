'use client';

import React from 'react';
import Image from 'next/image';
import { UnfilteredReview } from '@/types';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import { cn } from '@/lib/utils';

type ReviewsContent = {
  heading?: string;
  subheading?: string;
  reviews?: UnfilteredReview[];
}
import review1 from '../../../public/Reviews/1.jpg';
import review2 from '../../../public/Reviews/2.jpg';
import review3 from '../../../public/Reviews/3.jpg';
import review4 from '../../../public/Reviews/4.jpg';
import review5 from '../../../public/Reviews/5.jpg';
import review6 from '../../../public/Reviews/6.jpg';
import review7 from '../../../public/Reviews/7.jpg';
import review8 from '../../../public/Reviews/8.jpg';

const reviews: UnfilteredReview[] = [
  {
    id: '1',
    name: 'Aarav & Meera Sharma',
    review:
      'Our Kashmir honeymoon package trip with WanderOn was pure magic! From the cozy houseboat stay in Srinagar to the breathtaking views of Gulmarg, everything was perfectly arranged. The candlelight dinner in Srinagar was romantic, and the Dal Lake shikara ride at sunset was unforgettable.',
    images: [
      { src: review1, alt: 'A group of friends enjoying a boat ride on a serene lake.' },
      { src: review2, alt: 'A stunning view of a calm lake with snow-capped mountains in the background.' },
    ],
  },
  {
    id: '2',
    name: 'Rohan Sharma',
    review:
      'An absolutely mesmerizing experience with WanderOn! The beauty of Kashmir is unparalleled, and the trip was organized flawlessly. Our guide was knowledgeable and the accommodations were top-notch. Highly recommended for anyone looking to explore this paradise.',
    images: [
      { src: review3, alt: 'A vibrant, colorful boat docked on the shore of a lake.' },
      { src: review4, alt: 'A picturesque landscape of a river flowing through a lush green valley.' },
    ],
  },
  {
    id: '3',
    name: 'Priya Mehta',
    review:
      "A trip of a lifetime with WanderOn! The houseboat stay was a unique experience, and the local cuisine was delicious. The team's attention to detail made our vacation stress-free and memorable. Every moment in Kashmir was picture-perfect.",
    images: [
      { src: review5, alt: 'A panoramic shot of a valley with a clear blue sky.' },
      { src: review6, alt: 'A beautiful traditional Kashmiri boat, known as a Shikara, on Dal Lake.' },
    ],
  },
  {
    id: '4',
    name: 'Aditi Verma',
    review:
      "Kashmir's beauty is truly breathtaking, and WanderOn captured its essence perfectly. From the blooming tulip gardens to the majestic Himalayas, every moment was picture-perfect. The local experiences they arranged were authentic and memorable.",
    images: [
      { src: review7, alt: 'A wide-angle view of a serene lake reflecting the surrounding mountains.' },
      { src: review8, alt: 'A close-up of a person enjoying the scenic beauty from a boat.' },
    ],
  },
  {
    id: '5',
    name: 'Vikram Singh',
    review:
      'WanderOn made our Kashmir trip exceptional! The snow activities in Gulmarg were thrilling, and the peaceful Dal Lake moments were so serene. Professional service, friendly guides, and amazing memories that will last forever.',
    images: [
      { src: review1, alt: 'Tourists enjoying winter activities in Kashmir.' },
      { src: review3, alt: 'Beautiful Kashmir landscape with traditional architecture.' },
    ],
  },
];

const UnfilteredReviews: React.FC<{ content?: ReviewsContent }> = ({ content }) => {
  // Use CMS content if available, otherwise fall back to default
  const heading = content?.heading || "Unfiltered Reviews";
  const subheading = content?.subheading || "Real experiences from real travelers - authentic stories from Kashmir";
  const displayReviews = content?.reviews || reviews;
  return (
    <section className="bg-gray-50 py-12 md:py-16 overflow-hidden">
      <div className={mobileFirst.container('xl')}>
        <div className="text-center mb-8 md:mb-12">
          <h2 className={cn(
            "font-bold text-gray-900 mb-4 font-heading",
            mobileFirst.text('h1')
          )}>
            {heading.includes('Unfiltered') ? (
              <span dangerouslySetInnerHTML={{ __html: heading }} />
            ) : (
              <>Unfiltered <span className='text-[#134956]'>{heading}</span></>
            )}
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        <div className="relative">
          {/* Scroll Container */}
          <div
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-4 pl-4 md:pl-6"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className={cn(
                  "flex-none overflow-hidden",
                  "w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw]",
                  "scroll-snap-align-start"
                )}
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Images Section */}
                <div className="relative p-4 md:p-6">
                  <div className="relative h-48 sm:h-56 md:h-64 flex items-center justify-center">
                    {/* Back image (portrait) - positioned behind */}
                    <div className="absolute w-28 h-36 sm:w-32 sm:h-44 md:w-36 md:h-48 rounded-lg shadow-lg overflow-hidden border-2 border-white top-2 left-2 md:top-4 md:left-4 transform rotate-[-8deg] z-10">
                <Image
                        src={review.images[0].src}
                        alt={review.images[0].alt}
                  fill
                        className="object-cover"
                        sizes="(max-width: 768px) 40vw, 20vw"
                />
                    </div>

                    {/* Front image (landscape) - positioned in front */}
                    <div className="absolute w-40 h-28 sm:w-48 sm:h-32 md:w-56 md:h-36 rounded-lg shadow-xl overflow-hidden border-2 border-white top-8 left-16 sm:top-12 sm:left-20 md:top-16 md:left-24 transform rotate-[4deg] z-20">
                <Image
                        src={review.images[1].src}
                        alt={review.images[1].alt}
                  fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Yellow tape */}
                      <div className="absolute top-1 right-[-12px] sm:top-2 sm:right-[-16px] md:top-2 md:right-[-20px] w-12 h-4 sm:w-16 sm:h-5 md:w-20 md:h-6 bg-yellow-300/90 transform rotate-45 z-30" />
                    </div>
                  </div>
          </div>

                {/* Review Text Section */}
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <blockquote className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed italic mb-3 md:mb-4 line-clamp-4">
                    &ldquo;{review.review}&rdquo;
                </blockquote>
                  <p className="text-right text-sm sm:text-base font-bold font-price text-[#134956]">
                    - {review.name}
                </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default UnfilteredReviews; 