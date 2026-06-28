'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code, Briefcase, Mail } from 'lucide-react'

const currentYear = new Date().getFullYear()

export function Footer() {
  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com',
      icon: Code,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Briefcase,
    },
    {
      label: 'Email',
      href: 'mailto:mohssine@example.com',
      icon: Mail,
    },
  ]

  return (
    <footer className="border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Footer Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Mohssine Frid</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Backend engineer passionate about building scalable systems and
              distributed architectures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Experience', href: '#experience' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-card hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="sr-only">{link.label}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/50 text-sm">
            © {currentYear} Mohssine Frid. All rights reserved.
          </p>
          <p className="text-foreground/50 text-sm">
            Built with{' '}
            <Link
              href="https://nextjs.org"
              className="text-accent hover:underline"
            >
              Next.js
            </Link>
            {' '}and{' '}
            <Link
              href="https://framer.com"
              className="text-accent hover:underline"
            >
              Framer Motion
            </Link>
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
