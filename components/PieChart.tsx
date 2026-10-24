import React from 'react'

const PieChart = ({data, label}: {data: any, label:string}) => {

const colors = [
    "#7C3AED", // Violet
  "#BE185D", // Pink
  "#115E59", // Teal
  "#EAB308", // Yellow
  "#5EEAD4", // Light teal
  "#C31A1A", // Red
  "#4B211A", // Brown
  "#2563EB", // Blue
  "#16A34A", // Green
  "#EA580C", // Orange
  "#DB2777", // Rose
  "#0891B2", // Cyan
  "#9333EA", // Purple
  "#65A30D", // Lime
  "#D97706", // Amber
  "#4F46E5", // Indigo
  "#0F766E", // Dark teal
  "#DC2626", // Bright red
  "#64748B", // Slate
  "#A855F7", // Light purple
];
const total = label === 'Countries' ? data?.reduce((sum: number, c: any) => sum + c._count._all, 0) : data?.reduce((sum: number, c: any) => sum + c.clicks, 0);
console.log('total:', typeof total)
let currentPercentage = 0;
const gradient = data?.map((item: any, i: number) => {
    const start = currentPercentage;
    currentPercentage += label === 'Countries' ? Math.round((item._count._all / total) * 100) : Math.round((item.clicks / total) * 100);
    
    return `${colors[i % colors.length]} ${start}% ${currentPercentage}%`;
  })
  .join(", ");
  return (
    <div className='flex justify-center items-center flex-col gap-5 bg-brand-tertiary/30 p-5 rounded'>
      {label === 'Countries' ? <h3 className="font-semibold">Clicks by Country</h3> :  <h3 className="font-semibold">Links by Clicks</h3>}
<div
  className="w-40 h-40 rounded-full"
  style={{
    background: `conic-gradient(${gradient})`,
  }}
/>
<div className="flex flex-wrap gap-5 max-w-80">
    {data?.map((item: any, i: number) => (
      <div key={i} className="flex items-center gap-2">
        <span className='w-5 h-5 rounded-full' style={{background: colors[i % colors.length]}}></span>
        <span title={label === 'Countries' ? item.country : item.label} className="text-sm truncate max-w-40">{label === 'Countries' ? item.country : item.label}</span>
        <span className="ml-auto text-brand-secondary">
        {label === 'Countries' ? item._count._all : item.clicks}
      </span>
      </div>
    ))}
</div>
    </div>
  )
}

export default PieChart