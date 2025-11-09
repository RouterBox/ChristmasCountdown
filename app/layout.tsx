import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Christmas Countdown 🎄',
  description: 'A magical countdown to Christmas morning at 8:00 AM! Watch as the scene fills with festive elements day by day.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="overflow-hidden">{children}</body>
    </html>
  )
}

