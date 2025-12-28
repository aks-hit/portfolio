import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ClientLayout from '@/components/ClientLayout'
import { Analytics } from '@vercel/analytics/next'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Akshit Singh - AI Developer & ML Engineer',
  description: 'Portfolio of Akshit Singh - Oracle Certified Data Science & GenAI Professional',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
