'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/file-upload'
import toast from 'react-hot-toast'
import {
  X,
  Image,
  Youtube,
  Facebook,
  Instagram,
  Briefcase,
  User,
  Globe,
  CreditCard,
  FileText,
  Sparkles,
  ArrowRight,
  Check
} from 'lucide-react'

const designTypes = [
  { id: 'YOUTUBE_THUMBNAIL', label: 'ثامبنيل يوتيوب', icon: Youtube, size: '1280×720px', color: 'from-red-500 to-red-400' },
  { id: 'FACEBOOK_POST', label: 'بوست فيسبوك', icon: Facebook, size: '1200×630px', color: 'from-blue-600 to-blue-500' },
  { id: 'INSTAGRAM_POST', label: 'بوست إنستجرام', icon: Instagram, size: '1080×1080px', color: 'from-purple-500 to-pink-500' },
  { id: 'LOGO', label: 'لوجو احترافي', icon: Briefcase, size: '500×500px', color: 'from-green-500 to-emerald-500' },
  { id: 'PROFILE_PICTURE', label: 'صورة شخصية', icon: User, size: '400×400px', color: 'from-sky-500 to-sky-400' },
  { id: 'WEBSITE_BANNER', label: 'بنر موقع', icon: Globe, size: '1920×500px', color: 'from-indigo-500 to-purple-500' },
  { id: 'BUSINESS_CARD', label: 'كارت شخصي', icon: CreditCard, size: '85×55mm', color: 'from-amber-500 to-orange-500' },
  { id: 'FLYER_A4', label: 'فلاير A4', icon: FileText, size: '210×297mm', color: 'from-teal-500 to-cyan-500' },
]

const formSchema = z.object({
  title: z.string().min(3, 'العنوان يجب أن يكون 3 أحرف على الأقل'),
  designType: z.string().min(1, 'يرجى اختيار نوع التصميم'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  requirements: z.string().optional(),
  deadline: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface DesignRequestFormProps {
  onClose: () => void
}

export function DesignRequestForm({ onClose }: DesignRequestFormProps) {
  const [selectedType, setSelectedType] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const watchedType = watch('designType')

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would send the data to your API
      console.log('Form data:', data)
      console.log('Files:', uploadedFiles)
      
      toast.success('تم إرسال طلبك بنجاح! 🎉')
      onClose()
    } catch (error) {
      toast.error('حدث خطأ في إرسال الطلب')
    }
  }

  const selectedDesignType = designTypes.find(type => type.id === selectedType)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-sky-500 to-sky-400 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">طلب تصميم جديد</h2>
                  <p className="text-sky-100">اختر نوع التصميم واملأ التفاصيل</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    currentStep >= step ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Step 1: Choose Design Type */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold mb-4">اختر نوع التصميم</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {designTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedType(type.id)
                        setValue('designType', type.id)
                      }}
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        selectedType === type.id
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-sky-300'
                      }`}
                    >
                      {selectedType === type.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-3 mx-auto`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {type.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {type.size}
                      </p>
                    </motion.button>
                  ))}
                </div>
                {errors.designType && (
                  <p className="text-red-500 text-sm">{errors.designType.message}</p>
                )}
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedType}
                    className="group"
                  >
                    التالي
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-[-4px] transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold mb-4">تفاصيل الطلب</h3>
                
                {selectedDesignType && (
                  <div className="glass p-4 rounded-lg flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${selectedDesignType.color} flex items-center justify-center`}>
                      <selectedDesignType.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedDesignType.label}</p>
                      <p className="text-sm text-gray-500">{selectedDesignType.size}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">عنوان الطلب</label>
                  <input
                    {...register('title')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="مثال: تصميم لوجو لشركة تقنية"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">وصف التصميم</label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                    placeholder="اشرح بالتفصيل ما تريده في التصميم..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">متطلبات خاصة (اختياري)</label>
                  <textarea
                    {...register('requirements')}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                    placeholder="ألوان محددة، خطوط، أسلوب معين..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">الموعد النهائي (اختياري)</label>
                  <input
                    {...register('deadline')}
                    type="date"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    السابق
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="group"
                  >
                    التالي
                    <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-[-4px] transition-transform" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Upload Files */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold mb-4">رفع الملفات المرجعية</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  يمكنك رفع صور أو ملفات مرجعية لتوضيح فكرتك بشكل أفضل
                </p>
                
                <FileUpload
                  onFilesSelected={setUploadedFiles}
                  maxFiles={5}
                />

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    السابق
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="glow"
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <div className="spinner" />
                    ) : (
                      <>
                        <Check className="w-4 h-4 ml-2" />
                        إرسال الطلب
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}