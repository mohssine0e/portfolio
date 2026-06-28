'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './animated-section'
import { Mail, Briefcase, Code, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mohssine@example.com',
    href: 'mailto:mohssine@example.com',
    description: 'Prefer email for inquiries and collaboration',
  },
  {
    icon: Briefcase,
    label: 'LinkedIn',
    value: 'linkedin.com/in/mohssine-frid',
    href: 'https://linkedin.com/in/mohssine-frid',
    description: 'Connect with me on LinkedIn',
  },
  {
    icon: Code,
    label: 'GitHub',
    value: 'github.com/mohssine-frid',
    href: 'https://github.com/mohssine-frid',
    description: 'Explore my code and projects',
  },
]

export function Contact() {
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
      id="contact"
      className="py-20 bg-gradient-to-b from-background via-card/20 to-background border-t border-border"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-foreground/85 max-w-2xl mx-auto leading-relaxed">
            Whether you have an interesting project, want to discuss backend
            architecture, or just want to say hello, feel free to reach out. I&apos;m
            always open to new opportunities and conversations.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                variants={itemVariants}
                className="p-6 rounded-lg border border-border bg-card/50 hover:border-accent/50 hover:bg-card transition-all duration-300 group"
              >
                <Icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                  {method.label}
                </h3>
                <p className="text-foreground/70 text-sm mb-3">{method.description}</p>
                <div className="flex items-center gap-2 text-accent text-sm font-medium">
                  {method.value}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.a>
            )
          })}
        </motion.div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="p-8 rounded-lg border border-accent/30 bg-gradient-to-br from-accent/10 via-background to-background text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to collaborate?
          </h3>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            I&apos;m currently open to new opportunities, contract work, and interesting
            technical discussions. If you&apos;d like to work together or just connect,
            don&apos;t hesitate to reach out!
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              href="mailto:mohssine@example.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md font-semibold hover:opacity-90 transition-opacity"
            >
              <Mail className="w-5 h-5" />
              Send me an email
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent text-accent rounded-md font-semibold hover:bg-accent/10 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Download Resume
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
