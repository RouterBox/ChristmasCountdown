'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [timeInfo, setTimeInfo] = useState({ lastUpdate: '', nextUpdate: '' })

  useEffect(() => {
    // Update time info every second
    const updateTimeInfo = () => {
      setTimeInfo({
        lastUpdate: getLastUpdateTime(),
        nextUpdate: getTimeUntilNext(),
      })
    }

    updateTimeInfo()
    const interval = setInterval(updateTimeInfo, 1000)
    return () => clearInterval(interval)
  }, [])

  const getLastUpdateTime = () => {
    const lastUpdateStr = localStorage.getItem('lastElementUpdate')
    if (!lastUpdateStr) return 'Never'
    
    const lastUpdate = parseInt(lastUpdateStr, 10)
    const now = Date.now()
    const diff = now - lastUpdate
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (hours > 0) return `${hours}h ${minutes}m ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  const getTimeUntilNext = () => {
    const lastUpdateStr = localStorage.getItem('lastElementUpdate')
    if (!lastUpdateStr) return 'Soon'
    
    const lastUpdate = parseInt(lastUpdateStr, 10)
    const sixHours = 6 * 60 * 60 * 1000
    const nextUpdate = lastUpdate + sixHours
    const now = Date.now()
    const diff = nextUpdate - now
    
    if (diff <= 0) return 'Now!'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    if (hours > 0) return `${hours}h ${minutes}m`
    if (minutes > 0) return `${minutes}m ${seconds}s`
    return `${seconds}s`
  }

  const addElements = async () => {
    setIsGenerating(true)
    try {
      // Trigger localStorage update to force new elements
      localStorage.removeItem('lastElementUpdate')
      window.location.reload()
    } catch (error) {
      console.error('Error adding elements:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const clearAllElements = () => {
    if (confirm('Are you sure you want to clear all elements?')) {
      localStorage.removeItem('christmasElements')
      localStorage.removeItem('lastElementUpdate')
      window.location.reload()
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 lg:left-8 z-50 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full p-3 md:p-4 border-2 border-white/30 transition-all"
        title="Admin Controls"
      >
        <svg 
          className="w-5 h-5 md:w-6 md:h-6 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </button>

      {/* Admin Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-16 md:bottom-20 lg:bottom-24 left-4 md:left-6 lg:left-8 z-50 bg-black/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-white/30 min-w-[250px] md:min-w-[300px] max-w-[90vw]"
          >
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">
              🎄 Admin Controls
            </h3>
            
            <div className="space-y-2 md:space-y-3">
              <button
                onClick={addElements}
                disabled={isGenerating}
                className="w-full bg-christmas-green hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg transition-colors text-sm md:text-base"
              >
                {isGenerating ? '⏳ Adding...' : '➕ Add Elements Now'}
              </button>

              <button
                onClick={clearAllElements}
                className="w-full bg-christmas-red hover:bg-red-700 text-white font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg transition-colors text-sm md:text-base"
              >
                🗑️ Clear All Elements
              </button>

              <div className="pt-2 md:pt-3 border-t border-white/20">
                <p className="text-xs md:text-sm text-white/70">
                  <strong>Debug Info:</strong>
                </p>
                <p className="text-xs text-white/60 mt-1">
                  Last: {timeInfo.lastUpdate}
                </p>
                <p className="text-xs text-white/60">
                  Next in: {timeInfo.nextUpdate}
                </p>
                <p className="text-xs text-white/60">
                  Elements: {JSON.parse(localStorage.getItem('christmasElements') || '[]').length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

