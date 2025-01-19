import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './Navigation'

export default function Layout({ children }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation 
        isExpanded={isNavExpanded} 
        onToggle={() => setIsNavExpanded(!isNavExpanded)} 
      />
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto px-4 py-6 md:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
