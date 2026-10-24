import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { getAnalytics } from "@/lib/analytics"
import { ClicksChart } from "@/components/clicks-chart"
import DaysSetter from "@/components/daysSetter"
import PieChart from "@/components/PieChart"
type Props = {
  searchParams: Promise<{
    days?: string
  }>
}
export default async function AnalyticsPage({ searchParams }: Props) {
  const params = await searchParams;
  const parsedDays = Number(params.days);
const days = parsedDays;
  console.log('days:', days)
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const [data, user] = await Promise.all([
    getAnalytics(session.user.id, days),
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { username: true },
    }),
  ])

  const topMax = data.topLinks[0]?.count ?? 1
console.log('data:', data)
  return (
    <div className={`mx-auto ${days > 30 ? "max-w-4xl" : "max-w-3xl"} space-y-10`}>
      <h1 className="text-2xl font-semibold">Analytics</h1>
      <DaysSetter />
      {data.allTimeClicks === 0 ? (
        <p className="rounded-lg border border-dashed border-[#e7e5e4] p-8 text-sm text-stone-600">
          No clicks yet. Share your page at <strong>/{user?.username}</strong> and
          clicks will show up here.
        </p>
      ) : (
        <>
          <section className="flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="text-3xl font-semibold text-brand-secondary">{data.periodClicks}</p>
              <p className="text-sm text-stone-500">clicks in the last {data.days} days</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">{data.allTimeClicks}</p>
              <p className="text-sm text-stone-500">clicks all time</p>
            </div>
            <div>
              <p className="text-3xl font-semibold">{data.mobilePercent}%</p>
              <p className="text-sm text-stone-500">from mobile</p>
            </div>
          </section>
            <section className="flex flex-wrap gap-x-12 gap-y-4">
              <PieChart data={data?.clicksByCountry} label='Countries' />
              <PieChart data={data?.linksByClicks} label='Links' />
            </section>

          <section>
            <h2 className="mb-3 text-sm font-medium text-stone-700">Clicks per day</h2>
            <ClicksChart data={data.daily} />
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium text-stone-700">Top links</h2>
            {data.topLinks.length === 0 ? (
              <p className="text-sm text-stone-500">No clicks in this period.</p>
            ) : (
              <ul className="space-y-3">
                {data.topLinks.map((l) => (
                  <li key={l.id}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="truncate">{l.label}</span>
                      <span className="text-stone-500">{l.count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-stone-100">
                      <div
                        className="h-1.5 rounded-full bg-brand"
                        style={{ width: `${(l.count / topMax) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  )
}