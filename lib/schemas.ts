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
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color")
export const profileSchema = z.object({
  bio: z.string().max(160).optional(),
  theme: z.enum(["default", "night", "ocean", "pastel", "forest", "sunset", "mono", "bee", "custom"]).default("default"),
  customColors: z
    .object({
      background: hexColor,
      buttonColor: hexColor,
      buttonText: hexColor,
      textColor: hexColor,
    })
    .optional(),
  avatarUrl: z.url().optional(),
})
const socials = ["instagram", "x", "github", "linkedin", "youtube", "tiktok", "facebook", "snapchat", "pinterest", "reddit", "discord", "twitch", "telegram"]
export const linkSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("LINK"),
    title: z.string().max(50).refine((val) => !socials.includes(val), "Add socials above").optional(),
    url: z.url(),
  }),
  z.object({
    type: z.literal("SOCIAL"),
    platform: z.enum(socials),
    url: z.url(),
  }),
])