"use client";

import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    bounce: 0,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-[0%] bg-emerald-700 dark:bg-emerald-600"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
