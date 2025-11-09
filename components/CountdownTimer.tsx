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
      <div className="w-full py-8 md:py-12 px-4 md:px-8 text-center">
        <motion.h1 
          className="christmas-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold glow-text"
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
    <div className="w-full py-4 md:py-6 lg:py-8 px-4 md:px-8">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="christmas-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-christmas-gold glow-text mb-4 md:mb-6 lg:mb-8">
          Christmas Countdown! 🎅
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
        
        <p className="mt-4 md:mt-6 lg:mt-8 text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-christmas-snow opacity-90 px-4">
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
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="bg-gradient-to-br from-christmas-red to-red-800 rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border-2 md:border-4 border-christmas-gold min-w-[80px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px]">
        <motion.div
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white"
        >
          {value.toString().padStart(2, '0')}
        </motion.div>
      </div>
      <div className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold mt-2 md:mt-3 lg:mt-4 text-christmas-gold uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}

