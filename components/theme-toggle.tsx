
"use client"
import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  // false on the server, true in the browser: avoids a hydration mismatch,
  // since the server can't know the saved theme
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

  return (
    <div role="group" aria-label="Color theme" className="inline-flex rounded-md border border-border p-0.5">
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const active = mounted && theme === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={active}
            aria-label={label}
            className={`rounded p-1.5 transition-colors ${
              active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={16} />
          </button>
        )
      })}
    </div>
  )
}