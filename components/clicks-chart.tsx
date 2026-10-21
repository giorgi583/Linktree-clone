
type Day = { date: string; count: number }

function fmt(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

export function ClicksChart({ data }: { data: Day[] }) {
  const max = Math.max(1, ...data.map((d) => d.count))
  const total = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <figure>
      <div
        role="img"
        aria-label={`Clicks per day over the last ${data.length} days, ${total} in total`}
        className="flex h-40 items-end gap-[3px]"
      >
        {data.map((d) => (
          <div
            key={d.date}
            title={`${fmt(d.date)}: ${d.count} ${d.count === 1 ? "click" : "clicks"}`}
            className="flex h-full flex-1 items-end"
          >
            <div
              className={`w-full rounded-t-sm ${d.count ? "bg-[#115e59]" : "bg-stone-200"}`}
              style={{ height: d.count ? `${Math.max(4, (d.count / max) * 100)}%` : "2px" }}
            />
          </div>
        ))}
      </div>
      <figcaption className="mt-2 flex justify-between text-xs text-stone-500">
        <span>{fmt(data[0].date)}</span>
        <span>{fmt(data[data.length - 1].date)}</span>
      </figcaption>
    </figure>
  )
}