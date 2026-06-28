'use client'

import Image from 'next/image'

interface FacePlaceholderProps {
  size?: 'hero' | 'header'
}

export function FacePlaceholder({ size = 'hero' }: FacePlaceholderProps) {
  const isHero = size === 'hero'
  const sizeClasses = isHero ? 'w-40 h-40' : 'w-12 h-12'
  const borderClasses = isHero ? 'border-2' : 'border'

  return (
    <div className={`relative rounded-full overflow-hidden flex-shrink-0 ${sizeClasses} ${borderClasses} border-[#10b981]/40 bg-gradient-to-br from-[#10b981]/10 to-[#06b6d4]/10`}>
      <Image
        src="/images/my_face.png"
        alt="Profile"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
