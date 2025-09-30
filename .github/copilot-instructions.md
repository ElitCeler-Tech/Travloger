# Copilot Instructions for Travloger

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern Next.js 15 travel website for Kashmir tourism featuring:
- Single-page application with smooth scrolling and modern animations
- Responsive design optimized for all devices
- React 19 with TypeScript and Tailwind CSS v4
- App Router architecture with server components
- Performance optimizations using React.memo, useCallback, and other modern patterns

## Development Guidelines

### Code Style & Architecture
- Use TypeScript for all components and utilities
- Implement functional components with hooks
- Use Next.js App Router with server components where appropriate
- Apply React performance optimizations (memo, callback, useMemo)
- Follow atomic design principles for component structure

### Styling Guidelines
- Use Tailwind CSS v4 for all styling
- Implement responsive design with mobile-first approach
- Use CSS Grid and Flexbox for layouts
- Apply smooth animations and transitions
- Maintain consistent spacing and typography scale

### Performance Optimization
- Implement lazy loading for images and components
- Use Next.js Image component for optimized image loading
- Apply proper SEO meta tags and structured data
- Optimize bundle size with dynamic imports
- Use React.memo and useCallback for expensive operations

### Component Structure
- Create reusable components in /src/components
- Organize components by feature and atomic design
- Use proper TypeScript interfaces and types
- Implement proper error boundaries
- Follow accessibility best practices

### Animation Guidelines
- Use CSS animations and transitions for smooth interactions
- Implement scroll-triggered animations
- Apply proper motion design principles
- Ensure animations are performant and accessible
- Use reduced motion preferences for accessibility

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks and context
- **Animations**: CSS animations and transitions
- **Performance**: React optimizations and Next.js built-in features
