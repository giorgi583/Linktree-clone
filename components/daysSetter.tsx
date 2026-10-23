'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DaysSetter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    function changeDays(days: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("days", days);

    router.push(`${pathname}?${params.toString()}`);
  }
  const days = searchParams.get("days")
  return (
    <div className="flex items-center gap-2">
        <label className="mr-2 font-semibold text-brand-secondary">Set days</label>
        <select onChange={(e) => changeDays(e.target.value)}>
            <option hidden defaultValue={days || "1"}>{days + ' days' || "1 day"}</option>
            <option value="7">7 days</option>
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
        </select>
    </div>
  )
}

export default DaysSetter