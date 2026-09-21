import { Lock, Mail } from 'lucide-react'
import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'

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
        <div className="flex flex-col gap-6 max-w-100 border-2 border-fuchsia-800 bg-gray-50 rounded-xl p-5 mx-auto my-auto">
            <h2 className="text-3xl font-semibold text-teal-800">Login</h2>
            <form className="flex flex-col gap-6">
                <div className="flex flex-col relative group">
                    <input placeholder=" " type="email" id="email" name="email" className='pl-8 p-2 peer'/>
                    <label className="absolute px-1 top-[20%] left-10 bg-gray-50 text-gray-500 group-focus-within:text-blue-600 group-focus-within:scale-80 group-focus-within:-translate-x-5 group-focus-within:-translate-y-5 transition-all duration-300 peer-placeholder-shown:block peer-[:not(:placeholder-shown)]:hidden" htmlFor="email">Email</label>
                    <Mail size={20} className='absolute top-[30%] left-2 text-gray-500'/>
                </div>
                <div className="flex flex-col relative group">
                    <input placeholder=" " type="password" id="password" name="password" className='pl-8 p-2 peer'/>
                    <label className="absolute px-1 top-[20%] left-10 bg-gray-50 text-gray-500 group-focus-within:text-blue-600 group-focus-within:scale-80 group-focus-within:-translate-x-5 group-focus-within:-translate-y-5 transition-all duration-300 peer-placeholder-shown:block peer-[:not(:placeholder-shown)]:hidden" htmlFor="password">Password</label>
                    <Lock size={20} className='absolute top-[30%] left-2 text-gray-500'/>
                </div>
                <a className="text-sm text-fuchsia-900" href="/register">Dont have an account? Register</a>
                <button type="submit" className="bg-teal-900 text-sm w-full py-2 rounded text-white font-medium mt-3 hover:bg-teal-600 transition-all">Login</button>
            </form>
            <div className="flex flex-col gap-2 relative">
             <hr className='my-3'></hr>
                <h2 className="text-center absolute top-0 left-[50%] translate-x-[-50%] bg-gray-50 text-gray-500 px-2">Or continue with</h2>
                <button className="bg-teal-900 text-sm w-full py-2 rounded text-white font-medium hover:bg-teal-600 transition-all flex items-center gap-2 justify-center" ><FaGoogle />Google</button>
                <button className="bg-teal-900 text-sm w-full py-2 rounded text-white font-medium hover:bg-teal-600 transition-all flex items-center gap-2 justify-center"><FaGithub />Github</button>
            </div>
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