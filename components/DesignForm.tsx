import React from 'react'

const DesignForm = () => {
  return (
    <div className='bg-white rounded-2xl p-5 flex flex-col gap-5'>
  <h3 className='text-2xl font-semibold'>Design</h3>
  <p className='text-sm text-gray-500'>Customize your links to match your brand.</p>
  <div className='flex justify-between items-center gap-5'>
    <div className='flex items-center gap-2'>
        <div className='w-15 h-20 rounded-lg bg-brand'>
        </div>
        <p>Theme</p>
    </div>
    </div>
       
    </div>
  )
}

export default DesignForm