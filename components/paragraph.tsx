"use client";

import { useEffect, useRef } from "react";
import { useScroll, motion } from "framer-motion";

export default function Paragraph({ value }: { value: string }) {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["0.15 end", 'end 1.1']
  });

  useEffect(() => {
    scrollYProgress.on('change', e => console.log(e))
  },[])
  return (
    <div ref={element} className="relative my-[50vh] h-[calc(40vh+60*5*1vh)]">
    <div  className="sticky top-0 max-w-[80%] min-h-[100vh] flex justify-center items-center mx-auto">
    <motion.p
    style={{opacity: scrollYProgress}}
    className="text-6xl font-bold"
    >
      {value}
    </motion.p>
    </div>
    </div>
  );
}
