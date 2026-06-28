'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CommandLoaderProps {
  command: string
  children: React.ReactNode
}

export function CommandLoader({ command, children }: CommandLoaderProps) {
  const [displayedCommand, setDisplayedCommand] = useState('')
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= command.length) {
        setDisplayedCommand(command.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowContent(true), 100)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [command])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Command line */}
      <motion.div
        className="mb-6 font-mono text-xs text-foreground/50 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-[#10b981]">$</span>
        <span className="text-foreground/70">{displayedCommand}</span>
        {!showContent && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>│</motion.span>}
      </motion.div>

      {/* Content appears after command finishes */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
