"use client"
import { Lock, Mail, User, Eye, EyeOff, Check, X } from 'lucide-react'
import { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa'

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
  return (
    <form className="flex flex-col gap-5">
<div className="flex flex-col relative group">
    <input placeholder=" " type="text" id="name" name="name" required className='pl-8 p-2 peer'/>
    <label className="absolute px-1 top-[20%] left-10 bg-gray-50 text-gray-500 group-focus-within:text-blue-600 group-focus-within:scale-80 group-focus-within:-translate-x-5 group-focus-within:-translate-y-5 transition-all duration-300 peer-placeholder-shown:block peer-[:not(:placeholder-shown):not(group-focus-within)]:hidden"  htmlFor="name">Username</label>
    <User size={20} className='absolute top-[30%] left-2 text-gray-500'/>
</div>
<div className="flex flex-col relative group">
    <input placeholder=" " type="email" id="email" name="email" required className='pl-8 p-2 peer'/>
    <label className="absolute px-1 top-[20%] left-10 bg-gray-50 text-gray-500 group-focus-within:text-blue-600 group-focus-within:scale-80 group-focus-within:-translate-x-5 group-focus-within:-translate-y-5 transition-all duration-300 peer-placeholder-shown:block peer-[:not(:placeholder-shown)]:hidden group-focus-within:block" htmlFor="email">Email</label>
    <Mail size={20} className='absolute top-[30%] left-2 text-gray-500'/>
</div>
<div className="flex flex-col relative group">
    <input placeholder=" " type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required className='pl-8 p-2 peer'/>
    <label className="absolute px-1 top-[20%] left-10 bg-gray-50 text-gray-500 group-focus-within:text-blue-600 group-focus-within:scale-80 group-focus-within:-translate-x-5 group-focus-within:-translate-y-5 transition-all duration-300 peer-placeholder-shown:block peer-[:not(:placeholder-shown)]:hidden group-focus-within:block" htmlFor="password">Password</label>
    <Lock size={20} className='absolute top-[30%] left-2 text-gray-500'/>
    <button onClick={() => setShowPassword(!showPassword)} className="absolute top-[30%] right-2 text-gray-500" type="button">{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}</button>
</div>
<div className="flex flex-col relative group">
    <input placeholder=" " type={showPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" required className='pl-8 p-2 peer'/>
    <label className="absolute px-1 top-[20%] left-10 bg-gray-50 text-gray-500 group-focus-within:text-blue-600 group-focus-within:scale-80 group-focus-within:-translate-x-5 group-focus-within:-translate-y-5 transition-all duration-300 peer-placeholder-shown:block peer-[:not(:placeholder-shown)]:hidden group-focus-within:block" htmlFor="confirmPassword">Confirm Password</label>
    <Lock size={20} className='absolute top-[30%] left-2 text-gray-500'/>
    <button onClick={() => setShowPassword(!showPassword)} className="absolute top-[30%] right-2 text-gray-500" type="button">{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}</button>
</div>
{password && <ul className="text-sm flex flex-col p-2 gap-1 rounded-md bg-gray-200">
    <li className='flex items-center gap-2' style={{opacity: password.length >= 8 ? 1 : 0.6}}>{password.length >= 8 ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />}at least 8 characters long</li>
    <li className='flex items-center gap-2' style={{opacity: password.match(/[A-Z]/) ? 1 : 0.6}}>{password.match(/[A-Z]/) ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />} at least one uppercase letter</li>
    <li className='flex items-center gap-2' style={{opacity: password.match(/[a-z]/) ? 1 : 0.6}}>{password.match(/[a-z]/) ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />} at least one lowercase letter</li>
    <li className='flex items-center gap-2' style={{opacity: password.match(/\d/) ? 1 : 0.6}}> {password.match(/\d/) ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />}at least one number</li>
    <li className='flex items-center gap-2' style={{opacity: password.match(/[^A-Za-z0-9]/) ? 1 : 0.6}}> {password.match(/[^A-Za-z0-9]/) ? <Check size={20} className='text-green-500' /> : <X size={20} className='text-red-500' />}at least one special character</li>
    </ul>}
<div>
    <a className="text-sm text-fuchsia-900" href="/login">Already have an account? Login</a>
    <button className="bg-teal-900 text-sm w-full py-2 rounded text-white font-medium my-3 hover:bg-teal-600 transition-all" type="submit">Register</button>
</div>
<div className="flex flex-col gap-2 relative">
 <hr className='my-3'></hr>
    <h2 className="text-center absolute top-0 left-[50%] translate-x-[-50%] bg-gray-50 text-gray-500 px-2">Or continue with</h2>
    <button className="bg-teal-900 text-sm w-full py-2 rounded text-white font-medium hover:bg-teal-600 transition-all flex items-center gap-2 justify-center" ><FaGoogle />Google</button>
    <button className="bg-teal-900 text-sm w-full py-2 rounded text-white font-medium hover:bg-teal-600 transition-all flex items-center gap-2 justify-center"><FaGithub />Github</button>
</div>
    </form>
  )
}

export default RegisterForm