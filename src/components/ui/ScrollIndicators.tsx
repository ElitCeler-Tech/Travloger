'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = React.memo(() => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ScrollProgressInner />;
});

const ScrollProgressInner = React.memo(() => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-teal-500 z-50 origin-left"
      style={{ scaleX }}
    />
  );
});

ScrollProgress.displayName = 'ScrollProgress';
ScrollProgressInner.displayName = 'ScrollProgressInner';


export { ScrollProgress };
