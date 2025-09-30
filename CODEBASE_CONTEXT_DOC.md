# Travloger - Codebase Context Documentation

## Project Overview
**Travloger** is a Kashmir travel booking website built with modern web technologies. Currently desktop-first, the project needs to be transformed into a mobile-first responsive design inspired by leading travel booking platforms.

## Tech Stack & Dependencies

### Core Technologies
- **Next.js 15.3.5** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS v4.1.11** - Utility-first CSS framework
- **Framer Motion 12.23.0** - Animation library
- **GSAP 3.13.0** - Additional animation library

### UI & Components
- **Embla Carousel 8.6.0** - Modern carousel library
- **Heroicons 2.2.0** - Icon library
- **React Social Icons 6.24.0** - Social media icons
- **Swiper 11.2.10** - Touch slider library

### Performance & Utilities
- **class-variance-authority 0.7.1** - Component variants
- **tailwind-merge 3.3.1** - Tailwind class merging
- **clsx 2.1.1** - Conditional classnames
- **React Window & Virtualized** - List virtualization

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & CSS variables
│   ├── layout.tsx           # Root layout with fonts & metadata
│   └── page.tsx             # Home page with section imports
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Fixed navigation with mobile menu
│   │   └── Footer.tsx       # Multi-column footer with accordions
│   ├── sections/
│   │   ├── Hero.tsx         # Full-screen hero with CTAs
│   │   ├── TripOptions.tsx  # Package cards with carousel
│   │   ├── UnfilteredReviews.tsx # Testimonials with animations
│   │   ├── GroupCTA.tsx     # Group booking promotion
│   │   ├── Accommodation.tsx # Image comparison slider
│   │   ├── TripHighlights.tsx # Highlights showcase
│   │   ├── FAQ.tsx          # Expandable FAQ section
│   │   ├── Features.tsx     # Feature cards (commented out)
│   │   └── CompanyLogos.tsx # Partner logos
│   └── ui/
│       ├── FloatingActionBar.tsx # Sticky CTA buttons
│       ├── Button.tsx       # Reusable button component
│       ├── EnquireModal.tsx # Contact form modal
│       ├── ItineraryModal.tsx # Trip details modal
│       └── [other UI components]
├── lib/
│   ├── utils.ts             # Utility functions (cn, debounce, etc.)
│   ├── hooks.ts             # Custom hooks (intersection, scroll, etc.)
│   ├── animations.ts        # Framer Motion variants
│   └── performance.ts       # Performance optimization utilities
└── types/
    └── index.ts             # TypeScript type definitions
```

## Current Page Structure (Top to Bottom)

### 1. Header Component
- **Fixed positioning** with backdrop blur
- **Logo + Navigation** (Plan my trip, Stays, Highlights)
- **Mobile hamburger menu** with slide-out navigation
- **Enquire Now button** (hidden on mobile)
- **Auto-hide on scroll down** (accessibility-aware)

### 2. Hero Section
- **Full-screen background image** (Kashmir landscape)
- **Large typography** with animated text
- **Dual CTAs**: "Plan on WhatsApp" + "Get My Itinerary"
- **Framer Motion animations** with reduced motion support

### 3. TripOptions Section
- **Package cards** with pricing and details
- **Dual carousels** (Custom vs Group trips)
- **Embla Carousel** implementation
- **Mobile grid fallback** for smaller screens
- **Detailed modal** for trip information

### 4. UnfilteredReviews Section
- **Rotating testimonials** with auto-advance
- **Animated image pairs** (portrait + landscape)
- **Yellow tape decoration** for authenticity
- **Smooth transitions** between reviews

### 5. GroupCTA Section
- **Gradient background** with overlay image
- **Group discount messaging** (up to 50% off)
- **Modal form** for group bookings
- **Decorative elements** for visual appeal

### 6. Accommodation Section
- **Image comparison slider** (stock vs real photos)
- **"What You See Is Where You'll Stay"** messaging
- **Custom Compare component** with drag interaction

### 7. TripHighlights Section
- **Highlight cards** with images and descriptions
- **Grid layout** responsive design
- **Intersection observer** animations

### 8. FAQ Section
- **Expandable accordion** questions
- **Custom styling** with gradient background
- **Smooth expand/collapse** animations
- **Mobile-optimized** spacing

### 9. CompanyLogos Section
- **Partner/trust logos** display
- **Responsive grid** layout
- **Lazy loading** for performance

### 10. Footer Component
- **Multi-column links** organized by category
- **Mobile accordion** for link sections
- **Social media icons** and contact info
- **Company information** section

### 11. FloatingActionBar
- **Sticky bottom positioning** 
- **WhatsApp, Call, Enquire buttons**
- **Scroll-based visibility** (appears after packages section)
- **Mobile-optimized** layout

## Design System & Styling

### Color Scheme
- **Primary**: `#134956` (Dark teal)
- **Secondary**: `#0f3d47` (Darker teal)
- **Accent**: `#teal-500` (Bright teal)
- **Background**: White/light gray variants

