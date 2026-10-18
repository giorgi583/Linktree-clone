export type ThemeStyle = {
    label: string
    background: string
    buttonColor: string
    textColor: string
    buttonText: string
}

export const PRESET_THEMES: Record<string, ThemeStyle> = {
  default: { label: "default", background: "#fbfeab", buttonColor: "#134e4a", buttonText: "#69fda2", textColor: "#0d4825" },
  night:   { label: "night",   background: "#0f172a", buttonColor: "#1e293b", buttonText: "#f44141", textColor: "#fed5d5" },
  ocean:   { label: "ocean",   background: "#0c4a6e", buttonColor: "#0284c7", buttonText: "#FDF6E3", textColor: "#e3f3ff" },
  pastel:  { label: "pastel",  background: "#fdf2f8", buttonColor: "#f9a8d4", buttonText: "#DB2777", textColor: "#831843" },
  forest:  { label: "forest",  background: "#002f17", buttonColor: "#4c2e05", buttonText: "#86EFAC", textColor: "#f0fdf4" },
  sunset:  { label: "sunset",  background: "#784BA0", buttonColor: "#FF6B6B", buttonText: "#FFF1A8", textColor: "#FF9F68" },
  mono:    { label: "mono",    background: "#fafaf9", buttonColor: "#0c0a09", buttonText: "#b6b6b6", textColor: "#0c0a09" },
  bee: { label: "bee", background: "#facc15", buttonColor: "#fef3c7", buttonText: "#A16207", textColor: "#0c0a09" },
}

export function resolveTheme(theme: string, customColors: unknown): ThemeStyle {
  if (theme === "custom" && customColors && typeof customColors === "object") {
    const c = customColors as Partial<ThemeStyle>
    return {
      label: "Custom",
      background: c.background ?? "#ffffff",
      buttonColor: c.buttonColor ?? "#18181b",
      buttonText: c.buttonText ?? "#ffffff",
      textColor: c.textColor ?? "#18181b",
    }
  }
  return PRESET_THEMES[theme] ?? PRESET_THEMES.default
}