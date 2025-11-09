'use client'

import { useEffect, useState } from 'react'
import CountdownTimer from '@/components/CountdownTimer'
import ChristmasScene from '@/components/ChristmasScene'
import Snowfall from '@/components/Snowfall'
import AdminPanel from '@/components/AdminPanel'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Snowfall effect */}
      <Snowfall />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#1a2f4a] to-[#2a3f5a]" />
      
      {/* Christmas Scene */}
      <ChristmasScene />
      
      {/* Countdown Timer - Always on top */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <CountdownTimer />
      </div>

      {/* Admin Panel for testing */}
      <AdminPanel />
    </main>
  )
}

