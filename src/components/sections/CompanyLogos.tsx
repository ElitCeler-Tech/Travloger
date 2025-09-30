'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useIntersectionObserver, useReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { mobileFirst } from '@/lib/mobile-first-patterns';
import LazyLoad from '@/components/ui/LazyLoad';
import microsoftLogo from '../../../public/companies/microsoft.svg';
import amazonLogo from '../../../public/companies/amazon.svg';
import cognizantLogo from '../../../public/companies/cognizant.svg';
import jpMorganLogo from '../../../public/companies/jpMorgan.svg';
import hondaLogo from '../../../public/companies/honda.svg';
import deloitte from '../../../public/companies/deloitte-1.svg'
import dbs from '../../../public/companies/dbs.svg';
import hyundaiLogo from '../../../public/companies/hyundai.svg';
import mgLogo from '../../../public/companies/mg.svg'
import mercedesLogo from '../../../public/companies/mercedes.svg'

// Company logos data - moved outside the component
const companies = [
    { name: 'Microsoftt', logo: microsoftLogo, width: 180, height: 80 },
    { name: 'Amazon', logo: amazonLogo, width: 180, height: 80 },
    { name: 'Cognizant', logo: cognizantLogo, width: 200, height: 80 },
    { name: 'J.P. Morgan', logo: jpMorganLogo, width: 220, height: 80 },
    { name: 'Mercedes', logo: mercedesLogo, width: 50, height: 60 },
    { name: 'Hyundai', logo: hyundaiLogo, width: 70, height: 50 },
    { name: 'MG', logo: mgLogo, width: 70, height: 60 },
    { name: 'Honda', logo: hondaLogo, width: 80, height: 60 },
    { name: 'Deloitte', logo: deloitte, width: 150, height: 60 },
    { name: 'DBS', logo: dbs, width: 120, height: 60 },

];

type BrandsContent = {
  heading?: string
  subheading?: string
  brands?: {
    id: string
    name: string
    logoUrl: string
    width?: number
    height?: number
  }[]
}

const CompanyLogos = React.memo(({ content }: { content?: BrandsContent }) => {
  // Use CMS content if available, otherwise fall back to default
  const heading = content?.heading || "Brands Who've Worked with Us"
  const subheading = content?.subheading || "Corporate clients who trust Travloger for their offsites & escapes"
  const displayBrands = content?.brands || companies
    const { setRef: titleRef } = useIntersectionObserver({
        threshold: 0.3,
        triggerOnce: true
    });
    const { isInView: logosInView, setRef: logosRef } = useIntersectionObserver({
        threshold: 0.2,
        triggerOnce: true
    });
    const { isInView: footerInView, setRef: footerRef } = useIntersectionObserver({
        threshold: 0.3,
        triggerOnce: true
    });
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            {/* Title Section - White Background */}
            <section className="py-10 bg-white" ref={titleRef}>
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <LazyLoad
                            animationType="fade"
                            delay={0.2}
                        >
                            <h2 className={cn(
                              "font-bold text-gray-900 mb-4 font-heading",
                              mobileFirst.text('h1')
                            )}>
                              {heading.includes('Brands Who&apos;ve Worked') ? (
                                <span dangerouslySetInnerHTML={{ __html: heading }} />
                              ) : (
                                <>Brands Who&apos;ve Worked <span className='text-[#134956]'>{heading}</span></>
                              )}
                            </h2>
                        </LazyLoad>
                    </div>
                </div>
            </section>

            {/* Logos Section - White Background with SVG Logos */}
            <section className="bg-white overflow-hidden" ref={logosRef}>
                <div className="container mx-auto px-4">
                    {/* Infinite Scrolling Logos with Framer Motion */}
                    <div className="relative flex overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:bg-gradient-to-r before:from-white before:via-white/0 before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:bg-gradient-to-l after:from-white after:via-white/0 after:to-transparent after:content-['']">
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ 
                                opacity: logosInView ? 1 : 0,
                                x: logosInView ? 0 : -100
                            }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.div
                                transition={{
                                    duration: prefersReducedMotion ? 0 : 25,
                                    ease: 'linear',
                                    repeat: prefersReducedMotion ? 0 : Infinity,
                                }}
                                initial={{ translateX: 0 }}
                                animate={{ translateX: prefersReducedMotion ? 0 : '-50%' }}
                                className="flex flex-none gap-10 md:gap-12 lg:gap-16 pr-10 md:pr-12 lg:pr-16"
                            >
                                {displayBrands
                                    .filter((company) => {
                                        // Filter out companies with empty logoUrl
                                        const logoSource = 'logoUrl' in company ? company.logoUrl : company.logo;
                                        return logoSource && typeof logoSource === 'string' && logoSource.trim() !== '';
                                    })
                                    .map((company) => (
                                    <motion.div 
                                        key={company.name} 
                                        className="flex-shrink-0 flex items-center justify-center group"
                                        whileHover={{ 
                                            scale: 1.05,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <div className="w-24 h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 flex items-center justify-center">
                                            <Image 
                                                src={'logoUrl' in company ? company.logoUrl : company.logo} 
                                                alt={`${company.name} logo`} 
                                                width={company.width || 120} 
                                                height={company.height || 60} 
                                                className="object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 max-w-full max-h-full" 
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Corporate Footer Section */}
            <section className="py-8 md:py-12 bg-white" ref={footerRef}>
                <div className="container mx-auto px-4">
                    {!prefersReducedMotion ? (
                        <div className="text-center">
                            <motion.p 
                                className="text-gray-600 text-sm md:text-base lg:text-lg font-body leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: footerInView ? 1 : 0, y: footerInView ? 0 : 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {subheading}
                            </motion.p>
                            
                            {/* Decorative line */}
                            <motion.div
                                className="w-24 h-1 bg-gradient-to-r from-teal-400 to-orange-400 mx-auto mt-4 md:mt-6 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: footerInView ? 1 : 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            />
                        </div>
                    ) : (
                        <LazyLoad
                            animationType="fade"
                            delay={0.4}
                        >
                            <div className="text-center">
                                <p className="text-gray-600 text-sm md:text-base lg:text-lg font-body leading-relaxed">
                                    {subheading}
                                </p>
                                
                                {/* Decorative line */}
                                <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-orange-400 mx-auto mt-4 md:mt-6 rounded-full" />
                            </div>
                        </LazyLoad>
                    )}
                </div>
            </section>
        </>
    );
});

CompanyLogos.displayName = 'CompanyLogos';

export default CompanyLogos;