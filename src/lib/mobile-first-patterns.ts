/**
 * Mobile-First Design System Patterns
 * Comprehensive utilities and patterns for consistent mobile-first development
 */

import { cn } from './utils';

// Mobile-First Breakpoints
export const BREAKPOINTS = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Mobile-First Spacing System
export const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '5rem',    // 80px
  '5xl': '6rem',    // 96px
} as const;

// Mobile-First Typography Scale
export const TYPOGRAPHY = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
} as const;

// Mobile-First Container Classes
export const containerClasses = {
  base: 'w-full mx-auto px-4 sm:px-6 lg:px-8',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-full',
} as const;

// Mobile-First Section Spacing
export const sectionSpacing = {
  mobile: 'py-8',
  tablet: 'md:py-12',
  desktop: 'lg:py-16',
  hero: 'py-12 md:py-16 lg:py-20',
  compact: 'py-6 md:py-8 lg:py-10',
} as const;

// Mobile-First Grid System
export const gridClasses = {
  mobile1: 'grid grid-cols-1 gap-4',
  mobile2: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  mobile3: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
  mobile4: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
  responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
} as const;

// Mobile-First Button System
export const buttonClasses = {
  primary: 'bg-[#134956] text-white hover:bg-[#0f3b4c] transition-all duration-300',
  secondary: 'bg-teal-100 text-teal-800 hover:bg-teal-200 transition-all duration-300',
  outline: 'border border-[#134956] text-[#134956] hover:bg-[#134956] hover:text-white transition-all duration-300',
  ghost: 'text-[#134956] hover:bg-[#134956] hover:text-white transition-all duration-300',
  
  // Size variants
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-xl',
  xl: 'px-8 py-4 text-xl rounded-2xl',
  
  // Mobile-first responsive
  responsive: 'px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-lg md:rounded-xl',
  
  // Touch-friendly
  touch: 'min-h-[44px] min-w-[44px] flex items-center justify-center',
} as const;

// Mobile-First Card System
export const cardClasses = {
  base: 'bg-white rounded-lg shadow-sm transition-all duration-300',
  hover: 'hover:shadow-md hover:-translate-y-1',
  interactive: 'cursor-pointer hover:shadow-lg hover:-translate-y-2',
  
  // Padding variants
  compact: 'p-4',
  comfortable: 'p-4 md:p-6',
  spacious: 'p-6 md:p-8',
  
  // Mobile-first responsive
  responsive: 'p-4 md:p-6 lg:p-8',
} as const;

// Mobile-First Typography Classes
export const typographyClasses = {
  // Headings - mobile-first
  h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading',
  h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading',
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-subheading',
  h4: 'text-base sm:text-lg md:text-xl lg:text-2xl font-subheading',
  h5: 'text-sm sm:text-base md:text-lg font-subheading',
  h6: 'text-xs sm:text-sm md:text-base font-subheading',
  
  // Body text
  body: 'text-sm sm:text-base font-body',
  bodyLarge: 'text-base sm:text-lg font-body',
  bodySmall: 'text-xs sm:text-sm font-body',
  
  // Special text
  caption: 'text-xs text-gray-600 font-body',
  label: 'text-sm font-medium font-body',
  link: 'text-[#134956] hover:text-[#0f3b4c] transition-colors duration-200',
  
  // Hero text
  heroTitle: 'text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-heading',
  heroSubtitle: 'text-xl sm:text-2xl md:text-3xl font-body',
} as const;

// Mobile-First Navigation Classes
export const navigationClasses = {
  // Mobile navigation
  mobileNav: 'fixed inset-0 z-50 bg-white',
  mobileNavOverlay: 'fixed inset-0 bg-black/50',
  mobileNavContent: 'relative z-50 bg-white h-full p-4',
  
  // Desktop navigation
  desktopNav: 'hidden md:flex items-center space-x-6',
  
  // Navigation items
  navItem: 'block py-3 px-4 text-base font-medium font-subheading hover:text-[#134956] transition-colors',
  navItemActive: 'text-[#134956] border-b-2 border-[#134956]',
  
  // Mobile menu button
  mobileMenuBtn: 'md:hidden p-2 rounded-md hover:bg-gray-100',
} as const;

