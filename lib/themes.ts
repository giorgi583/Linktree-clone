export type ThemeStyle = {
    label: string
    background: string
    buttonColor: string
    textColor: string
    buttonText: string
}

export const PRESET_THEMES: Record<string, ThemeStyle> = {
  default: { label: "Default", background: "#FFFDD0", buttonColor: "#134e4a", buttonText: "#ffffff", textColor: "#18181b" },
  night:   { label: "Night",   background: "#0f172a", buttonColor: "#1e293b", buttonText: "#fB5563", textColor: "#f1f5f9" },
  ocean:   { label: "Ocean",   background: "#0c4a6e", buttonColor: "#0284c7", buttonText: "#FDF6E3", textColor: "#ffffff" },
  pastel:  { label: "Pastel",  background: "#fdf2f8", buttonColor: "#f9a8d4", buttonText: "#DB2777", textColor: "#831843" },
  forest:  { label: "Forest",  background: "#14532d", buttonColor: "#166534", buttonText: "#86EFAC", textColor: "#f0fdf4" },
  sunset:  { label: "Sunset",  background: "#7c2d12", buttonColor: "#ea580c", buttonText: "#ffffff", textColor: "#fff7ed" },
  mono:    { label: "Mono",    background: "#fafaf9", buttonColor: "#0c0a09", buttonText: "#ffffff", textColor: "#0c0a09" },
  bee: { label: "Bee", background: "#facc15", buttonColor: "#fef3c7", buttonText: "#A16207", textColor: "#0c0a09" },
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