'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './animated-section'
import { Terminal } from 'lucide-react'
import { CommandLoader } from './command-loader'

export function About() {
  const highlights = [
    {
      title: 'System Architect',
      icon: '⚙️',
      description:
        'Designing scalable microservices with event-driven architecture and distributed computing principles.',
    },
    {
      title: 'Security Focused',
      icon: '🔒',
      description:
        'Building secure systems with compliance in mind. Passionate about open source security tools.',
    },
    {
      title: 'Linux Enthusiast',
      icon: '🐧',
      description:
        'Deep expertise in Linux systems, shell scripting, and open source development. CLI over GUI.',
    },
    {
      title: 'Continuous Learner',
      icon: '📚',
      description:
        'Always exploring new technologies, contributing to open source, and staying at the cutting edge.',
    },
  ]

  const sysInfo = [
    { label: 'OS', value: 'Morocco-based Backend Engineer' },
    { label: 'Kernel', value: 'Java + Spring Boot Stack' },
    { label: 'Education', value: 'Engineering Student | ShiftBricks Intern' },
    { label: 'Architecture', value: 'Microservices & Distributed Systems' },
    { label: 'Specialization', value: 'REST APIs, Database Optimization, System Design' },
  ]

  return (
    <AnimatedSection id="about" className="py-20 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <CommandLoader command="$ whoami && uname -a">
          {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 p-6 rounded-md border border-[#10b981]/30 bg-[#10b981]/5 font-mono text-sm"
        >
          {sysInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-foreground/70 leading-relaxed"
            >
              <span className="text-[#10b981]">{item.label}:</span>{' '}
              <span className="text-foreground/60">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About This System
          </h2>
          <p className="text-lg text-foreground/85 leading-relaxed">
            I&apos;m a backend engineer with deep passion for architecting systems that scale. Currently 
            pursuing my engineering degree while interning at <span className="text-[#10b981]">ShiftBricks</span>,
            where I&apos;m applying theoretical knowledge to real-world challenges. I specialize in
            building secure, efficient systems with a focus on open source principles and Linux philosophy.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-4 font-mono text-xs text-foreground/50"
        >
          $ cat capabilities.txt
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {highlights.map((highlight, i) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-md border border-border bg-card/50 hover:border-[#10b981]/50 transition-all duration-300 hover:bg-card/80"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{highlight.icon}</span>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-[#10b981] transition-colors">
                  {highlight.title}
                </h3>
              </div>
              <p className="text-foreground/70 leading-relaxed text-sm">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>

          {/* Philosophy - Terminal Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-6 rounded-md border border-[#06b6d4]/30 bg-[#06b6d4]/5"
          >
            <div className="font-mono text-xs text-[#06b6d4] mb-3">$ cat philosophy.md</div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Engineering Principles</h3>
            <div className="text-foreground/80 leading-relaxed space-y-3 text-sm">
              <p>
                <span className="text-[#06b6d4]">&gt;</span> Code is read more than it is written. 
                Every line should be clear, maintainable, and testable.
              </p>
              <p>
                <span className="text-[#06b6d4]">&gt;</span> Systems must scale gracefully. 
                Architecture decisions compound over time.
              </p>
              <p>
                <span className="text-[#06b6d4]">&gt;</span> Security first. Open source contributions. 
                Linux philosophy: Do one thing, do it well.
              </p>
            </div>
          </motion.div>
        </CommandLoader>
      </div>
    </AnimatedSection>
  )
}
