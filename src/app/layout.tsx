import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { ParticlesBackground } from '@/components/particles-background'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'منصة طلبات التصميم | Design Request Platform',
  description: 'منصة احترافية لإدارة طلبات التصميم الجرافيكي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 dark:from-sky-950 dark:via-gray-900 dark:to-sky-900"
      )}>
        <Providers>
          <ParticlesBackground />
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 10px 40px rgba(14, 165, 233, 0.3)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}