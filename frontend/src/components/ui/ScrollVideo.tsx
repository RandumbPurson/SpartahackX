"use client"; // This marks the file as a Client Component

import { motion, useScroll, useTransform } from "framer-motion";

const ScrollVideo = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  return (
    <div className="h-[200vh] flex items-center justify-center">
      <motion.video
        src="/assets/bgscrollanimation.mp4"
        className="w-[80%] h-auto rounded-lg shadow-lg"
        muted
        playsInline
        loop
        style={{ scale }}
      />
    </div>
  );
};

export default ScrollVideo;
