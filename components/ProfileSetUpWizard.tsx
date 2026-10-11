// components/profile-setup-wizard.tsx
"use client"
import { useState, useActionState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { setProfile } from "@/app/actions/auth"
import { ThemeStep } from "./themeSelector"
import { DetailsStep } from "./avatarBioForm"

export function ProfileSetupWizard() {
  const [step, setStep] = useState<"theme" | "details">("theme")
  const [theme, setTheme] = useState("default")
  const [state, formAction, isPending] = useActionState(setProfile, null)

  return (
    <form className="min-w-100" action={formAction}>
      {/* theme travels with the form as a hidden field, updated by step 1 */}
      <input type="hidden" name="theme" value={theme} />

      <AnimatePresence mode="wait">
        {step === "theme" ? (
          <motion.div
            key="theme"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ThemeStep
              selected={theme}
              onSelect={setTheme}
              onNext={() => setStep("details")}
              onSkip={() => setStep("details")} // skip just keeps the default/current value
            />
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <DetailsStep onBack={() => setStep("theme")} isPending={isPending} />
          </motion.div>
        )}
      </AnimatePresence>

      {state?.error && <p className="text-sm text-red-500 mt-4">{state.error}</p>}
    </form>
  )
}