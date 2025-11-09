'use client'

import { useEffect, useState } from 'react'

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number
    left: number
    delay: number
    duration: number
    size: number
  }>>([])

  useEffect(() => {
    // Adjust snowflake count based on screen size
    const isSmallScreen = window.innerWidth < 768
    const isMediumScreen = window.innerWidth < 1920
    const flakeCount = isSmallScreen ? 30 : isMediumScreen ? 40 : 50
    
    const flakes = Array.from({ length: flakeCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 20,
      size: 0.5 + Math.random() * 1,
    }))
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            fontSize: `${flake.size}em`,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  )
}

