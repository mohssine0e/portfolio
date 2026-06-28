'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ArrowRight,
  FileText,
  Code,
  Mail,
  ExternalLink,
  Briefcase,
} from 'lucide-react'

const commands = [
  {
    category: 'Navigate',
    items: [
      { label: 'About', href: '#about', icon: FileText },
      { label: 'Skills', href: '#skills', icon: FileText },
      { label: 'Projects', href: '#projects', icon: FileText },
      { label: 'Experience', href: '#experience', icon: FileText },
      { label: 'Contact', href: '#contact', icon: Mail },
    ],
  },
  {
    category: 'External',
    items: [
      {
        label: 'GitHub',
        href: 'https://github.com/mohssine-frid',
        icon: Code,
      },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/mohssine-frid', icon: Briefcase },
      { label: 'Send Email', href: 'mailto:mohssine@example.com', icon: Mail },
    ],
  },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const filteredCommands = commands.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    ),
  }))

  const handleSelect = (href: string) => {
    if (href.startsWith('http') || href.startsWith('mailto')) {
      if (href.startsWith('mailto')) {
        window.location.href = href
      } else {
        window.open(href, '_blank')
      }
    } else {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
    setSearch('')
  }

  return (
    <>
      {/* Keyboard shortcut hint */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-40 p-3 rounded-lg bg-card border border-border text-foreground/70 hover:text-foreground hover:border-accent/50 transition-all duration-300 group md:flex items-center gap-2 hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search className="w-5 h-5" />
        <span className="text-xs font-semibold">
          <span className="text-foreground/50 group-hover:text-foreground/70">
            {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}
          </span>
          K
        </span>
      </motion.button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            {/* Command Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
            >
              <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl">
                {/* Search Input */}
                <div className="border-b border-border p-4 flex items-center gap-3">
                  <Search className="w-5 h-5 text-accent flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search commands..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-foreground placeholder-foreground/50 outline-none"
                  />
                </div>

                {/* Command List */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredCommands.map((group) =>
                    group.items.length > 0 ? (
                      <div key={group.category}>
                        <div className="px-4 py-2 text-xs font-semibold text-foreground/50 uppercase tracking-widest">
                          {group.category}
                        </div>
                        {group.items.map((item) => {
                          const Icon = item.icon
                          return (
                            <motion.button
                              key={item.label}
                              onClick={() => handleSelect(item.href)}
                              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors text-left text-foreground/80 hover:text-foreground"
                              whileHover={{ paddingLeft: 24 }}
                            >
                              <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                              <span className="flex-1">{item.label}</span>
                              <ArrowRight className="w-4 h-4 text-foreground/30" />
                            </motion.button>
                          )
                        })}
                      </div>
                    ) : null
                  )}

                  {search && filteredCommands.every((g) => g.items.length === 0) && (
                    <div className="px-4 py-8 text-center text-foreground/50">
                      No commands found for &quot;{search}&quot;
                    </div>
                  )}
                </div>

                {/* Footer Hint */}
                <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-foreground/50">
                  <span>Press ESC to close</span>
                  <span className="flex gap-2">
                    <kbd className="px-2 py-1 rounded bg-background text-foreground/70">
                      ↑↓
                    </kbd>
                    <span>to navigate</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
