import { prisma } from "@/lib/db"

export async function getAnalytics(userId: string, days = 30) {
  // start of the window, at midnight UTC, `days` days back including today
  const since = new Date()
  since.setUTCHours(0, 0, 0, 0)
  since.setUTCDate(since.getUTCDate() - (days - 1))

  const [clicks, links] = await Promise.all([
    prisma.linkClick.findMany({
      where: { createdAt: { gte: since }, link: { userId } },
      select: { createdAt: true, device: true, country: true, linkId: true },
    }),
    prisma.link.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        platform: true,
        type: true,
        clicks: true, // all-time counter
        _count: {
          select: { clickEvents: { where: { createdAt: { gte: since } } } },
        },
      },
    }),
  ])

  // bucket clicks by day, then fill in the days that had none
  const byDay = new Map<string, number>()
  for (const c of clicks) {
    const key = c.createdAt.toISOString().slice(0, 10)
    byDay.set(key, (byDay.get(key) ?? 0) + 1)
  }

  const daily = Array.from({ length: days }, (_, i) => {
    const d = new Date(since)
    d.setUTCDate(since.getUTCDate() + i)
    const key = d.toISOString().slice(0, 10)
    return { date: key, count: byDay.get(key) ?? 0 }
  })

  const mobile = clicks.filter((c) => c.device === "mobile").length

  const topLinks = links
    .map((l) => ({
      id: l.id,
      label: l.type === "SOCIAL" ? (l.platform ?? "Social") : (l.title ?? "Untitled"),
      count: l._count.clickEvents,
    }))
    .filter((l) => l.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
  
  const linksByClicks = links.map((l)=> {
    return {id: l.id, label: l.title || l.platform, clicks: l.clicks}});
  const clicksByCountry = await prisma.linkClick.groupBy({
    by: ["country"],
    where: {
      createdAt: {
        gte: since,
      },
      country: {
        not: null,
      },
    },
    _count: {
      _all: true,
    },
    orderBy: {
      _count: {
        linkId: "desc",
      },
    },
  })

  return {
    days,
    daily,
    periodClicks: clicks.length,
    clicksByCountry,
    linksByClicks,
    allTimeClicks: links.reduce((sum, l) => sum + l.clicks, 0),
    mobilePercent: clicks.length ? Math.round((mobile / clicks.length) * 100) : 0,
    topLinks,
  }
}