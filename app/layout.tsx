import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mohssine Frid | Backend Engineer & Software Architect',
  description: 'Backend engineer specializing in microservices architecture, Java Spring Boot, and distributed systems. Intern at ShiftBricks. Explore my projects and experience.',
  generator: 'v0.app',
  keywords: ['backend', 'engineer', 'java', 'spring boot', 'microservices', 'distributed systems', 'architecture'],
  openGraph: {
    title: 'Mohssine Frid | Backend Engineer',
    description: 'Backend engineer specializing in microservices and distributed systems',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0e27',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
