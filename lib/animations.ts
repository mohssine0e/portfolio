// Animation utilities for Linux/Security themed portfolio

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

export const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const glitchVariants = {
  initial: { textShadow: '0 0 0 transparent' },
  hover: {
    textShadow: [
      '2px 0 #10b981, -2px 0 #f97316',
      '-2px 0 #10b981, 2px 0 #f97316',
      '2px 0 #10b981, -2px 0 #f97316',
    ],
    transition: {
      duration: 0.3,
    },
  },
}

export const pulseVariants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
}

export const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}
