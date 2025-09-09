'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Heart, 
  Download, 
  Share2, 
  Maximize2,
  X,
  Sparkles,
  Palette,
  Clock,
  User,
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DesignWork, Designer } from '@/types'

// Mock designer data
const mockDesigner: Designer = {
  id: '1',
  name: 'أحمد محمد',
  avatar: '/avatar.jpg',
  bio: 'مصمم جرافيك محترف متخصص في تصميم الهويات البصرية',
  specialties: ['لوجو', 'هوية بصرية', 'UI/UX'],
  rating: 4.9,
  totalProjects: 156,
  profileUrl: 'https://behance.net/designer',
  socialLinks: {
    behance: 'https://behance.net/designer',
    dribbble: 'https://dribbble.com/designer',
    instagram: 'https://instagram.com/designer'
  },
  badges: [
    { id: 'verified', name: 'موثق', icon: '✓', color: 'bg-blue-500', description: 'مصمم موثق' },
    { id: 'top', name: 'الأفضل', icon: '👑', color: 'bg-yellow-500', description: 'أفضل مصمم لهذا الشهر' }
  ]
}

// Mock works data
const mockWorks: DesignWork[] = [
  {
    id: '1',
    title: 'تصميم هوية بصرية لشركة تقنية',
    description: 'هوية بصرية كاملة تتضمن اللوجو والألوان والخطوط',
    imageUrl: '/design1.jpg',
    designer: mockDesigner,
    designType: 'LOGO',
    createdAt: new Date(),
    projectUrl: 'https://behance.net/project1',
    likes: 342,
    views: 1523,
    tags: ['هوية بصرية', 'تقنية', 'حديث'],
    status: 'featured',
    animations: [
      { type: 'particle', intensity: 0.5 },
      { type: 'glow', intensity: 0.8, color: '#0ea5e9' }
    ]
  },
  // Add more mock works as needed
]

export function GalleryShowcase() {
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null)
  const [filter, setFilter] = useState('all')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [autoPlay, setAutoPlay] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likes, setLikes] = useState<{ [key: string]: number }>({})

  // Auto-play slideshow
  useEffect(() => {
    if (autoPlay && !selectedWork) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mockWorks.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [autoPlay, selectedWork])

  // Play sound effect
  const playSound = (type: 'hover' | 'click' | 'success') => {
    if (!soundEnabled) return
    // Sound implementation would go here
  }

  const handleLike = (workId: string) => {
    setLikes(prev => ({
      ...prev,
      [workId]: (prev[workId] || 0) + 1
    }))
    playSound('success')
  }

  return (
    <div className="relative">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold gradient-text">معرض الأعمال السحري</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="relative"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAutoPlay(!autoPlay)}
            >
              {autoPlay ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {['all', 'featured', 'recent', 'popular'].map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? 'glow' : 'outline'}
              size="sm"
              onClick={() => setFilter(tab)}
              className="relative"
            >
              {tab === 'featured' && <Sparkles className="w-4 h-4 ml-2" />}
              {tab === 'all' && 'الكل'}
              {tab === 'featured' && 'المميز'}
              {tab === 'recent' && 'الأحدث'}
              {tab === 'popular' && 'الأكثر شعبية'}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="wait">
          {mockWorks.map((work, index) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateY: 0,
                transition: { delay: index * 0.1 }
              }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              onHoverStart={() => playSound('hover')}
              onClick={() => {
                setSelectedWork(work)
                playSound('click')
              }}
              className="relative group cursor-pointer"
              style={{ perspective: 1000 }}
            >
              {/* 3D Card Container */}
              <div className="relative preserve-3d transition-transform duration-500">
                {/* Holographic Background */}
                {work.status === 'featured' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 animate-pulse" />
                )}

                {/* Main Card */}
                <div className="relative glass rounded-2xl overflow-hidden shadow-2xl">
                  {/* Image Container */}
                  <div className="relative h-64 bg-gradient-to-br from-sky-400 to-blue-600 overflow-hidden">
                    {/* Placeholder for actual image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Palette className="w-20 h-20 text-white/30" />
                    </div>

                    {/* Animated Particles */}
                    {work.animations?.map((anim, i) => (
                      anim.type === 'particle' && (
                        <div key={i} className="absolute inset-0">
                          {[...Array(10)].map((_, j) => (
                            <motion.div
                              key={j}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              initial={{ 
                                x: Math.random() * 100 + '%',
                                y: Math.random() * 100 + '%'
                              }}
                              animate={{ 
                                x: Math.random() * 100 + '%',
                                y: Math.random() * 100 + '%'
                              }}
                              transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                ease: 'linear'
                              }}
                            />
                          ))}
                        </div>
                      )
                    ))}

                    {/* Overlay with Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white hover:bg-white/20"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleLike(work.id)
                              }}
                            >
                              <Heart className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white hover:bg-white/20"
                            >
                              <Share2 className="w-5 h-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white hover:bg-white/20"
                            >
                              <Download className="w-5 h-5" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                          >
                            <Maximize2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {work.status === 'featured' && (
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                      >
                        <Sparkles className="w-3 h-3" />
                        مميز
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">
                      {work.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {work.description}
                    </p>

                    {/* Designer Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {work.designer.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{work.designer.name}</p>
                        <p className="text-xs text-gray-500">{work.designer.specialties[0]}</p>
                      </div>
                      <a
                        href={work.designer.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sky-500 hover:text-sky-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {work.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {work.likes + (likes[work.id] || 0)}
                        </span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        منذ 3 أيام
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {work.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              {work.animations?.some(a => a.type === 'glow') && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(14,165,233,0)',
                      '0 0 40px rgba(14,165,233,0.5)',
                      '0 0 20px rgba(14,165,233,0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedWork(null)}
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Content */}
              <div className="grid md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-[60vh] md:h-auto bg-gradient-to-br from-sky-400 to-blue-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Palette className="w-32 h-32 text-white/30" />
                  </div>
                </div>

                {/* Info Side */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold mb-4">{selectedWork.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {selectedWork.description}
                  </p>

                  {/* Designer Section */}
                  <div className="glass p-6 rounded-xl mb-6">
                    <h3 className="text-lg font-semibold mb-4">المصمم</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                        {selectedWork.designer.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-lg">{selectedWork.designer.name}</p>
                        <p className="text-sm text-gray-500">{selectedWork.designer.bio}</p>
                        <div className="flex gap-2 mt-2">
                          {selectedWork.designer.socialLinks?.behance && (
                            <a
                              href={selectedWork.designer.socialLinks.behance}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sky-500 hover:text-sky-600"
                            >
                              Behance
                            </a>
                          )}
                          {selectedWork.designer.socialLinks?.dribbble && (
                            <a
                              href={selectedWork.designer.socialLinks.dribbble}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-500 hover:text-pink-600"
                            >
                              Dribbble
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="glow" className="flex-1">
                      <Heart className="w-5 h-5 ml-2" />
                      إعجاب ({selectedWork.likes + (likes[selectedWork.id] || 0)})
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-5 h-5 ml-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline">
                      <Download className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {selectedWork.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}