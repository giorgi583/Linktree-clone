import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

const Loader = () => {
  const [mounted, setMounted] = useState(false)
 useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return createPortal(
    <>
    <style>
       {`.spinner {
    width: 64px;
    height: 64px;
    animation: rotate 2s linear infinite;
    transform-origin: center center;
  }

  .spinner circle {
    fill: none;
    stroke: #fff200;
    stroke-width: 6;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 124, 200;
      stroke-dashoffset: -49px;
    }
    100% {
      stroke-dasharray: 124, 200;
      stroke-dashoffset: -173px;
    }
  }`}
      </style>
    <div className='fixed top-0 left-0 w-screen h-screen bg-gray-500/40 z-40'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
               <svg className="spinner" viewBox="0 0 66 66">
      <circle cx="33" cy="33" r="28"></circle>
        </svg>
          </div>
    </div>
    </>,
    document.body
  )
}

export default Loader