// Mobile-First Modal Classes
export const modalClasses = {
  overlay: 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
  container: 'fixed inset-0 z-50 flex items-center justify-center p-4',
  content: 'bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden',
  contentLarge: 'bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden',
  header: 'p-4 md:p-6 border-b border-gray-200',
  body: 'p-4 md:p-6 overflow-y-auto',
  footer: 'p-4 md:p-6 border-t border-gray-200',
} as const;

// Mobile-First Form Classes
export const formClasses = {
  group: 'space-y-4',
  label: 'block text-sm font-medium text-gray-700 mb-2',
  input: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#134956] focus:border-transparent',
  textarea: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#134956] focus:border-transparent resize-none',
  select: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#134956] focus:border-transparent',
  checkbox: 'h-4 w-4 text-[#134956] border-gray-300 rounded focus:ring-[#134956]',
  error: 'text-red-600 text-sm mt-1',
  
  // Touch-friendly
  touchInput: 'min-h-[44px] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#134956] focus:border-transparent',
} as const;

// Mobile-First Image Classes
export const imageClasses = {
  responsive: 'w-full h-auto',
  cover: 'object-cover',
  contain: 'object-contain',
  rounded: 'rounded-lg',
  circle: 'rounded-full',
  shadow: 'shadow-lg',
  
  // Common sizes
  avatar: 'w-10 h-10 rounded-full object-cover',
  avatarLarge: 'w-16 h-16 rounded-full object-cover',
  thumbnail: 'w-20 h-20 rounded-lg object-cover',
  
  // Aspect ratios
  square: 'aspect-square',
  landscape: 'aspect-[16/9]',
  portrait: 'aspect-[3/4]',
} as const;

// Mobile-First Animation Classes
export const animationClasses = {
  fadeIn: 'animate-in fade-in duration-300',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-300',
  slideDown: 'animate-in slide-in-from-top-4 duration-300',
  slideLeft: 'animate-in slide-in-from-right-4 duration-300',
  slideRight: 'animate-in slide-in-from-left-4 duration-300',
  scale: 'animate-in zoom-in-95 duration-300',
  
  // Hover animations
  hoverScale: 'hover:scale-105 transition-transform duration-300',
  hoverLift: 'hover:-translate-y-1 transition-transform duration-300',
  hoverGlow: 'hover:shadow-lg transition-shadow duration-300',
} as const;

// Mobile-First Loading Classes
export const loadingClasses = {
  spinner: 'animate-spin rounded-full h-8 w-8 border-b-2 border-[#134956]',
  skeleton: 'animate-pulse bg-gray-200 rounded',
  shimmer: 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
} as const;

// Utility Functions
export const mobileFirst = {
  // Generate mobile-first container
  container: (size: keyof typeof containerClasses = 'base') => {
    return cn(containerClasses.base, containerClasses[size]);
  },

  // Generate mobile-first section
  section: () => {
    return cn(sectionSpacing.mobile, sectionSpacing.tablet, sectionSpacing.desktop);
  },

  // Generate mobile-first grid
  grid: (type: keyof typeof gridClasses = 'mobile1') => {
    return gridClasses[type];
  },
  
  // Generate mobile-first button
  button: (variant: keyof typeof buttonClasses = 'primary', size: keyof typeof buttonClasses = 'responsive') => {
    return cn(buttonClasses[variant], buttonClasses[size], buttonClasses.touch);
  },
  
  // Generate mobile-first card
  card: (variant: 'base' | 'hover' | 'interactive' = 'base', padding: 'compact' | 'comfortable' | 'spacious' | 'responsive' = 'responsive') => {
    return cn(cardClasses.base, cardClasses[variant], cardClasses[padding]);
  },
  
  // Generate mobile-first typography
  heading: (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const headingMap = {
      1: typographyClasses.h1,
      2: typographyClasses.h2,
      3: typographyClasses.h3,
      4: typographyClasses.h4,
      5: typographyClasses.h5,
      6: typographyClasses.h6,
    };
    return headingMap[level];
  },
  
  // Generate responsive text
  text: (variant: keyof typeof typographyClasses = 'body') => {
    return typographyClasses[variant];
  },
  
  // Generate mobile-first modal
  modal: (size: 'default' | 'large' = 'default') => {
    return {
      overlay: modalClasses.overlay,
      container: modalClasses.container,
      content: size === 'large' ? modalClasses.contentLarge : modalClasses.content,
      header: modalClasses.header,
      body: modalClasses.body,
      footer: modalClasses.footer,
    };
  },
  
  // Generate form elements
  form: {
    group: formClasses.group,
    label: formClasses.label,
    input: formClasses.touchInput,
    textarea: formClasses.textarea,
    select: formClasses.select,
    checkbox: formClasses.checkbox,
    error: formClasses.error,
  },
  
  // Generate image classes
  image: (variant: keyof typeof imageClasses = 'responsive') => {
    return imageClasses[variant];
  },
  
  // Generate animation classes
  animate: (variant: keyof typeof animationClasses = 'fadeIn') => {
    return animationClasses[variant];
  },
  
  // Generate loading classes
  loading: (variant: keyof typeof loadingClasses = 'spinner') => {
    return loadingClasses[variant];
  },
};

