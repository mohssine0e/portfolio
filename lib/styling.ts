// Unified styling constants for consistent portfolio design

export const colors = {
  primary: '#10b981', // Green
  secondary: '#06b6d4', // Cyan
  accent: '#f97316', // Orange
  border: 'border-[#10b981]/40',
  borderLight: 'border-[#10b981]/20',
  textPrimary: 'text-foreground/85',
  textSecondary: 'text-foreground/70',
}

export const spacing = {
  section: 'py-20',
  sectionMobile: 'py-12',
  container: 'max-w-6xl mx-auto px-6',
  gap: 'gap-8',
  gapSmall: 'gap-4',
}

export const borders = {
  default: 'border border-[#10b981]/40',
  light: 'border border-[#10b981]/20',
  thick: 'border-2 border-[#10b981]/40',
  rounded: 'rounded-md',
  roundedLg: 'rounded-lg',
}

export const backgrounds = {
  card: 'bg-gradient-to-br from-[#10b981]/5 to-[#06b6d4]/5',
  cardHover: 'hover:from-[#10b981]/10 hover:to-[#06b6d4]/10',
  section: 'bg-background',
}

export const animations = {
  transition: 'transition-all duration-300 ease-out',
  fadeIn: 'opacity-0 animate-fade-in',
}
