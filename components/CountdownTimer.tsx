'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isChristmas, setIsChristmas] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      
      // Target: December 25th at 8:00 AM
      let christmas = new Date(currentYear, 11, 25, 8, 0, 0)
      
      // If Christmas has passed this year, target next year
      if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25, 8, 0, 0)
      }
      
      const difference = christmas.getTime() - now.getTime()
      
      if (difference <= 0) {
        setIsChristmas(true)
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isChristmas) {
    return (
      <div className="w-full py-12 px-8 text-center">
        <motion.h1 
          className="christmas-font text-8xl font-bold glow-text"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
        >
          🎅 IT'S CHRISTMAS! 🎄
        </motion.h1>
      </div>
    )
  }

  return (
    <div className="w-full py-8 px-8">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="christmas-font text-6xl md:text-7xl font-bold text-christmas-gold glow-text mb-8">
          Christmas Countdown! 🎅
        </h1>
        
        <div className="flex justify-center gap-6 md:gap-12">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
        
        <p className="mt-8 text-2xl md:text-3xl text-christmas-snow opacity-90">
          Until 8:00 AM on Christmas Morning! ⭐
        </p>
      </motion.div>
    </div>
  )
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="bg-gradient-to-br from-christmas-red to-red-800 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-christmas-gold min-w-[120px] md:min-w-[160px]">
        <motion.div
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl md:text-8xl font-bold text-white"
        >
          {value.toString().padStart(2, '0')}
        </motion.div>
      </div>
      <div className="text-2xl md:text-3xl font-semibold mt-4 text-christmas-gold uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}

