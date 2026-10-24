"use client"
import { PRESET_THEMES } from '@/lib/themes';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Loader from './ui/Loader';
import {useState, useActionState, useEffect} from 'react'
import { ThemeStep } from './themeSelector';
import { updateTheme, disableCustomColors } from '@/app/actions/prefferences';
import toast from 'react-hot-toast';

type colors = {
  background: string;
  buttonColor: string;
  buttonText: string;
  textColor: string;
}
const DesignForm = ({user}: any) => {
  const [selectedtheme, setselectedTheme] = useState('');
  const theme = user?.theme && PRESET_THEMES[selectedtheme || user.theme] ? PRESET_THEMES[ selectedtheme || user.theme] : PRESET_THEMES.default;
  const [customColors, setCustomColors] = useState<colors>({background: user?.customColors?.background || theme.background, buttonColor: user?.customColors?.buttonColor || theme.buttonColor, buttonText: user?.customColors?.buttonText || theme.buttonText, textColor: user?.customColors?.textColor || theme.textColor});
   const [step, setStep] = useState<"theme" | "details">("details")
   const [enabledCustomColors, setEnabledCustomColors] = useState(user?.customColors ? true : false);
const [actionState, formAction, ispending] = useActionState(updateTheme, null)
console.log("customColors11:", customColors)
useEffect(() => {
  if (actionState?.success) {
    toast.success('Theme updated successfully')

  }
  if (actionState?.error) {
    toast.error(actionState.error)
  }
}, [actionState])
  return (
    <div className='flex w-full bg-white'>
    <div className='rounded-2xl flex flex-col gap-5 transition-all duration-300 ease-in-out w-full' style={{transform: step === 'theme' ? 'translateX(-130%)' : 'translateX(0)'}}>
  <h3 className='text-2xl font-semibold'>Design</h3>
  <p className='text-sm text-gray-500'>Customize your links to match your brand.</p>
  <div onClick={()=> setStep('theme')} className='flex justify-between items-center gap-5 cursor-pointer hover:scale-102 border-2 border-gray-100 p-3 rounded-xl shadow transition-all duration-300 ease-in-out'>
    <div className='flex items-center gap-2'>
        <div className='w-15 h-20 rounded-lg flex flex-wrap' style={{background: theme.background}}>
          <div className='w-1/2 h-1/2 rounded-tl-lg' style={{background: theme.textColor}}></div>
          <div className='w-1/2 h-1/2 rounded-tr-lg' style={{background: theme.buttonColor}}></div>
          <div className='w-1/2 h-1/2 rounded-bl-lg' style={{background: theme.buttonText}}></div>
        </div>
        <p>Theme</p>
    </div>
    <div className='flex items-center gap-2'>
      <p className='text-base text-gray-500'>{theme.label}</p>
      <ChevronRight className='w-7 h-7 text-gray-500' />
    </div>
    </div>
       <div className='flex justify-between items-center'>
         <h4>Customize colors</h4>
         <div onClick={()=> {setEnabledCustomColors(!enabledCustomColors); if(enabledCustomColors) disableCustomColors()}} className={`rounded-full relative cursor-pointer w-8 h-4 ${enabledCustomColors ? 'bg-brand-secondary' : 'bg-gray-300'}`}><div className={`absolute rounded-full w-3.5 h-3.5 top-[1.5px] left-[2px] bg-white transition-all duration-300 ease-in-out ${enabledCustomColors ? 'translate-x-full' : ''}`}></div></div>
       </div>
       <form action={formAction} className='grid grid-cols-2 gap-2'>
        <input readOnly type='text' hidden id='theme' name='theme' value={selectedtheme || theme.label}></input>
      <div className='flex justify-between gap-2 items-center p-2 rounded-lg border border-gray-300'>
        <label htmlFor="background">Background</label>
        <input disabled={!enabledCustomColors}  className='h-10 w-10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer appearance-none bg-transparent rounded-full border-0 p-0' type="color" id="background" name="background" value={customColors.background} onChange={(e)=> setCustomColors({...customColors, background: e.target.value})}/>
      </div>
      <div className='flex justify-between gap-2 items-center p-2 rounded-lg border border-gray-300'>
        <label htmlFor="textColor">Text Color</label>
        <input disabled={!enabledCustomColors}  className='h-10 w-10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer appearance-none bg-transparent rounded-full border-0 p-0' type="color" id="textColor" name="textColor" value={customColors.textColor} onChange={(e)=> setCustomColors({...customColors, textColor: e.target.value})}/>
      </div>
      <div className='flex justify-between gap-2 items-center p-2 rounded-lg border border-gray-300'>
        <label htmlFor="buttonColor">Button Color</label>
        <input disabled={!enabledCustomColors}  className='h-10 w-10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer appearance-none bg-transparent rounded-full border-0 p-0' type="color" id="buttonColor" name="buttonColor" value={customColors.buttonColor} onChange={(e)=> setCustomColors({...customColors, buttonColor: e.target.value})}/>
      </div>
      <div className='flex justify-between gap-2 items-center p-2 rounded-lg border border-gray-300'>
        <label htmlFor="buttonText">Button Text</label>
        <input disabled={!enabledCustomColors}  className='h-10 w-10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer appearance-none bg-transparent rounded-full border-0 p-0' type="color" id="buttonText" name="buttonText" value={customColors.buttonText} onChange={(e)=> setCustomColors({...customColors, buttonText: e.target.value})}/>
      </div>
      <button type='submit' className='bg-brand-secondary absolute top-5 right-5 text-sm py-2 px-4 rounded text-white font-medium mt-7 hover:bg-brand transition-all'>Save Changes</button>
       </form>
    </div>
    <div className='bg-white rounded-2xl flex flex-col gap-5 transition-all duration-300 ease-in-out absolute w-full' style={{transform: step === 'theme' ? 'translateX(0)' : 'translateX(120%)'}}>
    <button className='absolute top-0 left-0' onClick={()=> setStep('details')}><ChevronLeft className='w-7 h-7 text-gray-500' /></button>
    <h3 className='text-2xl font-semibold text-center mr-10'>Customize</h3>
     <ThemeStep selected={selectedtheme} onSelect={setselectedTheme} onNext={() => {setStep('details')}} onSkip={() => {setStep('details')}} />
    </div>
    {ispending && <Loader />}
    </div>
  )
}

export default DesignForm