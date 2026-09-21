"use client"
import { useState, useEffect, useRef } from "react"
import { ChartBar, Fingerprint, Sparkles } from "lucide-react"
import FeatureBox from "./FeatureBox"
const features = [
    {
        title: "Bank-Grade Security",
        description: "End-to-end encryption, 2FA, compliance with GDPR standards.",
        icon: <Fingerprint />,
        color: "bg-violet-100 text-violet-600",
        id: 1
    },
    {
        title: "Real-Time Analytics",
        description: "Get instant insights into your finances with live dashboards.",
        icon: <ChartBar />,
        color: "bg-green-100 text-green-600",
        id: 2
    },
    {
        title: "AI assistant",
        description: "Get instant insights into your finances with live dashboards.",
        icon: <Sparkles />,
        color: "bg-amber-100 text-amber-600",
        id: 3
    },
    {
        title: "Bank-Grade Security",
        description: "End-to-end encryption, 2FA, compliance with GDPR standards.",
        icon: <Fingerprint />,
        color: "bg-violet-100 text-violet-600",
        id: 4
    },
    {
        title: "Real-Time Analytics",
        description: "Get instant insights into your finances with live dashboards.",
        icon: <ChartBar />,
        color: "bg-green-100 text-green-600",
        id: 5
    },
    {
        title: "AI assistant",
        description: "Get instant insights into your finances with live dashboards.",
        icon: <Sparkles />,
        color: "bg-amber-100 text-amber-600",
        id: 6
    },
    {
      title: "Bank-Grade Security",
      description: "End-to-end encryption, 2FA, compliance with GDPR standards.",
      icon: <Fingerprint />,
      color: "bg-violet-100 text-violet-600",
      id: 7
    }
]
export default function Features() {
const sectionRef = useRef<HTMLDivElement>(null)
const featuresRef = useRef<HTMLDivElement | null>(null)
const [middleIndex, setMiddleIndex] = useState(1)
const [distance, setDistance] = useState(0)
const [step, setStep] = useState(0)
const isScrolling = useRef(false)
const maxStep = features.length - 3
useEffect(() => {
    if (!featuresRef.current) return
const first = featuresRef.current
  const second = first.nextElementSibling as HTMLElement | null
  if (!second) return
    setDistance(second.getBoundingClientRect().left - first.getBoundingClientRect().left)
  }, [])
useEffect(() => {
  const section = sectionRef.current
  if (!section) return

  const handleWheel = (e: WheelEvent) => {
    const rect = section.getBoundingClientRect()

    const inView =
      rect.bottom > 400 &&
      rect.top < window.innerHeight - 400
console.log('in view', inView, "rect.bottom:", rect.bottom, "rect.top:", rect.top, "window.innerHeight:", window.innerHeight)
    if (!inView) return

    if (isScrolling.current) {
      e.preventDefault()
      return
    }

    if (e.deltaY > 0 && step < maxStep) {
      e.preventDefault()

      isScrolling.current = true
      setStep(prev => prev + 1)
      setMiddleIndex(prev => prev + 1)
      setTimeout(() => {
        isScrolling.current = false
      }, 500)
    }

    if (e.deltaY < 0 && step > 0) {
      e.preventDefault()

      isScrolling.current = true
      setStep(prev => prev - 1)
      setMiddleIndex(prev => prev - 1)
      setTimeout(() => {
        isScrolling.current = false
      }, 500)
    }
  }

  window.addEventListener("wheel", handleWheel, {
    passive: false
  })

  return () => {
    window.removeEventListener("wheel", handleWheel)
  }
}, [step, maxStep])
        console.log(middleIndex, featuresRef.current?.offsetWidth)
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <section id="features" className="flex flex-col items-center justify-center w-full max-w-[1120px] overflow-hidden mx-auto min-h-[70vh] px-10">
            <h1 className="text-3xl font-semibold text-center mx-auto">Powerful Features</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">Everything you need to manage, track, and grow your finances, securely and efficiently.</p>
            
            <div  ref={sectionRef} className={`flex items-center justify-start gap-6 px-4 md:px-0 transition-all w-max duration-250 mx-auto my-20`}  style={{
    transform: `translateX(-${distance * step}px)`
  }}>
                {features.map((feature, index) => (
                    <FeatureBox ref={index === 0 ? featuresRef : null} key={feature.id} id={feature.id} icon={feature.icon} title={feature.title} description={feature.description} color={feature.color} middleIndex={middleIndex}/>
                ))}
            </div>
            </section>
        </>
    );
};
