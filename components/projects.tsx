'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './animated-section'
import { ExternalLink, Code, CheckCircle2 } from 'lucide-react'

const projects = [
  {
    title: 'E-Commerce Microservices Platform',
    status: 'SUCCESS',
    timestamp: '2024-01-15 14:32:08',
    description:
      'Built a scalable e-commerce backend using microservices architecture with Spring Boot. Implemented service mesh communication, distributed transactions, and event-driven order processing.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Docker', 'Kafka'],
    highlights: [
      'Reduced order processing latency by 40% through event-driven architecture',
      'Implemented distributed caching with Redis for 3x faster catalog searches',
      'Designed API gateway with rate limiting and circuit breaker patterns',
    ],
    link: '#',
    github: '#',
  },
  {
    title: 'Real-Time Analytics Engine',
    status: 'SUCCESS',
    timestamp: '2023-11-20 09:18:45',
    description:
      'Developed a high-throughput analytics system capable of processing millions of events per day. Implemented stream processing with Kafka and real-time aggregations.',
    technologies: ['Java', 'Kafka', 'PostgreSQL', 'Elasticsearch', 'Spring Boot'],
    highlights: [
      'Processes 10M+ events daily with sub-second latency',
      'Implemented complex aggregation pipelines for real-time dashboards',
      'Optimized query performance using indexed Elasticsearch clusters',
    ],
    link: '#',
    github: '#',
  },
  {
    title: 'Payment Processing System',
    status: 'SUCCESS',
    timestamp: '2023-09-10 16:45:22',
    description:
      'Designed and implemented a secure payment processing system handling transactions across multiple payment gateways with robust error handling and reconciliation.',
    technologies: ['Spring Boot', 'PostgreSQL', 'Stripe API', 'Redis', 'Docker'],
    highlights: [
      'Ensured PCI DSS compliance with encrypted data handling',
      'Implemented idempotent transaction handling for reliability',
      'Built comprehensive audit logging and dispute resolution system',
    ],
    link: '#',
    github: '#',
  },
]

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <AnimatedSection
      id="projects"
      className="py-20 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4 font-mono text-xs text-foreground/50"
        >
          $ cat deployment_logs.txt
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Deployment Logs
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl">
            Production deployments and system architectures built to scale.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group border border-border rounded-md overflow-hidden hover:border-[#10b981]/50 transition-all duration-300 bg-card/30 backdrop-blur-sm"
            >
              {/* Log Header */}
              <div className="px-6 py-3 border-b border-foreground/10 bg-background/30 font-mono text-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[#10b981]">[{project.status}]</span>
                  <span className="text-foreground/50">{project.timestamp}</span>
                  <span className="text-foreground/40">—</span>
                  <span className="text-foreground/70">{project.title}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              </div>

              <div className="p-6">
                {/* Description */}
                <p className="text-foreground/70 mb-6 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Highlights as terminal output */}
                <div className="mb-6 bg-background/50 rounded p-4 border border-foreground/10">
                  <div className="font-mono text-xs text-foreground/50 mb-3">
                    $ deployment_report --verbose
                  </div>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <motion.li
                        key={highlight}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + i * 0.05 }}
                        viewport={{ once: true }}
                        className="text-foreground/70 flex gap-3 text-xs font-mono"
                      >
                        <span className="text-[#10b981]">✓</span>
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 rounded text-xs font-mono bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981]/80 hover:border-[#10b981]/60 hover:bg-[#10b981]/20 transition-all cursor-default"
                    >
                      #{tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-3 pt-4 border-t border-foreground/10">
                  <motion.a
                    href={project.github}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-[#06b6d4] hover:text-[#06b6d4]/80 transition-colors hover:bg-[#06b6d4]/10 rounded"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Code className="w-3 h-3" />
                    View Code
                  </motion.a>
                  <motion.a
                    href={project.link}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-[#f97316] hover:text-[#f97316]/80 transition-colors hover:bg-[#f97316]/10 rounded"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    Details
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
