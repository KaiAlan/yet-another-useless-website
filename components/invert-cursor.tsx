import { motion } from "framer-motion";
import useMousePosition from "@/hooks/useMousePosition";

const InvertedCursor = () => {
    const { x, y } = useMousePosition();
  return (
    <motion.span
          className="h-20 w-20 rounded-full bg-white mix-blend-difference absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none transform"
          animate={{
            left: x - 190,
            top: y - 160,
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        ></motion.span>
  )
}

export default InvertedCursor