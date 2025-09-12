'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Sun, 
  Moon, 
  Bell, 
  User, 
  Menu,
  X,
  Palette,
  Home,
  FolderOpen,
  MessageSquare,
  Settings,
  Send,
  Library
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  const navItems = [
    { icon: Home, label: 'الرئيسية', href: '/' },
    { icon: FolderOpen, label: 'طلباتي', href: '/requests' },
    { icon: Library, label: 'مكتبتي', href: '/library' },
    { icon: MessageSquare, label: 'الرسائل', href: '/messages', badge: notificationCount },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-sky-400 flex items-center justify-center shadow-lg"
            >
              <Palette className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              Design Platform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button 
                  variant={isActive(item.href) ? 'default' : 'ghost'} 
                  className={`flex items-center gap-2 relative ${
                    isActive(item.href) ? 'bg-sky-500 text-white hover:bg-sky-600' : ''
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Contact Button */}
            <Button 
              variant="glow" 
              size="sm" 
              className="hidden md:flex items-center gap-2"
              onClick={() => window.location.href = '/messages?new=contact'}
            >
              <Send className="w-4 h-4" />
              <span>تواصل معنا</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="group"
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
            </Button>

            {/* User Menu */}
            <Button variant="outline" size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-sky-200 dark:border-sky-800"
          >
            {navItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <Button
                  variant={isActive(item.href) ? 'default' : 'ghost'}
                  className={`w-full justify-start mb-1 ${
                    isActive(item.href) ? 'bg-sky-500 text-white' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 ml-2" />
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <span className="mr-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            ))}
            <Button 
              variant="glow" 
              className="w-full mt-2"
              onClick={() => {
                window.location.href = '/messages?new=contact'
                setIsMobileMenuOpen(false)
              }}
            >
              <Send className="w-4 h-4 ml-2" />
              تواصل معنا
            </Button>
          </motion.nav>
        )}
      </div>
    </header>
  )
}