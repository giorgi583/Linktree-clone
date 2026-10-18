"use server"

import { prisma } from "@/lib/db"
import { Prisma } from "@/lib/generated/prisma/client";
import {signupSchema, usernameSchema, loginSchema, profileSchema} from "@/lib/schemas"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export const updateTheme = async (prevState: any, formData: FormData) => {
    const session = await auth()
    if (!session?.user?.id) return { error: "Not signed in" }
    const theme = formData.get("theme")
    console.log('theme:', theme)
    const customColors = {
        background: formData.get("background"),
        textColor: formData.get("textColor"),
        buttonColor: formData.get("buttonColor"),
        buttonText: formData.get("buttonText"),
    } 
    console.log('customColors:', customColors)
    const parsed = profileSchema.safeParse({
        theme: theme,
        customColors: Object.values(customColors).filter(Boolean).length > 0 ? customColors : null
    })
    if(!parsed.success){
        console.log(parsed.error.issues)
        return { error: parsed.error.issues[0].message }}
    await prisma.user.update({
        where: { id: session.user.id },
        data: { theme: parsed.data?.theme, customColors: parsed.data?.customColors ?? Prisma.DbNull },
    })
    revalidatePath("/dashboard/links")
    return { success: true }
}

export const disableCustomColors = async () => {
    const session = await auth()
    if (!session?.user?.id) return { error: "Not signed in" }
    
    await prisma.user.update({
        where: { id: session.user.id },
        data: { customColors: Prisma.DbNull },
    })
    revalidatePath("/dashboard/links")
    return { success: true }
}