### Typography
- **Display Font**: Comfortaa (headings, buttons, branding)
- **Body Font**: Open Sans (paragraphs, descriptions)
- **Responsive sizing**: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`

### Spacing System
- **Container**: `mx-auto px-4 lg:px-8`
- **Sections**: `py-12 md:py-16 lg:py-20`
- **Component gaps**: `gap-4 md:gap-6 lg:gap-8`

### Responsive Breakpoints
- **Mobile**: `< 640px`
- **Tablet**: `640px - 768px`
- **Desktop**: `768px - 1024px`
- **Large Desktop**: `> 1024px`

## Key Implementation Patterns

### Performance Optimizations
- **Dynamic imports** for below-the-fold components
- **Lazy loading** with custom LazyLoad component
- **Image optimization** with Next.js Image component
- **Intersection observers** for scroll-based animations
- **Debounced scroll handlers** for better performance

### Animation System
- **Framer Motion** for complex animations
- **GSAP** for specific timeline animations
- **Stagger animations** for sequential reveals
- **Reduced motion** accessibility support
- **Hardware acceleration** optimizations

### Custom Hooks
- **useIntersectionObserver**: Scroll-based animations
- **useScrollPosition**: Scroll tracking with throttling
- **useReducedMotion**: Accessibility preference detection
- **useWindowSize**: Responsive behavior hooks

### State Management
- **React useState** for local component state
- **Modal state** management across components
- **Form handling** with controlled inputs
- **Carousel state** with Embla API integration

## Current Issues for Mobile-First Transformation

### Navigation Issues
- **Desktop-first approach** - mobile menu is secondary
- **Complex navigation** items may not work well on mobile
- **Logo sizing** not optimized for mobile viewports
- **Touch targets** may be too small

### Layout Issues
- **Large typography** doesn't scale well on mobile
- **Carousel-heavy approach** - not ideal for mobile scrolling
- **Fixed spacing** doesn't adapt well to mobile
- **Content density** too high for mobile screens

### Performance Issues
- **Heavy animations** may impact mobile performance
- **Large images** not optimized for mobile bandwidth
- **Complex carousels** may cause scroll conflicts on mobile

### UX Issues
- **CTA placement** not optimized for mobile interaction
- **Form interactions** may be difficult on mobile
- **Touch gestures** not fully implemented
- **Mobile-specific patterns** missing

## Reference Sites Analysis

### captureatrip.com Patterns
- **Clean, minimal design** with clear hierarchy
- **Card-based layouts** for easy mobile browsing
- **Sticky booking elements** for easy access
- **Trust signals** prominently displayed
- **Simple navigation** with clear categories

### wanderon.in Patterns
- **Mobile-first booking flow** with simple steps
- **Clear pricing display** with easy comparison
- **Social proof** prominently featured
- **Simple, clean typography** hierarchy
- **Effective use of white space**

### Modern Mobile Travel Booking Patterns
- **Progressive disclosure** - show more on tap
- **Thumb-friendly navigation** - bottom tabs
- **Quick action buttons** - WhatsApp, Call
- **Simplified forms** - minimal required fields
- **Visual hierarchy** - clear information priority

## Recommended Mobile-First Transformation Plan

### Phase 1: Foundation (Header & Hero)
1. **Redesign Header** - Mobile-first navigation
2. **Optimize Hero** - Mobile-appropriate typography and CTAs
3. **Implement bottom navigation** - Thumb-friendly access

### Phase 2: Core Content (Trip Options & Reviews)
1. **Replace carousels** with mobile-optimized scrolling
2. **Redesign card layouts** for mobile-first display
3. **Simplify testimonials** - Stack instead of side-by-side

### Phase 3: Conversion (CTAs & Forms)
1. **Optimize FloatingActionBar** - Better mobile UX
2. **Redesign modals** - Full-screen mobile approach
3. **Simplify forms** - Mobile-friendly inputs

### Phase 4: Supporting Content (Features & FAQ)
1. **Redesign Features** - Mobile-friendly grid
2. **Optimize FAQ** - Better mobile accordion
3. **Improve Footer** - Mobile-optimized links

### Phase 5: Performance & Polish
1. **Mobile performance** optimization
2. **Touch gesture** implementation
3. **Accessibility** improvements
4. **Cross-device** testing

## File Modification Priority

### High Priority (Core Experience)
1. `src/components/layout/Header.tsx`
2. `src/components/sections/Hero.tsx`
3. `src/components/sections/TripOptions.tsx`
4. `src/components/ui/FloatingActionBar.tsx`

### Medium Priority (Content & Conversion)
1. `src/components/sections/UnfilteredReviews.tsx`
2. `src/components/sections/GroupCTA.tsx`
3. `src/components/sections/FAQ.tsx`
4. `src/components/layout/Footer.tsx`

### Lower Priority (Supporting Elements)
1. `src/components/sections/Features.tsx`
2. `src/components/sections/Accommodation.tsx`
3. `src/components/sections/TripHighlights.tsx`
4. `src/components/sections/CompanyLogos.tsx`

## Development Guidelines

### Mobile-First Approach
1. **Start with mobile** - Design for 320px first
2. **Progressive enhancement** - Add desktop features
3. **Touch-first interactions** - Assume touch primary
4. **Thumb-friendly** - 44px minimum touch targets

### Performance Considerations
1. **Lazy loading** - All images and heavy components
2. **Bundle splitting** - Code splitting for routes
3. **Image optimization** - WebP, proper sizing
4. **Animation performance** - Use transform/opacity

### Accessibility Standards
1. **Reduced motion** - Respect user preferences
2. **Keyboard navigation** - Full keyboard support
3. **Screen readers** - Proper ARIA labels
4. **Color contrast** - WCAG AA compliance

## Next Steps

1. **Review this documentation** with the team
2. **Set up development environment** for mobile-first work
3. **Start with Header component** transformation
4. **Implement mobile navigation** patterns
5. **Test on real devices** throughout development

---

**Document Version**: 1.0  
**Last Updated**: Current session  
**Next Review**: After each major component transformation

This document should be updated as the mobile-first transformation progresses to reflect new patterns and decisions made during development. 