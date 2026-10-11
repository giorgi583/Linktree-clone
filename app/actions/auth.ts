"use server"
import { signIn } from "@/auth"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/db"
import {signupSchema, usernameSchema, loginSchema, profileSchema} from "@/lib/schemas"
import { auth } from "@/auth"

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

export async function createUser(prevState: any, formData: FormData) {
     const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }
  if (parsed.data.password !== parsed.data.confirmPassword) {
    return { error: "Passwords do not match" }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  })
  if (existingUser) {
    return { error: "Email already exists" }
  }

  const hashedPassword = await hashPassword(parsed.data.password)

  await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      password: hashedPassword,
    },
  })

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but login failed — please log in manually" }
    }
    throw error
  }

  redirect("/onboarding")
}
export async function loginUser(prevState: any, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })
  if (!parsed.success) {
    return { error: "Invalid email or password" }
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" }
    }
    throw error // re-throw anything that isn't an auth failure (real bugs, redirects, etc.)
  }

  redirect("/dashboard")
}
export async function setUsername(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not signed in" }
  }

  const parsed = usernameSchema.safeParse({
    username: formData.get("username"),
  })
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const existing = await prisma.user.findUnique({
    where: { username: parsed.data.username },
  })
  if (existing) {
    return { error: "Username already taken" }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username: parsed.data.username },
  })
  redirect('/welcome')
  return { success: true }
}

export async function setProfile(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Not signed in" }
  }
  const rawCustomColors = formData.get("customColors")
  const parsed = profileSchema.safeParse({
    bio: formData.get("bio"),
    avatarUrl: formData.get("avatarUrl"),
    theme: formData.get("theme"),
    customColors: rawCustomColors ? JSON.parse(rawCustomColors as string) : undefined,
  })
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { bio: parsed.data.bio, avatarUrl: parsed.data.avatarUrl, customColors: parsed.data.theme === "custom" ? parsed.data.customColors : undefined, theme: parsed.data.theme },
  })
redirect("/onboarding/username")
  return { success: true }
  
}