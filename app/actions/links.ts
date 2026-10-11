"use server"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"
import { linkSchema } from '../../lib/schemas'
import { revalidatePath } from "next/cache"
export async function createLink(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not signed in" }
  const parsed = linkSchema.safeParse({
   type: formData.get("type"),
   title: formData.get("title") ?? undefined,
   url: formData.get("url"),
   platform: formData.get("platform") ?? undefined,
  })
  if (!parsed.success) return { error: parsed.error.issues[0].message }
  const lastLink = await prisma.link.findFirst({
    where: { userId: session.user.id, type: parsed.data.type },
    orderBy: { order: "desc" },
    select: { order: true },
  })
  const nextOrder = lastLink ? lastLink.order + 1 : 0
  await prisma.link.create({ data: { ...parsed.data, userId: session?.user.id, order: nextOrder } })
 revalidatePath("/dashboard/links")
  return { success: true }  
}

export async function toggleLinkActive(linkId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not signed in" }
  const link = await prisma.link.findUnique({ where: { id: linkId } })
  if (!link) return { error: "Link not found" }
  if (link.userId !== session.user.id) return { error: "Not authorized" }
  await prisma.link.update({ where: { id: linkId }, data: { isActive: !link.isActive } })
  revalidatePath("/dashboard/links")
  return { success: true }
}

export async function updateLink(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not signed in" }
  const title = formData.get("title") as string | undefined
  const type = formData.get("type") as string
  const username = formData.get("username") as string
  const platform = formData.get("platform") as string
  const url = username ? (platform === 'twitter' ? `https://x.com/${username}` : platform === 'twitch' ? `https://twitch.tv/${username}` : `https://www.${platform}.com/${username}`) : null
  const parsed = linkSchema.safeParse({ title, url, platform, type })
  if (!parsed.success) return { error: parsed.error.issues[0].message }
  const link = await prisma.link.findUnique({ where: {  userId_platform: {
    userId: session.user.id,
    platform: platform,
  }, } })
  if (!link) return { error: "Link not found" }
  if (link.userId !== session.user.id) return { error: "Not authorized" }
  await prisma.link.update({ where: { userId_platform: {
    userId: session.user.id,
    platform: platform,
  } }, data: { title: title ?? null, url: url ?? undefined} })
  revalidatePath("/dashboard/links")
  return { success: true }
}