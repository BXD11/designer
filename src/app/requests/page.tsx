'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { RequestCard } from '@/components/request-card'
import { 
  Plus,
  Filter,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Download,
  Grid3X3,
  List,
  SortDesc
} from 'lucide-react'
import { DesignRequestForm } from '@/components/design-request-form'

// Mock data for requests
const mockRequests = [
  {
    id: '1',
    title: 'تصميم لوجو لشركة تقنية',
    designType: 'LOGO',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-01-15'),
    progress: 65,
    thumbnail: null,
    priority: 'HIGH' as const,
    deadline: new Date('2024-01-30'),
    designer: 'أحمد محمد'
  },
  {
    id: '2',
    title: 'ثامبنيل فيديو يوتيوب',
    designType: 'YOUTUBE_THUMBNAIL',
    status: 'DELIVERED',
    createdAt: new Date('2024-01-14'),
    progress: 100,
    thumbnail: null,
    priority: 'MEDIUM' as const,
    deadline: new Date('2024-01-20'),
    designer: 'سارة أحمد'
  },
  {
    id: '3',
    title: 'بوست انستجرام ترويجي',
    designType: 'INSTAGRAM_POST',
    status: 'UNDER_REVIEW',
    createdAt: new Date('2024-01-13'),
    progress: 30,
    thumbnail: null,
    priority: 'LOW' as const,
    deadline: new Date('2024-01-25'),
    designer: 'محمد علي'
  },
  {
    id: '4',
    title: 'كارت شخصي احترافي',
    designType: 'BUSINESS_CARD',
    status: 'READY_FOR_DELIVERY',
    createdAt: new Date('2024-01-12'),
    progress: 90,
    thumbnail: null,
    priority: 'URGENT' as const,
    deadline: new Date('2024-01-18'),
    designer: 'أحمد محمد'
  },
  {
    id: '5',
    title: 'تصميم فلاير إعلاني',
    designType: 'FLYER_A4',
    status: 'RECEIVED',
    createdAt: new Date('2024-01-11'),
    progress: 0,
    thumbnail: null,
    priority: 'MEDIUM' as const,
    deadline: new Date('2024-01-28'),
    designer: null
  }
]

const statusFilters = [
  { value: 'all', label: 'جميع الطلبات', icon: Grid3X3, color: 'text-gray-600' },
  { value: 'RECEIVED', label: 'تم الاستلام', icon: Clock, color: 'text-blue-500' },
  { value: 'UNDER_REVIEW', label: 'قيد المراجعة', icon: AlertCircle, color: 'text-amber-500' },
  { value: 'IN_PROGRESS', label: 'تحت التنفيذ', icon: RefreshCw, color: 'text-sky-500' },
  { value: 'READY_FOR_DELIVERY', label: 'جاهز للتسليم', icon: CheckCircle, color: 'text-emerald-500' },
  { value: 'DELIVERED', label: 'تم التسليم', icon: CheckCircle, color: 'text-green-500' },
]

export default function RequestsPage() {
  const [showForm, setShowForm] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === 'recent') return b.createdAt.getTime() - a.createdAt.getTime()
    if (sortBy === 'deadline') return a.deadline.getTime() - b.deadline.getTime()
    if (sortBy === 'progress') return b.progress - a.progress
    return 0
  })

  const stats = {
    total: mockRequests.length,
    inProgress: mockRequests.filter(r => r.status === 'IN_PROGRESS').length,
    completed: mockRequests.filter(r => r.status === 'DELIVERED').length,
    pending: mockRequests.filter(r => r.status === 'RECEIVED' || r.status === 'UNDER_REVIEW').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-100 dark:from-gray-900 dark:via-gray-900 dark:to-sky-950/20">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-sky-400/10 rounded-full blur-3xl" />
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">طلباتي</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              تابع جميع طلباتك ومراحل تنفيذها في مكان واحد
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-3xl font-bold gradient-text">{stats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي الطلبات</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-sky-500">{stats.inProgress}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">قيد التنفيذ</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-green-500">{stats.completed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">مكتملة</div>
            </div>
            <div className="glass p-4 rounded-xl text-center">
              <div className="text-3xl font-bold text-amber-500">{stats.pending}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">في الانتظار</div>
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
                  placeholder="البحث في الطلبات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                >
                  <option value="recent">الأحدث</option>
                  <option value="deadline">الموعد النهائي</option>
                  <option value="progress">نسبة الإنجاز</option>
                </select>

                {/* View Mode */}
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

                {/* New Request Button */}
                <Button
                  variant="glow"
                  onClick={() => setShowForm(true)}
                  className="hidden md:flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  طلب جديد
                </Button>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterStatus === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(filter.value)}
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    filterStatus === filter.value ? 'bg-sky-500 text-white' : ''
                  }`}
                >
                  <filter.icon className={`w-4 h-4 ${filter.color}`} />
                  {filter.label}
                  {filter.value !== 'all' && (
                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">
                      {mockRequests.filter(r => r.status === filter.value).length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Requests Grid/List */}
          {sortedRequests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">لا توجد طلبات</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {searchQuery ? 'لم يتم العثور على طلبات مطابقة للبحث' : 'ابدأ بإنشاء طلبك الأول'}
              </p>
              <Button variant="glow" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 ml-2" />
                إنشاء طلب جديد
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {sortedRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <RequestCard request={request} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Mobile New Request Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-8 right-8 md:hidden"
          >
            <Button
              variant="glow"
              size="lg"
              className="rounded-full shadow-2xl"
              onClick={() => setShowForm(true)}
            >
              <Plus className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Design Request Modal */}
      {showForm && (
        <DesignRequestForm onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}