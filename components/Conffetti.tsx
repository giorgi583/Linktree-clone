// components/confetti-burst.tsx
"use client"
import { useEffect } from "react"
import confetti from "canvas-confetti"

export function ConfettiBurst() {
  useEffect(() => {
    const duration = 2500
    const end = Date.now() + duration

    const colors = ["#be185d", "#115e59", "#eab308", "#5eead4"] // matches your fuchsia/teal brand

    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }, [])

  return null
}