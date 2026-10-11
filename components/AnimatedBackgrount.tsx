// components/animated-background.tsx
"use client"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-fuchsia-300/40 blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-10%", left: "-10%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-teal-300/40 blur-3xl"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -60, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-10%", right: "-10%" }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-yellow-200/30 blur-3xl"
        animate={{
          x: [0, 60, -80, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "40%", left: "50%" }}
      />
    </div>
  )
}