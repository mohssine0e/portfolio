'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Code2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Hero() {
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'Backend Engineer & Security Enthusiast'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const bootSequence = [
    '[SYSTEM] Initializing boot sequence...',
    '[KERNEL] Loading core modules...',
    '[DRIVERS] Hardware detection complete',
    '[SERVICES] Starting critical services...',
    '[AUTH] Security systems online',
    '[NETWORK] Connecting to backend networks...',
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Terminal background glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#10b981] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-[#06b6d4] rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 w-full">
        {/* Boot sequence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-2 font-mono text-sm"
        >
          {bootSequence.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="text-[#10b981]/70"
            >
              {line}
            </motion.div>
          ))}
        </motion.div>

        {/* Main headline with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            <span className="relative">
              {displayedText}
              {displayedText.length < fullText.length && (
                <span className="animate-cursor text-[#10b981]">│</span>
              )}
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mb-12"
        >
          <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed font-light">
            Crafting secure, scalable systems with Java & Spring Boot. Passionate about 
            <span className="text-[#10b981] font-semibold"> open source</span>,{' '}
            <span className="text-[#f97316] font-semibold">security</span>, and{' '}
            <span className="text-[#06b6d4] font-semibold">distributed architectures</span>.
          </p>
        </motion.div>

        {/* Status indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mb-12 flex flex-wrap gap-3"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#10b981]/30 bg-[#10b981]/5 hover:border-[#10b981]/60 transition-colors">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-sm text-[#10b981]">System Online</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#06b6d4]/30 bg-[#06b6d4]/5 hover:border-[#06b6d4]/60 transition-colors">
            <Shield className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-sm text-[#06b6d4]">Security Focused</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-md border border-[#f97316]/30 bg-[#f97316]/5 hover:border-[#f97316]/60 transition-colors">
            <Code2 className="w-4 h-4 text-[#f97316]" />
            <span className="text-sm text-[#f97316]">Open Source</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#10b981] text-white rounded-md font-semibold hover:bg-[#10b981]/90 transition-colors group animate-green-glow"
          >
            Execute Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#06b6d4] text-[#06b6d4] rounded-md font-semibold hover:bg-[#06b6d4]/10 transition-colors hover:border-[#06b6d4]/80"
          >
            Initiate Contact
          </Link>
        </motion.div>

        {/* Tech Stack as loaded modules */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <p className="text-xs font-mono text-foreground/50 mb-4">$ loaded_modules --list</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['Java', 'Spring Boot', 'Microservices', 'PostgreSQL', 'Docker'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
                className="px-3 py-2 rounded-sm border border-[#10b981]/30 bg-[#10b981]/5 text-xs font-mono text-[#10b981]/80 hover:border-[#10b981]/60 hover:bg-[#10b981]/10 transition-all text-center"
              >
                [{tech}]
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Terminal scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-xs font-mono text-foreground/40">scroll down</p>
            <div className="w-5 h-8 border border-foreground/40 rounded-full flex items-center justify-center">
              <motion.div
                animate={{ y: [2, 6, 2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 bg-foreground/40 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
