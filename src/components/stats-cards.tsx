'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock,
  Palette,
  Star
} from 'lucide-react'

const stats = [
  {
    title: 'إجمالي الطلبات',
    value: '1,234',
    change: '+12%',
    icon: Palette,
    color: 'from-sky-500 to-sky-400',
    bgColor: 'bg-sky-50 dark:bg-sky-950/30'
  },
  {
    title: 'طلبات مكتملة',
    value: '945',
    change: '+8%',
    icon: CheckCircle,
    color: 'from-green-500 to-emerald-400',
    bgColor: 'bg-green-50 dark:bg-green-950/30'
  },
  {
    title: 'قيد التنفيذ',
    value: '87',
    change: '+23%',
    icon: Clock,
    color: 'from-amber-500 to-orange-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30'
  },
  {
    title: 'تقييم العملاء',
    value: '4.9',
    change: '⭐⭐⭐⭐⭐',
    icon: Star,
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/30'
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="glass p-6 rounded-2xl group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <div className={`w-full h-full rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            {stat.change.includes('%') ? (
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            ) : (
              <span className="text-sm">{stat.change}</span>
            )}
          </div>
          
          <h3 className="text-3xl font-bold mb-1 gradient-text">
            {stat.value}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {stat.title}
          </p>
          
          {/* Progress bar */}
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              className={`h-full bg-gradient-to-r ${stat.color}`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}