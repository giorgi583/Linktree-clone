"use server"
import { prisma } from "@/lib/db"
import { auth } from "@/auth"
import { linkSchema } from '../../lib/schemas'
import { revalidatePath } from "next/cache"
import * as cheerio from "cheerio"
import { LetterText } from "lucide-react"
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
  if(parsed.data.type === 'LINK' && !parsed.data.title) {
    const url = parsed.data.url
    const response = await fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  },
});
    const html = await response.text()
    const $ = cheerio.load(html)
    let title = $("title").text() || url;
    if(title === 'Just a moment...') {
      title = url
    }
    parsed.data.title = title
  }
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


export async function updateLink(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not signed in" }
  const title = formData.get("title") as string | undefined
  const type = formData.get("type") as string
  const linkId = formData.get("id") as string
  const username = formData.get("username") as string
  const platform = formData.get("platform") as string 
  const url = username ? (platform === 'twitter' ? `https://x.com/${username}` : platform === 'twitch' ? `https://twitch.tv/${username}` : `https://www.${platform}.com/${username}`) : formData.get("url") as string;
  const parsed = linkSchema.safeParse({ title, url, platform, type })
  if (!parsed.success) {
  console.log("Zod errors:", parsed.error.issues)
  console.log("Formatted errors:", parsed.error.format()) }
  console.log(parsed)
  if (!parsed.success) return { error: parsed.error.issues[0].message }
  if (parsed.data.type === 'SOCIAL' ){
    const link = await prisma.link.findUnique({ where: {  userId_platform: {
    userId: session.user.id,
    platform: platform ,
  }, } }) 
  if (!link) return { error: "Link not found" } 
  if (link.userId !== session.user.id) return { error: "Not authorized" }
  await prisma.link.update({ where: { userId_platform: {
    userId: session.user.id,
    platform: platform,
  } }, data: { title: title ?? null, url: url ?? null} }) }
  else {
    const link = await prisma.link.findUnique({ where: { id: linkId } })
    if (!link) return { error: "Link not found" }
    if (link.userId !== session.user.id) return { error: "Not authorized" }
    await prisma.link.update({ where: { id: linkId }, data: { title: title ?? null, url: url ?? null } })
  }
  revalidatePath("/dashboard/links")
  return { success: true }
}

export async function reorderLinks(type: "LINK" | "SOCIAL", orderedIds: string[]) {
  console.log("reorderLinks called", { type, orderedIds })
  const session = await auth()
  if (!session?.user?.id){
    
    console.log("reorder: no session")
    return { error: "Not signed in" } }

  const owned = await prisma.link.findMany({
    where: { userId: session.user.id, type, id: { in: orderedIds } },
    select: { id: true },
  })
  console.log("reorder: owned", owned.length, "of", orderedIds.length)
  if (owned.length !== orderedIds.length) return { error: "Invalid link list" }

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.link.update({
        where: { id },
        data: { order: index },
      })
    )
  )
console.log("reorder: saved")
  revalidatePath("/dashboard/links")
  return { success: true }
}

// app/actions/links.ts
export async function setLinkActive(id: string, isActive: boolean) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not signed in" }

  const result = await prisma.link.updateMany({
    where: { id, userId: session.user.id }, // ownership check
    data: { isActive },
  })
  if (result.count === 0) return { error: "Link not found" }
   const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { username: true },
  })
revalidatePath("/dashboard/links")
  if (user?.username) revalidatePath(`/${user.username}`)
  return { success: true }
}

export async function deleteLink(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not signed in" }
  const link = await prisma.link.findUnique({ where: { id }, select: { userId: true } })
  if (!link) return { error: "Link not found" }
  if (link.userId !== session.user.id) return { error: "Not authorized" }
  await prisma.link.delete({ where: { id } })
  revalidatePath("/dashboard/links")
  return { success: true }
}

export async function deleteAllLinks() {
  const session = await auth()
  if (!session?.user?.id) return { error: "Not signed in" }
  await prisma.link.deleteMany({ where: { userId: session.user.id } })
  revalidatePath("/dashboard/links")
  return { success: true }
}