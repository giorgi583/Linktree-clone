// components/theme-step.tsx
"use client"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PRESET_THEMES } from "@/lib/themes"


export function ThemeStep({
  selected,
  onSelect,
  onNext,
  onSkip,
}: {
  selected: string
  onSelect: (id: string) => void
  onNext: () => void
  onSkip: () => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Pick a theme</h2>
        <p className="text-sm text-muted-foreground">You can change this later.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(PRESET_THEMES).map(([key, value]) => {
          const isActive = selected === key
          return (
            <motion.button
              type="button"
              key={key}
              onClick={() => onSelect(key)}
              whileTap={{ scale: 0.96 }}
              animate={{ scale: isActive ? 1.02 : 1 }}
              className={`relative rounded-xl w-50 border-2 p-4 text-left ${
                isActive ? "border-brand" : "border-border"
              }`}
            >
              <div
                className="h-16 rounded-lg mb-3 flex items-end p-2"
                style={{ background: value.background }}
              >
                <div
                  className="rounded px-2 py-1 text-xs"
                  style={{ background: value.buttonColor, color: value.buttonText }}
                >
                  Link
                </div>
              </div>
              <span className="font-medium text-sm">{value.label}</span>
              {isActive && (
                <motion.div
                  layoutId="theme-check"
                  className="absolute top-2 right-2 bg-brand rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check size={14} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="ghost" onClick={onSkip}>
          Skip
        </Button>
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}