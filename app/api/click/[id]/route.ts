import { NextResponse, after } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const link = await prisma.link.findUnique({
    where: { id },
    select: { url: true, isActive: true },
  })
  if (!link || !link.isActive) return NextResponse.redirect(new URL("/", req.url))

  const ua = req.headers.get("user-agent") ?? ""
  const country = req.headers.get("x-vercel-ip-country") // only present when hosted on Vercel
  const device = /mobile|android|iphone/i.test(ua) ? "mobile" : "desktop"
  const isBot = /bot|crawler|spider|preview/i.test(ua)

  // runs after the redirect is sent, so recording doesn't slow the visitor down
  after(async () => {
    if (isBot) return
    await prisma.$transaction([
      prisma.linkClick.create({ data: { linkId: id, country, device } }),
      prisma.link.update({ where: { id }, data: { clicks: { increment: 1 } } }),
    ])
  })

  return NextResponse.redirect(link.url)
}