// Mobile-First Responsive Helpers
export const responsive = {
  // Show/hide based on screen size
  showOn: {
    mobile: 'block sm:hidden',
    tablet: 'hidden sm:block md:hidden',
    desktop: 'hidden md:block',
    tabletUp: 'hidden sm:block',
    desktopUp: 'hidden lg:block',
  },
  
  hideOn: {
    mobile: 'hidden sm:block',
    tablet: 'block sm:hidden md:block',
    desktop: 'block md:hidden',
    tabletUp: 'block sm:hidden',
    desktopUp: 'block lg:hidden',
  },
  
  // Responsive spacing
  spacing: {
    xs: 'p-2 sm:p-3 md:p-4',
    sm: 'p-3 sm:p-4 md:p-6',
    md: 'p-4 sm:p-6 md:p-8',
    lg: 'p-6 sm:p-8 md:p-12',
    xl: 'p-8 sm:p-12 md:p-16',
  },
  
  // Responsive margins
  margin: {
    xs: 'm-2 sm:m-3 md:m-4',
    sm: 'm-3 sm:m-4 md:m-6',
    md: 'm-4 sm:m-6 md:m-8',
    lg: 'm-6 sm:m-8 md:m-12',
    xl: 'm-8 sm:m-12 md:m-16',
  },
  
  // Responsive gaps
  gap: {
    xs: 'gap-2 sm:gap-3 md:gap-4',
    sm: 'gap-3 sm:gap-4 md:gap-6',
    md: 'gap-4 sm:gap-6 md:gap-8',
    lg: 'gap-6 sm:gap-8 md:gap-12',
    xl: 'gap-8 sm:gap-12 md:gap-16',
  },
};

// Mobile-First Accessibility Helpers
export const accessibility = {
  // Screen reader only
  srOnly: 'sr-only',
  
  // Focus states
  focus: 'focus:outline-none focus:ring-2 focus:ring-[#134956] focus:ring-offset-2',
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#134956] focus-visible:ring-offset-2',
  
  // Skip links
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#134956] text-white p-2 rounded-md z-50',
  
  // ARIA helpers
  aria: {
    expanded: (expanded: boolean) => ({ 'aria-expanded': expanded }),
    current: (current: boolean) => ({ 'aria-current': current ? 'page' : undefined }),
    hidden: (hidden: boolean) => ({ 'aria-hidden': hidden }),
  },
  
  // Touch targets
  touchTarget: 'min-h-[44px] min-w-[44px] flex items-center justify-center',
};

// Export all patterns
const mobileFirstPatterns = {
  BREAKPOINTS,
  SPACING,
  TYPOGRAPHY,
  containerClasses,
  sectionSpacing,
  gridClasses,
  buttonClasses,
  cardClasses,
  typographyClasses,
  navigationClasses,
  modalClasses,
  formClasses,
  imageClasses,
  animationClasses,
  loadingClasses,
  mobileFirst,
  responsive,
  accessibility,
};

export default mobileFirstPatterns; 