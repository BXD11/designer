'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DesignRequestForm } from '@/components/design-request-form'
import { RequestsGrid } from '@/components/requests-grid'
import { Header } from '@/components/header'
import { StatsCards } from '@/components/stats-cards'
import { 
  Sparkles, 
  Palette, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-sky-100 dark:bg-sky-900/30 rounded-full">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
                منصة التصميم الاحترافية
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">تصاميم إبداعية</span>
              <br />
              <span className="text-gray-800 dark:text-white">بلمسة سحرية</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              احصل على تصاميم احترافية مذهلة لجميع احتياجاتك الرقمية مع نظام تتبع متقدم ومكتبة شخصية لأعمالك
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              
              <Button size="lg" variant="outline">
                <Star className="w-5 h-5 ml-2" />
                استعرض الأعمال
              </Button>
            </div>
          </motion.div>

          {/* Features */}
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
                color: 'from-yellow-400 to-orange-400'
              },
              {
                icon: Palette,
                title: 'إبداع لا محدود',
                description: 'تصاميم فريدة تلبي رؤيتك',
                color: 'from-sky-400 to-blue-500'
              },
              {
                icon: CheckCircle,
                title: 'جودة مضمونة',
                description: 'معايير احترافية عالية',
                color: 'from-green-400 to-emerald-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-2xl group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
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

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-sky-400 rounded-full blur-3xl opacity-30 floating" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-sky-500 rounded-full blur-3xl opacity-20 floating" style={{ animationDelay: '1s' }} />
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 bg-gradient-to-b from-transparent to-sky-50 dark:to-sky-950/20">
        <div className="container mx-auto max-w-7xl">
          <StatsCards />
        </div>
      </section>

      {/* Recent Requests */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">أحدث الطلبات</span>
          </h2>
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