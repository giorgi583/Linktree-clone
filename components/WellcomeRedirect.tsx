// components/welcome-redirect.tsx
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function WelcomeRedirect() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 5000)

    return () => clearTimeout(timer) // cleanup if the component unmounts early
  }, [router])

  return null // no visible UI, just handles the delayed redirect
}