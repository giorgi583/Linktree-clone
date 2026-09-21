import RegisterForm from '@/components/RegisterForm'
import Link from 'next/link'

const page = () => {
  return (
    <div className='h-screen bg-yellow-200'>
         <Link href={'/'} className='flex items-center gap-2 m-5 mx-5'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 35" width="50" height="50" aria-hidden="true">
              <defs>
                <linearGradient id="ribbonGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#115e59" />
                  <stop offset="100%" stopColor="#701a75" />
                </linearGradient>
              </defs>
              <path d="M8,24 C4,16 12,8 16,8 C20,8 28,16 24,24 C20,32 12,24 16,20 C18,18 22,14 20,10"
            fill="none"
            stroke="url(#ribbonGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
            </svg>
            <h1 className="text-4xl font-bold text-teal-800  ">
            Link<span className="text-fuchsia-900">tree</span></h1>
        </Link>
        <div className="flex flex-col gap-4 max-w-100 border-2 border-fuchsia-800 bg-gray-50 rounded-xl p-5 mx-auto my-auto">
            <h1 className="text-3xl font-semibold text-teal-800">Sign up</h1>
            <RegisterForm />
        </div>
        <div className='absolute bottom-5 right-5 w-20 h-20'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 35" width="100%" height="100%" aria-hidden="true">
                <defs>
                  <linearGradient id="ribbonGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#115e59" />
                    <stop offset="100%" stopColor="#701a75" />
                  </linearGradient>
                </defs>
                <path d="M8,24 C4,16 12,8 16,8 C20,8 28,16 24,24 C20,32 12,24 16,20 C18,18 22,14 20,10"
              fill="none"
              stroke="url(#ribbonGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round" />
              </svg>
        </div>
    </div>
  )
}

export default page