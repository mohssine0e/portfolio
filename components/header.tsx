'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FacePlaceholder } from './face-placeholder'

const navItems = [
  { label: 'About', href: '#about', process: 'whoami' },
  { label: 'Skills', href: '#skills', process: 'sys_modules' },
  { label: 'Projects', href: '#projects', process: 'deploy_logs' },
  { label: 'Experience', href: '#experience', process: 'uptime' },
  { label: 'Contact', href: '#contact', process: 'connect' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      for (const item of navItems) {
        const section = document.querySelector(item.href)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 0) {
            setActiveSection(item.href)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FacePlaceholder size="header" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-bold text-[#10b981] font-mono hover:text-[#10b981]/80 transition-colors cursor-default"
          >
            root@portfolio
          </motion.div>
        </div>

        <div className="hidden md:flex gap-1">
          {navItems.map((item, i) => {
            const isActive = activeSection === item.href
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-sm font-mono transition-all duration-300 rounded-md ${
                    isActive
                      ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/50 animate-green-glow'
                      : 'text-foreground/60 hover:text-foreground hover:border border border-transparent hover:border-foreground/20 hover:bg-foreground/5'
                  }`}
                  title={`$ ${item.process}`}
                >
                  {isActive && <span className="mr-1">▶</span>}
                  {item.label}
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="#contact"
            className="px-4 py-2 rounded-md bg-[#10b981] text-white font-semibold text-sm hover:bg-[#10b981]/90 transition-colors font-mono animate-green-glow border border-[#10b981]/50"
          >
            $ connect
          </Link>
        </motion.div>
      </nav>
    </motion.header>
  )
}
