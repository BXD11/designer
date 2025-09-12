'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { 
  Download,
  Eye,
  Heart,
  Share2,
  Filter,
  Search,
  Grid3X3,
  List,
  Calendar,
  Image,
  FileText,
  Palette,
  Star,
  X,
  ExternalLink,
  Copy,
  CheckCircle
} from 'lucide-react'

// Mock data for library items
const mockLibraryItems = [
  {
    id: '1',
    title: 'لوجو شركة التقنية المتقدمة',
    type: 'LOGO',
    thumbnail: '/design1.jpg',
    downloadUrl: '/downloads/logo1.zip',
    createdAt: new Date('2024-01-10'),
    size: '2.3 MB',
    format: 'PNG, SVG, AI',
    dimensions: '500x500',
    isFavorite: true,
    designer: {
      name: 'أحمد محمد',
      profileUrl: 'https://behance.net/designer1'
    }
  },
  {
    id: '2',
    title: 'ثامبنيل قناة اليوتيوب',
    type: 'YOUTUBE_THUMBNAIL',
    thumbnail: '/design2.jpg',
    downloadUrl: '/downloads/thumbnail1.jpg',
    createdAt: new Date('2024-01-08'),
    size: '1.8 MB',
    format: 'JPG',
    dimensions: '1280x720',
    isFavorite: false,
    designer: {
      name: 'سارة أحمد',
      profileUrl: 'https://behance.net/designer2'
    }
  },
  {
    id: '3',
    title: 'بوست انستجرام - حملة إعلانية',
    type: 'INSTAGRAM_POST',
    thumbnail: '/design3.jpg',
    downloadUrl: '/downloads/instagram1.jpg',
    createdAt: new Date('2024-01-05'),
    size: '956 KB',
    format: 'JPG',
    dimensions: '1080x1080',
    isFavorite: true,
    designer: {
      name: 'محمد علي',
      profileUrl: 'https://behance.net/designer3'
    }
  },
  {
    id: '4',
    title: 'كارت شخصي احترافي',
    type: 'BUSINESS_CARD',
    thumbnail: '/design4.jpg',
    downloadUrl: '/downloads/card1.pdf',
    createdAt: new Date('2024-01-03'),
    size: '3.2 MB',
    format: 'PDF, AI',
    dimensions: '85x55mm',
    isFavorite: false,
    designer: {
      name: 'أحمد محمد',
      profileUrl: 'https://behance.net/designer1'
    }
  },
  {
    id: '5',
    title: 'فلاير إعلاني A4',
    type: 'FLYER_A4',
    thumbnail: '/design5.jpg',
    downloadUrl: '/downloads/flyer1.pdf',
    createdAt: new Date('2023-12-28'),
    size: '5.6 MB',
    format: 'PDF',
    dimensions: '210x297mm',
    isFavorite: false,
    designer: {
      name: 'سارة أحمد',
      profileUrl: 'https://behance.net/designer2'
    }
  }
]

const typeFilters = [
  { value: 'all', label: 'جميع التصاميم', icon: Grid3X3 },
  { value: 'LOGO', label: 'شعارات', icon: Palette },
  { value: 'YOUTUBE_THUMBNAIL', label: 'ثامبنيل يوتيوب', icon: Image },
  { value: 'INSTAGRAM_POST', label: 'بوستات', icon: Image },
  { value: 'BUSINESS_CARD', label: 'كروت', icon: FileText },
  { value: 'FLYER_A4', label: 'فلايرات', icon: FileText },
]

export default function LibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [favorites, setFavorites] = useState<string[]>(['1', '3'])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredItems = mockLibraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesType
  })

  const handleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    )
  }

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`https://designplatform.com/library/${id}`)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownload = (item: any) => {
    // Simulate download
    console.log('Downloading:', item.title)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100 dark:from-gray-900 dark:via-gray-900 dark:to-sky-950/20">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 -top-48 -right-48 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-sky-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">مكتبتي</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              جميع تصاميمك المكتملة في مكان واحد، جاهزة للتحميل والمشاركة
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8 mb-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{mockLibraryItems.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي التصاميم</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{favorites.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">المفضلة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-sky-500">15.3 MB</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي الحجم</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="px-4 pb-16">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-4 rounded-xl mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في المكتبة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>

              {/* View Mode */}
              <div className="flex gap-2">
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Type Filters */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {typeFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterType === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(filter.value)}
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    filterType === filter.value ? 'bg-sky-500 text-white' : ''
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Library Grid/List */}
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">لا توجد تصاميم</h3>
              <p className="text-gray-600 dark:text-gray-400">
                لم يتم العثور على تصاميم مطابقة للبحث
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-sky-400 to-blue-600 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Palette className="w-16 h-16 text-white/30" />
                    </div>
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8 bg-white/20 backdrop-blur text-white hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleFavorite(item.id)
                            }}
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'fill-current text-red-500' : ''}`} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8 bg-white/20 backdrop-blur text-white hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCopyLink(item.id)
                            }}
                          >
                            {copiedId === item.id ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8 bg-white/20 backdrop-blur text-white hover:bg-white/30"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownload(item)
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-1">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <span>{item.format}</span>
                      <span>{item.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {item.designer.name.charAt(0)}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {item.designer.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedItem.dimensions} • {selectedItem.format} • {selectedItem.size}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedItem(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800">
                <div className="aspect-video bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Palette className="w-32 h-32 text-white/30" />
                </div>
              </div>

              {/* Info & Actions */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      {selectedItem.designer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedItem.designer.name}</p>
                      <a
                        href={selectedItem.designer.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-sky-500 hover:text-sky-600 flex items-center gap-1"
                      >
                        عرض الملف الشخصي
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 inline ml-1" />
                    {selectedItem.createdAt.toLocaleDateString('ar-SA')}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="glow"
                    className="flex-1"
                    onClick={() => handleDownload(selectedItem)}
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تحميل التصميم
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleFavorite(selectedItem.id)}
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(selectedItem.id) ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleCopyLink(selectedItem.id)}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}