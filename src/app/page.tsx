'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DesignRequestForm } from '@/components/design-request-form'
import { RequestsGrid } from '@/components/requests-grid'
import { Header } from '@/components/header'
import { StatsCards } from '@/components/stats-cards'
import { GalleryShowcase } from '@/components/gallery-showcase'
import { DesignerCard } from '@/components/designer-card'
import { soundManager } from '@/hooks/useSound'
import type { Designer } from '@/types'
import { 
  Sparkles, 
  Palette, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  MousePointer2,
  Volume2,
  VolumeX
} from 'lucide-react'

// Mock designers data
const mockDesigners: Designer[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    bio: 'مصمم جرافيك محترف متخصص في تصميم الهويات البصرية والشعارات',
    specialties: ['لوجو', 'هوية بصرية', 'UI/UX'],
    rating: 4.9,
    totalProjects: 156,
    profileUrl: 'https://behance.net/designer1',
    socialLinks: {
      behance: 'https://behance.net/designer1',
      dribbble: 'https://dribbble.com/designer1',
      instagram: 'https://instagram.com/designer1'
    },
    badges: [
      { id: 'verified', name: 'موثق', icon: '✓', color: 'bg-blue-500', description: 'مصمم موثق' },
      { id: 'top', name: 'الأفضل', icon: '👑', color: 'bg-yellow-500', description: 'أفضل مصمم' }
    ]
  },
  {
    id: '2',
    name: 'سارة أحمد',
    bio: 'مصممة UI/UX متخصصة في تصميم واجهات المستخدم',
    specialties: ['UI/UX', 'تطبيقات', 'مواقع'],
    rating: 4.8,
    totalProjects: 98,
    profileUrl: 'https://behance.net/designer2',
    socialLinks: {
      behance: 'https://behance.net/designer2',
      dribbble: 'https://dribbble.com/designer2'
    },
    badges: [
      { id: 'trending', name: 'شائع', icon: '🔥', color: 'bg-orange-500', description: 'مصمم شائع' }
    ]
  },
  {
    id: '3',
    name: 'محمد علي',
    bio: 'خبير في تصميم المطبوعات والفلايرات',
    specialties: ['مطبوعات', 'فلايرات', 'كتب'],
    rating: 4.7,
    totalProjects: 210,
    profileUrl: 'https://behance.net/designer3',
    socialLinks: {
      instagram: 'https://instagram.com/designer3',
      website: 'https://designer3.com'
    },
    badges: [
      { id: 'verified', name: 'موثق', icon: '✓', color: 'bg-blue-500', description: 'مصمم موثق' }
    ]
  }
]

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [currentSection, setCurrentSection] = useState('hero')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Toggle sound
  useEffect(() => {
    soundManager.setEnabled(soundEnabled)
  }, [soundEnabled])

  const handleButtonClick = () => {
    soundManager.play('click')
    setShowForm(true)
  }

  const handleButtonHover = () => {
    soundManager.play('hover')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border-2 border-sky-400 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-sky-400 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 2000, damping: 40 }}
      />

      <Header />
      
      {/* Sound Toggle Button */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 left-8 z-40 w-12 h-12 rounded-full glass flex items-center justify-center group hover:scale-110 transition-transform"
        onClick={() => setSoundEnabled(!soundEnabled)}
        onMouseEnter={handleButtonHover}
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-sky-500" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-500" />
        )}
        <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {soundEnabled ? 'إيقاف الصوت' : 'تشغيل الصوت'}
        </span>
      </motion.button>
      
      {/* Hero Section with Advanced Effects */}
      <section className="relative px-4 py-20 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 via-transparent to-purple-600/10 animate-gradient" />
        
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(14,165,233,0.${i + 1}) 0%, transparent 70%)`,
                left: `${20 * i}%`,
                top: `${10 * i}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full"
            >
              <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
              <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
                منصة التصميم الاحترافية الأولى
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="gradient-text inline-block hover:scale-105 transition-transform">
                تصاميم إبداعية
              </span>
              <br />
              <motion.span 
                className="text-gray-800 dark:text-white inline-block"
                whileHover={{ scale: 1.05 }}
              >
                بلمسة سحرية
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              احصل على تصاميم احترافية مذهلة لجميع احتياجاتك الرقمية مع نظام تتبع متقدم ومكتبة شخصية لأعمالك
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                variant="glow"
                onClick={handleButtonClick}
                onMouseEnter={handleButtonHover}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Palette className="w-5 h-5 ml-2" />
                  ابدأ طلبك الآن
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-[-4px] transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ type: 'tween' }}
                />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onMouseEnter={handleButtonHover}
                className="group"
              >
                <Star className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" />
                استعرض الأعمال
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mt-20"
          >
            {[
              {
                icon: Zap,
                title: 'سرعة فائقة',
                description: 'احصل على تصميمك في وقت قياسي',
                color: 'from-yellow-400 to-orange-400',
                delay: 0.1
              },
              {
                icon: Palette,
                title: 'إبداع لا محدود',
                description: 'تصاميم فريدة تلبي رؤيتك',
                color: 'from-sky-400 to-blue-500',
                delay: 0.2
              },
              {
                icon: CheckCircle,
                title: 'جودة مضمونة',
                description: 'معايير احترافية عالية',
                color: 'from-green-400 to-emerald-500',
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + feature.delay }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                onMouseEnter={handleButtonHover}
                className="glass p-6 rounded-2xl group cursor-pointer relative overflow-hidden"
                style={{ perspective: 1000 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(14,165,233,0.1))`,
                  }}
                />
                
                <motion.div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
                
                {/* Hover particles */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-sky-400 rounded-full"
                      initial={{ x: '50%', y: '100%' }}
                      animate={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Decorative Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-sky-400 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-32 h-32 bg-sky-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-transparent to-sky-50 dark:to-sky-950/20">
        <div className="container mx-auto max-w-7xl">
          <StatsCards />
        </div>
      </section>

      {/* Featured Designers Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">نخبة من المصممين المحترفين</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              تعرف على أفضل المصممين واستعرض أعمالهم المميزة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDesigners.map((designer, index) => (
              <motion.div
                key={designer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DesignerCard 
                  designer={designer} 
                  featured={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Showcase Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-transparent to-sky-50 dark:to-sky-950/20">
        <div className="container mx-auto max-w-7xl">
          <GalleryShowcase />
        </div>
      </section>

      {/* Recent Requests */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="gradient-text">أحدث الطلبات</span>
          </motion.h2>
          <RequestsGrid />
        </div>
      </section>

      {/* Design Request Modal */}
      {showForm && (
        <DesignRequestForm onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}