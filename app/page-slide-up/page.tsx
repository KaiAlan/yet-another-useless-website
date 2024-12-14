"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";

const PageSlide = () => {
  const containerRef = useRef(null); // Reference for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Adjust scroll trigger range
  });

  // Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);


  // Colors for each card
  // const colors = ["bg-red-500", "bg-blue-500", "bg-green-500"];

  const y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0])
  // Function to generate animation styles for each "card"
  // const getAnimationStyles = (progressStart: number, progressEnd: number, index: number) => {
  //   const y = useTransform(scrollYProgress, [progressStart, progressEnd], [2000 - index * 200, 0]);
  //   const x = useTransform(scrollYProgress, [progressStart, progressEnd], [index * 20, 0]);
  //   const rotateZ = useTransform(scrollYProgress, [progressStart, progressEnd], [30 - index * 15, -10]);
  //   return { y, x, rotateZ };
  // };


  return (
    <div
      className="relative bg-black min-h-screen h-[300vh] overflow-hidden"
      ref={containerRef}
    >
     {Array.from({length: 1}).map((_, index) => {
      return(
        <motion.div key={index} className="h-screen w-full bg-white absolute pt-40"
          style={{
            y: y,
            rotateZ: (index+1) * 20
          }}
        >
          <motion.div className="h-screen w-full bg-red-800 relative" />
        </motion.div>
      )
     })}
    </div>
  );
};

export default PageSlide;

