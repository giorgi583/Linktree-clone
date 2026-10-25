import { TriangleAlert } from 'lucide-react';
import React from 'react'

const PieChart = ({data, label}: {data: any, label:string}) => {

const colors = [
  "#14B8A6", // Teal
  "#FDE047", // Yellow
  "#EC4899", // Fuchsia
  "#0D9488", // Teal
  "#FEF08A", // Yellow
  "#C026D3", // Fuchsia
  "#2DD4BF", // Teal
  "#FACC15", // Yellow
  "#F472B6", // Fuchsia
  "#115E59", // Teal
  "#EAB308", // Yellow
  "#F9A8D4", // Fuchsia
  "#99F6E4", // Teal
  "#CA8A04", // Yellow
  "#86198F", // Fuchsia
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
  if(data.length === 0) {
    return (
      <div className='flex justify-between items-center flex-col gap-5 p-5 rounded row-span-1'>
        <h2 className='font-semibold'>{label === 'Countries' ? 'Clicks by Country' : 'Links by Clicks'}</h2>
        <p className='flex items-center gap-2 text-sm text-brand my-3'><TriangleAlert className='w-4 h-4' />Clicks that didn't specify a country are not included here</p>
        <h3 className="font-semibold text-gray-600">No Data</h3>
      </div>
    )
  }
  return (
    <div className='flex justify-between items-center flex-col gap-5 p-5 rounded row-span-1'>
      {label === 'Countries' ? <div>
        <h3 className="font-semibold">Clicks by Country</h3>
        <p className='flex items-center gap-2 text-sm text-brand my-3'><TriangleAlert className='w-4 h-4' />Clicks that didn't specify a country are not included here</p>
      </div> :  <div>
        <h3 className="font-semibold">Links by Clicks</h3>
        <p className='flex items-center gap-2 text-sm text-brand my-3'><TriangleAlert className='w-4 h-4' />Links with 0 clicks are not included here</p>
      </div>}
<div
  className="w-40 h-40 rounded-full"
  style={{
    background: `conic-gradient(${gradient})`,
  }}
/>
<div className="flex flex-wrap gap-5 max-w-80 bg-white p-2 rounded">
    {data?.map((item: any, i: number) => (
      <div key={i} className="flex items-center gap-2">
        <span className='w-4 h-4 rounded-full' style={{background: colors[i % colors.length]}}></span>
        <span title={label === 'Countries' ? item.country : item.label} className="text-sm truncate max-w-35">{label === 'Countries' ? item.country : item.label}</span>
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