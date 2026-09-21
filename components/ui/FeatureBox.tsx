import React from 'react'
type FeatureBoxProps = {
  ref?: React.Ref<HTMLDivElement>;
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  middleIndex: number;
};
const FeatureBox = ({icon, title, description, color, id, middleIndex, ref}: FeatureBoxProps) => {
  return (
    <div key={id} ref={ref} className={`flex flex-col text-center items-center justify-center rounded-xl p-6 border bg-transparent gap-6 max-w-[310px] min-w-[310px] max-lg:min-w-[200px] ${middleIndex === id-1 ? 'p-10 !max-w-[400px] max-lg:!max-w-[310px] max-lg:!p-6' : ''}`}>
                    <div className={`p-6 aspect-square ${color} rounded-full`}>
                        {icon}
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-base font-semibold text-slate-700">{title}</h3>
                        <p className="text-sm text-slate-600">{description}</p>
                    </div>
                </div>
  )
}

export default FeatureBox