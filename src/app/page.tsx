'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DesignRequestForm } from '@/components/design-request-form'
import { RequestsGrid } from '@/components/requests-grid'
import { Header } from '@/components/header'
import { StatsCards } from '@/components/stats-cards'
import { GalleryShowcase } from '@/components/gallery-showcase'
import { DesignerCard } from '@/components/designer-card'
import type { Designer } from '@/types'
import { 
  Sparkles, 
  Palette, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  Send,
  MessageCircle
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

  return (
    <div className="min-h-screen relative">
      <Header />
      
      {/* Quick Contact Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 left-8 z-40"
      >
        <Button
          variant="glow"
          size="lg"
          className="rounded-full shadow-2xl hover:scale-110 transition-transform"
          onClick={() => window.location.href = '/messages?new=quick'}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
      
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-20 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-sky-100 dark:from-sky-950/20 dark:via-gray-900 dark:to-sky-900/20" />
        
        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)`,
                left: `${i * 30}%`,
                top: `${i * 20}%`,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20 + i * 5,
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
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="gradient-text">تصاميم إبداعية</span>
              <br />
              <span className="text-gray-800 dark:text-white">
                بلمسة سحرية
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
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
                onClick={() => setShowForm(true)}
                className="group"
              >
                <Palette className="w-5 h-5 ml-2" />
                ابدأ طلبك الآن
                <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-[-4px] transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.location.href = '/library'}
                className="group"
              >
                <Star className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" />
                استعرض الأعمال
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mt-20"
          >
            {[
              {
                icon: Zap,
                title: 'سرعة فائقة',
                description: 'احصل على تصميمك في وقت قياسي',
                color: 'from-yellow-400 to-orange-400',
              },
              {
                icon: Palette,
                title: 'إبداع لا محدود',
                description: 'تصاميم فريدة تلبي رؤيتك',
                color: 'from-sky-400 to-blue-500',
              },
              {
                icon: CheckCircle,
                title: 'جودة مضمونة',
                description: 'معايير احترافية عالية',
                color: 'from-green-400 to-emerald-500',
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl group cursor-pointer"
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
            className="text-3xl md:text-4xl font-bold text-center mb-12"
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