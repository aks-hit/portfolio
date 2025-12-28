import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CursorFollower from '@/components/CursorFollower'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ClientLayout from '@/components/ClientLayout';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Akshit Singh - AI Developer & ML Engineer',
  description: 'Portfolio of Akshit Singh - Oracle Certified Data Science & GenAI Professional, GATE 2025 Qualified (Top 9%)',
  keywords: ['AI Developer', 'Machine Learning', 'Data Science', 'GenAI', 'Portfolio'],
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>           {/* Theme context wraps everything */}
          <ClientLayout>          {/* Client components inside provider */}
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}