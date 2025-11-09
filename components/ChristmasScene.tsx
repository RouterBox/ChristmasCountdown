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

    // Check if we need to add new elements for today
    checkAndAddDailyElements()
  }, [])

  const checkAndAddDailyElements = async () => {
    const today = new Date().toDateString()
    const lastUpdate = localStorage.getItem('lastElementUpdate')
    
    if (lastUpdate !== today) {
      // Add 1-3 new elements
      const numElements = Math.floor(Math.random() * 3) + 1
      await addNewElements(numElements)
      localStorage.setItem('lastElementUpdate', today)
    }
  }

  const addNewElements = async (count: number) => {
    const newElements: ChristmasElement[] = []
    
    for (let i = 0; i < count; i++) {
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
            const element: ChristmasElement = {
              id: `element-${Date.now()}-${Math.random()}`,
              imageUrl: data.image.url,
              position: {
                x: 10 + Math.random() * 60,
                y: 30 + Math.random() * 50,
              },
              size: { width: 200, height: 200 },
              zIndex: Math.floor(Math.random() * 20) + 1,
              addedDate: new Date().toISOString(),
            }
            newElements.push(element)
            continue
          }
        }
      } catch (error) {
        console.log('Leonardo API unavailable, using fallback')
      }
      
      // Fallback to emoji placeholder
      const element = generatePlaceholderElement()
      newElements.push(element)
    }
    
    setElements(prev => {
      const updated = [...prev, ...newElements]
      localStorage.setItem('christmasElements', JSON.stringify(updated))
      return updated
    })
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
        x: 10 + Math.random() * 60, // 10-70% from left
        y: 30 + Math.random() * 50, // 30-80% from top
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
              style={{
                fontSize: element.imageUrl.startsWith('http') ? undefined : `${element.size.width}px`,
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
              }}
            >
              {element.imageUrl.startsWith('http') ? (
                <Image
                  src={element.imageUrl}
                  alt="Christmas element"
                  width={element.size.width}
                  height={element.size.height}
                  className="rounded-lg"
                />
              ) : (
                element.imageUrl
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute bottom-8 right-8 bg-black/30 backdrop-blur-md rounded-2xl p-6 border-2 border-christmas-gold">
        <p className="text-xl text-christmas-gold font-semibold">
          🎄 Scene Progress
        </p>
        <p className="text-4xl font-bold mt-2">
          {elements.length} elements
        </p>
        <p className="text-sm text-christmas-snow mt-1 opacity-75">
          Growing daily!
        </p>
      </div>
    </div>
  )
}

