

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {


  return ( 
      <div className="flex-1 px-6 py-8 md:px-10">{children}</div>
    )
}