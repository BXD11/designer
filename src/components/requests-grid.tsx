'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { RequestCard } from '@/components/request-card'
import { 
  Filter,
  SortDesc,
  Grid3X3,
  List,
  Search
} from 'lucide-react'

// Mock data - will be replaced with real data from API
const mockRequests = [
  {
    id: '1',
    title: 'تصميم لوجو لشركة تقنية',
    designType: 'LOGO',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-01-15'),
    progress: 65,
    thumbnail: null,
    priority: 'HIGH' as const
  },
  {
    id: '2',
    title: 'ثامبنيل فيديو يوتيوب',
    designType: 'YOUTUBE_THUMBNAIL',
    status: 'DELIVERED',
    createdAt: new Date('2024-01-14'),
    progress: 100,
    thumbnail: null,
    priority: 'MEDIUM' as const
  },
  {
    id: '3',
    title: 'بوست انستجرام ترويجي',
    designType: 'INSTAGRAM_POST',
    status: 'UNDER_REVIEW',
    createdAt: new Date('2024-01-13'),
    progress: 30,
    thumbnail: null,
    priority: 'LOW' as const
  },
  {
    id: '4',
    title: 'كارت شخصي احترافي',
    designType: 'BUSINESS_CARD',
    status: 'READY_FOR_DELIVERY',
    createdAt: new Date('2024-01-12'),
    progress: 90,
    thumbnail: null,
    priority: 'URGENT' as const
  }
]

export function RequestsGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="glass p-4 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4">
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

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            >
              <option value="all">جميع الحالات</option>
              <option value="RECEIVED">تم الاستلام</option>
              <option value="UNDER_REVIEW">قيد المراجعة</option>
              <option value="IN_PROGRESS">تحت التنفيذ</option>
              <option value="READY_FOR_DELIVERY">جاهز للتسليم</option>
              <option value="DELIVERED">تم التسليم</option>
            </select>

            <Button variant="outline" size="icon">
              <SortDesc className="w-4 h-4" />
            </Button>

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
      </div>

      {/* Requests Grid/List */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">لا توجد طلبات</h3>
          <p className="text-gray-600 dark:text-gray-400">
            لم يتم العثور على طلبات مطابقة للبحث
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
        >
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RequestCard request={request} viewMode={viewMode} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}