'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  MessageSquare,
  MoreVertical,
  Palette,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'

interface Request {
  id: string
  title: string
  designType: string
  status: string
  createdAt: Date
  progress: number
  thumbnail: string | null
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
}

interface RequestCardProps {
  request: Request
  viewMode: 'grid' | 'list'
}

const statusConfig = {
  RECEIVED: {
    label: 'تم الاستلام',
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-500'
  },
  UNDER_REVIEW: {
    label: 'قيد المراجعة',
    icon: Eye,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-500'
  },
  IN_PROGRESS: {
    label: 'تحت التنفيذ',
    icon: Palette,
    color: 'text-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-950/30',
    borderColor: 'border-sky-500'
  },
  READY_FOR_DELIVERY: {
    label: 'جاهز للتسليم',
    icon: CheckCircle,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-500'
  },
  DELIVERED: {
    label: 'تم التسليم',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-500'
  }
}

const priorityConfig = {
  LOW: { label: 'منخفض', color: 'bg-gray-500' },
  MEDIUM: { label: 'متوسط', color: 'bg-blue-500' },
  HIGH: { label: 'مرتفع', color: 'bg-orange-500' },
  URGENT: { label: 'عاجل', color: 'bg-red-500 animate-pulse' }
}

const designTypeLabels: Record<string, string> = {
  YOUTUBE_THUMBNAIL: 'ثامبنيل يوتيوب',
  FACEBOOK_POST: 'بوست فيسبوك',
  INSTAGRAM_POST: 'بوست إنستجرام',
  LOGO: 'لوجو',
  PROFILE_PICTURE: 'صورة شخصية',
  WEBSITE_BANNER: 'بنر موقع',
  BUSINESS_CARD: 'كارت شخصي',
  FLYER_A4: 'فلاير A4'
}

export function RequestCard({ request, viewMode }: RequestCardProps) {
  const status = statusConfig[request.status as keyof typeof statusConfig] || statusConfig.RECEIVED
  const priority = priorityConfig[request.priority]
  const StatusIcon = status.icon

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="glass p-4 rounded-xl flex items-center gap-4"
      >
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-lg bg-gradient-to-r from-sky-400 to-sky-500 flex items-center justify-center flex-shrink-0">
          <Palette className="w-10 h-10 text-white" />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{request.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {designTypeLabels[request.designType]} • {format(request.createdAt, 'dd MMM yyyy', { locale: ar })}
              </p>
            </div>
            <div className={`px-2 py-1 rounded-full ${priority.color} text-white text-xs`}>
              {priority.label}
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${request.progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-sky-500 to-sky-400"
                />
              </div>
            </div>
            <span className="text-sm font-medium">{request.progress}%</span>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-lg ${status.bgColor} border ${status.borderColor} flex items-center gap-2`}>
            <StatusIcon className={`w-4 h-4 ${status.color}`} />
            <span className={`text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-sky-400 to-sky-500 overflow-hidden">
        {request.thumbnail ? (
          <img 
            src={request.thumbnail} 
            alt={request.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Palette className="w-16 h-16 text-white/50" />
          </div>
        )}
        
        {/* Priority Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full ${priority.color} text-white text-xs font-medium`}>
          {priority.label}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
              <Eye className="w-4 h-4 ml-1" />
              عرض
            </Button>
            {request.status === 'DELIVERED' && (
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Download className="w-4 h-4 ml-1" />
                تحميل
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {request.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>{designTypeLabels[request.designType]}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{format(request.createdAt, 'dd MMM', { locale: ar })}</span>
          </div>
        </div>

        {/* Status */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${status.bgColor} border ${status.borderColor} mb-3`}>
          <StatusIcon className={`w-4 h-4 ${status.color}`} />
          <span className={`text-sm font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">التقدم</span>
            <span className="font-medium">{request.progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${request.progress}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-sky-500 to-sky-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageSquare className="w-4 h-4 ml-1" />
            محادثة
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}