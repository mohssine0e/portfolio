'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './animated-section'
import { CheckCircle2, Lock, Zap } from 'lucide-react'
import { CommandLoader } from './command-loader'

const skillCategories = [
  {
    title: 'Backend Development',
    icon: Zap,
    color: '#10b981',
    skills: ['Java', 'Spring Boot', 'Spring Data JPA', 'REST APIs', 'Microservices'],
  },
  {
    title: 'Databases',
    icon: Lock,
    color: '#06b6d4',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    title: 'Architecture & Design',
    icon: CheckCircle2,
    color: '#f97316',
    skills: ['Microservices Architecture', 'Event-Driven Architecture', 'SOLID Principles', 'Design Patterns', 'System Design'],
  },
  {
    title: 'Tools & Platforms',
    icon: Zap,
    color: '#10b981',
    skills: ['Docker', 'Git', 'Maven', 'Gradle', 'Linux'],
  },
  {
    title: 'Messaging & Caching',
    icon: Lock,
    color: '#06b6d4',
    skills: ['RabbitMQ', 'Kafka', 'Redis', 'Message Queues', 'Cache Patterns'],
  },
  {
    title: 'Frontend Basics',
    icon: CheckCircle2,
    color: '#f97316',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
  },
]

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <AnimatedSection
      id="skills"
      className="py-20 bg-background border-t border-border relative"
    >
      <div className="max-w-6xl mx-auto px-6">
        <CommandLoader command="$ sys_modules --list">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              System Modules
            </h2>
            <p className="text-lg text-foreground/85 max-w-3xl">
              Loaded dependencies and critical systems powering my backend infrastructure.
            </p>
          </motion.div>

          <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="group relative"
              >
                <div
                  className="absolute inset-0 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"
                  style={{ backgroundColor: category.color, opacity: 0.1 }}
                />
                <div className="relative p-6 rounded-lg border border-border bg-card/50 hover:border-[#10b981]/50 transition-all duration-300">
                  {/* Status indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: category.color }}
                    />
                    <Icon className="w-4 h-4" style={{ color: category.color }} />
                    <h3 className="text-sm font-mono text-foreground/70">[LOADED]</h3>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-4 font-mono">
                    {category.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 + i * 0.03 }}
                        viewport={{ once: true }}
                        className="px-2 py-1 rounded text-xs font-mono bg-background/50 border border-foreground/10 text-foreground/70 hover:border-foreground/30 hover:text-foreground/90 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                </div>
              </motion.div>
            )
          })}
          </motion.div>

          {/* System status footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 p-5 rounded-md border border-[#10b981]/30 bg-[#10b981]/5"
          >
            <p className="font-mono text-sm text-[#10b981]">
              <span className="text-[#10b981]/60">&gt;</span> All systems operational.
            </p>
          </motion.div>
        </CommandLoader>
      </div>
    </AnimatedSection>
  )
}
