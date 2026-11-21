import {z} from 'zod'

export const signupSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(30),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%^()-_=+}{*?&]).{8,}$/,
      "Password must contain uppercase, lowercase, a number, and a special character"
    )
    .max(60),
  confirmPassword: z.string().min(1),
})
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})
export const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9_-]+$/, "Lowercase letters, numbers, - and _ only"),
})
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color");
export const profileSchema = z.object({
  bio: z.string().max(160).optional(),
  theme: z.enum(["default", "night", "ocean", "pastel", "forest", "sunset", "mono", "bee", "custom"]).default("default"),
  email: z.string().email().optional(),
  name: z.string().min(3).max(30).optional(),
  customColors: z
    .object({
      background: hexColor,
      buttonColor: hexColor,
      buttonText: hexColor,
      textColor: hexColor,
    }).nullable().optional(),
  avatarUrl: z.url().optional(),
})
const socials = ["instagram", "x", "github", "linkedin", "youtube", "tiktok", "facebook", "snapchat", "pinterest", "reddit", "discord", "twitch", "telegram"]

export function normalizeUrl(input: string): string {
  const u = new URL(input.trim())
  u.hash = "" // #fragments don't change the destination page
  if (u.pathname.length > 1 && u.pathname.endsWith("/")) {
    u.pathname = u.pathname.slice(0, -1) // /you/ and /you are the same page
  }
  return u.toString()
}
const httpUrl = z
  .url()
  .refine((u) => /^https?:\/\//i.test(u), "Only http and https links are allowed")
  .transform(normalizeUrl)
  
export const linkSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("LINK"),
    title: z.string().max(50).refine((val) => !socials.includes(val), "Add socials above").optional(),
    url: httpUrl,
  }),
  z.object({
    type: z.literal("SOCIAL"),
    platform: z.enum(socials),
    url: httpUrl,
  }),
])