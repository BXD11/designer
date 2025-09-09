'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Star, 
  Award, 
  ExternalLink, 
  Eye,
  Heart,
  MessageCircle,
  Sparkles,
  Trophy,
  Zap,
  Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Designer } from '@/types'

interface DesignerCardProps {
  designer: Designer
  featured?: boolean
}

export function DesignerCard({ designer, featured = false }: DesignerCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000))
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'top': return Crown
      case 'verified': return Award
      case 'trending': return Zap
      default: return Trophy
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group ${featured ? 'col-span-2 row-span-2' : ''}`}
    >
      {/* Glow Effect */}
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
      )}

      <div className={`
        relative glass rounded-2xl overflow-hidden
        ${featured ? 'p-8' : 'p-6'}
        ${isHovered ? 'shadow-[0_0_50px_rgba(14,165,233,0.3)]' : ''}
        transition-all duration-500
      `}>
        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-sky-400 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: 100 + '%',
                  opacity: 0 
                }}
                animate={{ 
                  y: -20 + '%',
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar with animation */}
            <motion.div
              animate={isHovered ? { rotate: [0, -5, 5, -5, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className={`
                ${featured ? 'w-20 h-20' : 'w-16 h-16'}
                rounded-full bg-gradient-to-br from-sky-400 to-blue-600
                flex items-center justify-center text-white font-bold text-2xl
                shadow-lg group-hover:shadow-sky-400/50 transition-shadow
              `}>
                {designer.name.charAt(0)}
              </div>
              
              {/* Status Indicator */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              
              {/* Rating Stars */}
              <div className="absolute -top-2 -right-2">
                <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {designer.rating}
                </div>
              </div>
            </motion.div>

            <div>
              <h3 className={`font-bold ${featured ? 'text-2xl' : 'text-lg'} gradient-text`}>
                {designer.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {designer.specialties.join(' • ')}
              </p>
              
              {/* Badges */}
              <div className="flex gap-2 mt-2">
                {designer.badges?.map((badge, index) => {
                  const Icon = getBadgeIcon(badge.id)
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center
                        ${badge.color} shadow-lg
                      `}
                      title={badge.description}
                    >
                      <Icon className="w-3 h-3 text-white" />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={isLiked ? 'text-red-500' : ''}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bio */}
        {designer.bio && (
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
            {designer.bio}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">
              {designer.totalProjects}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              مشاريع
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">
              {likes}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              إعجاب
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text">
              {Math.floor(Math.random() * 5000)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              مشاهدة
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {designer.socialLinks?.behance && (
              <motion.a
                href={designer.socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                B
              </motion.a>
            )}
            {designer.socialLinks?.dribbble && (
              <motion.a
                href={designer.socialLinks.dribbble}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                D
              </motion.a>
            )}
            {designer.socialLinks?.instagram && (
              <motion.a
                href={designer.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                I
              </motion.a>
            )}
          </div>

          <Button 
            variant="glow" 
            size="sm"
            className="group"
            onClick={() => window.open(designer.profileUrl, '_blank')}
          >
            <Eye className="w-4 h-4 ml-2" />
            عرض الملف
            <ExternalLink className="w-3 h-3 mr-2 group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
          </Button>
        </div>

        {/* Holographic Effect on Hover */}
        {isHovered && featured && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent skew-x-12 translate-x-[-200%] animate-shimmer" />
          </motion.div>
        )}

        {/* Corner Badge for Featured */}
        {featured && (
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-4"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3" />
              مميز
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}