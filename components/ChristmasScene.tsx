'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ChristmasElement {
  id: string
  imageUrl: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  addedDate: string
}

export default function ChristmasScene() {
  const [elements, setElements] = useState<ChristmasElement[]>([])
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(0)

  useEffect(() => {
    const calculateDaysUntilChristmas = () => {
      const now = new Date()
      const currentYear = now.getFullYear()
      let christmas = new Date(currentYear, 11, 25, 8, 0, 0)
      
      if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25, 8, 0, 0)
      }
      
      const difference = christmas.getTime() - now.getTime()
      return Math.floor(difference / (1000 * 60 * 60 * 24))
    }

    setDaysUntilChristmas(calculateDaysUntilChristmas())

    // Load saved elements from localStorage
    const savedElements = localStorage.getItem('christmasElements')
    if (savedElements) {
      const parsed = JSON.parse(savedElements)
      setElements(parsed)
    }

    // Check if we need to add new elements immediately
    checkAndAddElements()

    // Set up interval to check every minute if 6 hours have passed
    const intervalId = setInterval(() => {
      checkAndAddElements()
    }, 60000) // Check every 60 seconds

    return () => clearInterval(intervalId)
  }, [])

  const checkAndAddElements = async () => {
    const now = Date.now()
    const lastUpdateStr = localStorage.getItem('lastElementUpdate')
    
    // If no last update, set it to now and add first element
    if (!lastUpdateStr) {
      await addNewElements(1)
      localStorage.setItem('lastElementUpdate', now.toString())
      return
    }
    
    const lastUpdate = parseInt(lastUpdateStr, 10)
    const sixHoursInMs = 6 * 60 * 60 * 1000 // 6 hours in milliseconds
    const timeSinceLastUpdate = now - lastUpdate
    
    // Check if 6 hours have passed
    if (timeSinceLastUpdate >= sixHoursInMs) {
      // Calculate how many 6-hour periods have passed
      const periodsElapsed = Math.floor(timeSinceLastUpdate / sixHoursInMs)
      
      // Add one element for each period (usually just 1, but handles longer gaps)
      await addNewElements(periodsElapsed)
      
      // Update timestamp to now
      localStorage.setItem('lastElementUpdate', now.toString())
    }
  }

  const addNewElements = async (count: number) => {
    console.log(`🎄 Adding ${count} new Christmas element(s)!`)
    
    for (let i = 0; i < count; i++) {
      let newElement: ChristmasElement | null = null
      
      // Try to generate with Leonardo.ai API, fallback to emoji
      try {
        const response = await fetch('/api/generate-element', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ elementType: null }), // Random type
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.image) {
            newElement = {
              id: `element-${Date.now()}-${Math.random()}`,
              imageUrl: data.image.url,
              position: {
                x: 5 + Math.random() * 70,
                y: 25 + Math.random() * 60,
              },
              size: { width: 200, height: 200 },
              zIndex: Math.floor(Math.random() * 20) + 1,
              addedDate: new Date().toISOString(),
            }
          }
        }
      } catch (error) {
        console.log('Leonardo API unavailable, using fallback')
      }
      
      // Fallback to emoji placeholder
      if (!newElement) {
        newElement = generatePlaceholderElement()
      }
      
      // Add element immediately and update state
      setElements(prev => {
        const updated = [...prev, newElement!]
        localStorage.setItem('christmasElements', JSON.stringify(updated))
        return updated
      })
      
      // Small delay between multiple elements if catching up
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }

  const generatePlaceholderElement = (): ChristmasElement => {
    const elementTypes = [
      { emoji: '🎄', size: { width: 200, height: 250 } },
      { emoji: '🎅', size: { width: 150, height: 180 } },
      { emoji: '⛄', size: { width: 140, height: 160 } },
      { emoji: '🎁', size: { width: 120, height: 120 } },
      { emoji: '🦌', size: { width: 160, height: 140 } },
      { emoji: '🔔', size: { width: 100, height: 100 } },
      { emoji: '⭐', size: { width: 110, height: 110 } },
      { emoji: '🕯️', size: { width: 80, height: 120 } },
      { emoji: '🧦', size: { width: 90, height: 110 } },
      { emoji: '🍬', size: { width: 80, height: 80 } },
      { emoji: '🎀', size: { width: 90, height: 90 } },
      { emoji: '❄️', size: { width: 100, height: 100 } },
    ]

    const element = elementTypes[Math.floor(Math.random() * elementTypes.length)]
    
    return {
      id: `element-${Date.now()}-${Math.random()}`,
      imageUrl: element.emoji,
      position: {
        x: 5 + Math.random() * 70, // 5-75% from left
        y: 25 + Math.random() * 60, // 25-85% from top
      },
      size: element.size,
      zIndex: Math.floor(Math.random() * 20) + 1,
      addedDate: new Date().toISOString(),
    }
  }

  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <AnimatePresence>
        {elements.map((element) => (
          <motion.div
            key={element.id}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ 
              scale: 1, 
              rotate: 0, 
              opacity: 1,
            }}
            transition={{ 
              type: "spring",
              duration: 1.5,
              delay: Math.random() * 0.5,
            }}
            style={{
              position: 'absolute',
              left: `${element.position.x}%`,
              top: `${element.position.y}%`,
              zIndex: element.zIndex,
            }}
            className="twinkle"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 0.95, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="responsive-element"
              style={{
                fontSize: element.imageUrl.startsWith('http') ? undefined : 'clamp(60px, 8vw, 200px)',
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
              }}
            >
              {element.imageUrl.startsWith('http') ? (
                <Image
                  src={element.imageUrl}
                  alt="Christmas element"
                  width={element.size.width}
                  height={element.size.height}
                  className="rounded-lg w-[clamp(80px,10vw,200px)] h-auto"
                />
              ) : (
                element.imageUrl
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute bottom-4 md:bottom-6 lg:bottom-8 right-4 md:right-6 lg:right-8 bg-black/30 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 border border-christmas-gold md:border-2">
        <p className="text-sm md:text-base lg:text-xl text-christmas-gold font-semibold">
          🎄 Scene Progress
        </p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold mt-1 md:mt-2">
          {elements.length} elements
        </p>
        <p className="text-xs md:text-sm text-christmas-snow mt-0.5 md:mt-1 opacity-75">
          Growing daily!
        </p>
      </div>
    </div>
  )
}

