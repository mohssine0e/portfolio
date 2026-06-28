'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from './animated-section'
import { Briefcase, GraduationCap } from 'lucide-react'

const experiences = [
  {
    type: 'experience',
    title: 'Backend Engineer Intern',
    company: 'ShiftBricks',
    period: '2024 - Present',
    description:
      'Contributing to backend infrastructure development and optimization. Working with Spring Boot and PostgreSQL to build scalable microservices.',
    achievements: [
      'Designed and implemented REST APIs serving 1000+ daily requests',
      'Optimized database queries reducing query time by 35%',
      'Implemented caching strategy using Redis, improving response times',
      'Collaborated with cross-functional teams on architectural decisions',
    ],
  },
  {
    type: 'education',
    title: 'Engineering Degree in Software Development',
    company: 'University of Morocco',
    period: '2022 - 2025',
    description:
      'Specialized in distributed systems, software architecture, and backend engineering.',
    achievements: [
      'Completed advanced courses in microservices and cloud computing',
      'Led capstone project on distributed transaction processing',
      'Maintained 3.8 GPA throughout engineering program',
      'Active in technical community and mentoring junior students',
    ],
  },
  {
    type: 'experience',
    title: 'Student Developer',
    company: 'Various Open Source Projects',
    period: '2022 - 2024',
    description:
      'Contributed to open-source projects, gaining practical experience with version control and collaborative development.',
    achievements: [
      'Contributed to 15+ GitHub repositories',
      'Fixed critical bugs and improved system performance',
      'Wrote comprehensive technical documentation',
      'Received positive feedback from experienced maintainers',
    ],
  },
]

export function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="py-20 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Experience & Education
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl">
            A timeline of my professional growth and academic achievements.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.title}-${exp.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline dot and line */}
              <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-accent rounded-full border-4 border-background md:-translate-x-2 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ opacity: 0.3 }}
                />
              </div>

              {exp.type === 'experience' && index !== experiences.length - 1 && (
                <div className="absolute left-2 md:left-1/2 top-4 h-[calc(100%+32px)] w-0.5 bg-gradient-to-b from-accent/50 to-border -translate-x-1.5 md:-translate-x-0.5" />
              )}
              {exp.type === 'education' && index !== experiences.length - 1 && (
                <div className="absolute left-2 md:left-1/2 top-4 h-[calc(100%+32px)] w-0.5 bg-gradient-to-b from-border to-accent/50 -translate-x-1.5 md:-translate-x-0.5" />
              )}

              {/* Content */}
              <div className={`md:flex md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2" />
                <div className="md:w-1/2 bg-card/50 border border-border rounded-lg p-6 hover:border-accent/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    {exp.type === 'experience' ? (
                      <Briefcase className="w-5 h-5 text-accent" />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-accent" />
                    )}
                    <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-accent font-semibold mb-1">{exp.company}</p>
                  <p className="text-foreground/60 text-sm mb-4">{exp.period}</p>

                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="text-foreground/70 flex gap-3 text-sm"
                      >
                        <span className="text-accent font-bold mt-0.5">→</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
