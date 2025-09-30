'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useIntersectionObserver, useReducedMotion } from '@/lib/hooks';

// Import logo
import logoImg from '../../../public/logo.png';

// Import social icons
import twitterIcon from '../../../public/footerIcons/1.svg';
import facebookIcon from '../../../public/footerIcons/2.svg';
import instagramIcon from '../../../public/footerIcons/3.svg';
import githubIcon from '../../../public/footerIcons/4.svg';

// Import contact icons
import phoneIcon from '../../../public/footerIcons/Light/Icons.svg';
import mailIcon from '../../../public/footerIcons/Light/Icons-1.svg';
import locationIcon from '../../../public/footerIcons/Light/Icons-2.svg';

interface FooterSection {
  title: string;
  links: { name: string; href: string; }[];
}

interface TripDestination {
  name: string;
  imageSrc: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: typeof twitterIcon;
}

const Footer: React.FC = React.memo(() => {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const { setRef: setFooterRef, isInView: isFooterVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });
  const prefersReducedMotion = useReducedMotion();

  const handleImageError = (imageName: string) => {
    setImageErrors(prev => ({
      ...prev,
      [imageName]: true
    }));
  };

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const aboutSections: FooterSection[] = [
    {
      title: 'ABOUT TRAVLOGER',
      links: [
        { name: 'Who we are', href: '/about' },
        { name: 'Why Traveloger?', href: '/why-us' },
        { name: 'Careers', href: '/careers' },
        { name: 'Review & love', href: '/reviews' },
        { name: 'Terms and Conditions', href: '/terms' },
        { name: 'Scam Alerts', href: '/scam-alerts' },
      ]
    },
    {
      title: 'COLLAB WITH US',
      links: [
        { name: 'Local hosts & stays', href: '/collaborate/hosts' },
        { name: 'Influencer travel', href: '/collaborate/influencers' },
        { name: 'Strategic brand collab', href: '/collaborate/brands' },
        { name: 'Destination promos', href: '/collaborate/destinations' },
        { name: 'Events & Retreats', href: '/collaborate/events' },
      ]
    },
    {
      title: 'TRAVLOGER SPECIALS',
      links: [
        { name: 'Group Departures', href: '/specials/group' },
        { name: 'Short Getaways', href: '/specials/getaways' },
        { name: 'Corporate Offsites', href: '/specials/corporate' },
        { name: 'Customised Travel Planning', href: '/specials/custom' },
      ]
    },
    {
      title: 'FOR CREATORS & INFLUENCERS',
      links: [
        { name: 'Travel Free with Us', href: '/creators/travel-free' },
        { name: 'Photography Exchange Program', href: '/creators/photography' },
        { name: 'Work with Travloger', href: '/creators/work-with-us' },
        { name: 'Content Collaborations', href: '/creators/collaborations' },
        { name: 'Brand Ambassador Club', href: '/creators/ambassador' },
      ]
    },
    {
      title: 'GIFT A TRIP',
      links: [
        { name: 'Surprise a Loved One', href: '/gift/surprise' },
        { name: 'Buy Gift Cards', href: '/gift/cards' },
        { name: 'Travel Plans for Anniversaries', href: '/gift/anniversaries' },
        { name: 'Curated Couple Retreats', href: '/gift/couples' },
        { name: 'Personalised Notes Included', href: '/gift/notes' },
      ]
    }
  ];

  const indianTrips: TripDestination[] = [
    { name: 'HAMPI', imageSrc: '/footerImages/hampi.png', href: '/trips/hampi' },
    { name: 'MANALI', imageSrc: '/footerImages/manali.png', href: '/trips/manali' },
    { name: 'GOA', imageSrc: '/footerImages/goa.png', href: '/trips/goa' },
    { name: 'KASHMIR', imageSrc: '/footerImages/kashmir.png', href: '/trips/kashmir' },
    { name: 'RAJASTHAN', imageSrc: '/footerImages/rajasthan.png', href: '/trips/rajasthan' },
    { name: 'SIKKIM', imageSrc: '/footerImages/sikkim.png', href: '/trips/sikkim' },
    { name: 'GUJRAT', imageSrc: '/footerImages/gujrat.png', href: '/trips/gujrat' },
  ];

  const internationalTrips: TripDestination[] = [
    { name: 'THAILAND', imageSrc: '/footerImages/thailand.png', href: '/trips/thailand' },
    { name: 'JAPAN', imageSrc: '/footerImages/japan.png', href: '/trips/japan' },
    { name: 'CHINA', imageSrc: '/footerImages/china.png', href: '/trips/china' },
    { name: 'BAKU', imageSrc: '/footerImages/baku.png', href: '/trips/baku' },
    { name: 'PERU', imageSrc: '/footerImages/peru.png', href: '/trips/peru' },
    { name: 'KOREA', imageSrc: '/footerImages/korea.png', href: '/trips/korea' },
    { name: 'VIETNAM', imageSrc: '/footerImages/vietnam.png', href: '/trips/vietnam' },
  ];

  const socialLinks: SocialLink[] = [
    { name: 'Twitter', href: 'https://twitter.com/travloger', icon: twitterIcon },
    { name: 'Facebook', href: 'https://facebook.com/travloger', icon: facebookIcon },
    { name: 'Instagram', href: 'https://instagram.com/travloger', icon: instagramIcon },
    { name: 'GitHub', href: 'https://github.com/travloger', icon: githubIcon },
  ];

  const bottomLinks = [
    { name: 'About us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy policy', href: '/privacy' },
    { name: 'Sitemap', href: '/sitemap' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Blogs', href: '/blog' },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    })
  };

  const renderTripCard = (trip: TripDestination) => (
    <a
      key={trip.name}
      href={trip.href}
      className="group relative overflow-hidden rounded-lg aspect-square bg-gray-800"
    >
      {!imageErrors[trip.name] ? (
        <Image
          src={trip.imageSrc}
          alt={trip.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 14vw"
          onError={() => handleImageError(trip.name)}
          priority={false}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">{trip.name}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-gray-600/38 to-transparent transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white font-black text-[15px] leading-[22px] text-center px-2 py-1">
          {trip.name}
        </p>
      </div>
    </a>
  );

  return (
    <footer 
      ref={setFooterRef}
                      className="bg-black text-white font-body"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        {/* Trip Destinations Section - Now First */}
        <motion.div
          variants={prefersReducedMotion ? undefined : sectionVariants}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
          animate={isFooterVisible ? "visible" : "hidden"}
          custom={0}
          className="space-y-8 mb-12"
        >
          {/* Indian Trips */}
          <div className="space-y-4">
            <h3 className="text-[13px] font-medium text-white uppercase tracking-[1px] leading-[18px] font-subheading">Indian Trips</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {indianTrips.map(renderTripCard)}
            </div>
          </div>

          {/* International Trips */}
          <div className="space-y-4">
            <h3 className="text-[13px] font-medium text-white uppercase tracking-[1px] leading-[18px] font-subheading">International Trips</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {internationalTrips.map(renderTripCard)}
            </div>
          </div>
        </motion.div>

        {/* Bottom Section - Branding, About, Collab, Contact, Specials, Creators, Gift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          
          {/* Column 1 - Branding & Socials */}
          <motion.div
            variants={prefersReducedMotion ? undefined : sectionVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={isFooterVisible ? "visible" : "hidden"}
            custom={1}
            className="space-y-4"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src={logoImg}
                alt="Travloger"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority={false}
              />
            </div>
            
            {/* Tagline */}
            <p className="text-sm text-gray-300">You travel, We capture.</p>
            
            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed">
              We don&apos;t just book trips. We co-create stories.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center hover:opacity-80 transition-opacity duration-200 group"
                  aria-label={`Follow us on ${link.name}`}
                >
                  <Image
                    src={link.icon}
                    alt={link.name}
                    width={link.name === 'Facebook' ? 12 : 20}
                    height={link.name === 'Facebook' ? 12 : 20}
                    className="transition-all duration-200"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 - About Travloger (Dropdown) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : sectionVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={isFooterVisible ? "visible" : "hidden"}
            custom={2}
            className="space-y-4"
          >
            <button
              onClick={() => toggleSection(aboutSections[0].title)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-[1px] leading-[18px]">
                {aboutSections[0].title}
              </h3>
              <motion.div
                animate={{ rotate: openSections[aboutSections[0].title] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSections[aboutSections[0].title] && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 overflow-hidden"
                >
                  {aboutSections[0].links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[14px] text-gray-300 hover:text-white transition-colors duration-200 block py-1 leading-[22px]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Column 3 - Collab with Us (Dropdown) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : sectionVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={isFooterVisible ? "visible" : "hidden"}
            custom={3}
            className="space-y-4"
          >
            <button
              onClick={() => toggleSection(aboutSections[1].title)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-[1px] leading-[18px]">
                {aboutSections[1].title}
              </h3>
              <motion.div
                animate={{ rotate: openSections[aboutSections[1].title] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSections[aboutSections[1].title] && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 overflow-hidden"
                >
                  {aboutSections[1].links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[14px] text-gray-300 hover:text-white transition-colors duration-200 block py-1 leading-[22px]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Column 4 - Contact Information (Dropdown) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : sectionVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={isFooterVisible ? "visible" : "hidden"}
            custom={4}
            className="space-y-4"
          >
            <button
              onClick={() => toggleSection('CONTACT US')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-[1px] leading-[18px]">
                CONTACT US
              </h3>
              <motion.div
                animate={{ rotate: openSections['CONTACT US'] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSections['CONTACT US'] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 overflow-hidden"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={phoneIcon}
                      alt="Phone"
                      width={23}
                      height={23}
                      className="text-white"
                    />
                    <div>
                      <p className="text-[14px] text-gray-300 leading-[22px]">Telephone</p>
                      <a 
                        href="tel:+916281392007" 
                        className="text-[14px] text-white hover:text-gray-300 transition-colors duration-200 leading-[22px]"
                      >
                        +91-62813-92007
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Image
                      src={mailIcon}
                      alt="Mail"
                      width={23}
                      height={23}
                      className="text-white"
                    />
                    <div>
                      <p className="text-[14px] text-gray-300 leading-[22px]">Mail</p>
                      <a 
                        href="mailto:hello@travloger.in" 
                        className="text-[14px] text-white hover:text-gray-300 transition-colors duration-200 leading-[22px]"
                      >
                        hello@travloger.in
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Image
                      src={locationIcon}
                      alt="Location"
                      width={23}
                      height={23}
                      className="text-white mt-1"
                    />
                    <div>
                      <p className="text-[14px] text-gray-300 leading-[22px]">Address</p>
                      <p className="text-[14px] text-white leading-[22px]">
                        ABC road, Hyderabad, Telangana
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Column 5 - Travloger Specials (Dropdown) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : sectionVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={isFooterVisible ? "visible" : "hidden"}
            custom={5}
            className="space-y-4"
          >
            <button
              onClick={() => toggleSection(aboutSections[2].title)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-[1px] leading-[18px]">
                {aboutSections[2].title}
              </h3>
              <motion.div
                animate={{ rotate: openSections[aboutSections[2].title] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSections[aboutSections[2].title] && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 overflow-hidden"
                >
                  {aboutSections[2].links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[14px] text-gray-300 hover:text-white transition-colors duration-200 block py-1 leading-[22px]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Column 6 - For Creators & Influencers (Dropdown) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : sectionVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={isFooterVisible ? "visible" : "hidden"}
            custom={6}
            className="space-y-4"
          >
            <button
              onClick={() => toggleSection(aboutSections[3].title)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-[1px] leading-[18px]">
                {aboutSections[3].title}
              </h3>
              <motion.div
                animate={{ rotate: openSections[aboutSections[3].title] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSections[aboutSections[3].title] && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 overflow-hidden"
                >
                  {aboutSections[3].links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[14px] text-gray-300 hover:text-white transition-colors duration-200 block py-1 leading-[22px]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Column 7 - Gift a Trip (Dropdown) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : sectionVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={isFooterVisible ? "visible" : "hidden"}
            custom={7}
            className="space-y-4"
          >
            <button
              onClick={() => toggleSection(aboutSections[4].title)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-[13px] font-semibold text-white uppercase tracking-[1px] leading-[18px]">
                {aboutSections[4].title}
              </h3>
              <motion.div
                animate={{ rotate: openSections[aboutSections[4].title] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openSections[aboutSections[4].title] && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 overflow-hidden"
                >
                  {aboutSections[4].links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[14px] text-gray-300 hover:text-white transition-colors duration-200 block py-1 leading-[22px]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar - Utility Links & Copyright */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            variants={prefersReducedMotion ? undefined : sectionVariants}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
            animate={isFooterVisible ? "visible" : "hidden"}
            custom={5}
            className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0"
          >
            {/* Utility Links */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
              {bottomLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[14px] text-gray-300 hover:text-white transition-colors duration-200 leading-[22px]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Copyright */}
            <p className="text-[14px] text-gray-400 leading-[22px]">
              © 2025, All Rights Reserved
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
