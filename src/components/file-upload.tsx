'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  X, 
  FileImage, 
  FileText, 
  File,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

export function FileUpload({ 
  onFilesSelected, 
  maxFiles = 5,
  acceptedTypes = ['image/*', 'application/pdf']
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }, [files, maxFiles, onFilesSelected])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: maxFiles - files.length,
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return FileImage
    if (file.type === 'application/pdf') return FileText
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer
          ${isDragActive 
            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30' 
            : 'border-gray-300 dark:border-gray-600 hover:border-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-950/20'
          }
        `}
      >
        <input {...getInputProps()} />
        
        {/* Glow effect when dragging */}
        {isDragActive && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400/20 to-sky-500/20 animate-pulse" />
        )}
        
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center mb-4
            ${isDragActive 
              ? 'bg-sky-500 animate-bounce' 
              : 'bg-gradient-to-r from-sky-400 to-sky-500'
            }
          `}>
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
            {isDragActive ? 'أفلت الملفات هنا' : 'اسحب الملفات هنا أو انقر للاختيار'}
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            يمكنك رفع حتى {maxFiles} ملفات (صور، PDF)
          </p>
          
          {files.length > 0 && (
            <p className="text-sm text-sky-600 dark:text-sky-400 mt-2">
              {files.length} من {maxFiles} ملفات مرفوعة
            </p>
          )}
        </div>
      </div>

      {/* Files List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            {files.map((file, index) => {
              const Icon = getFileIcon(file)
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-3 rounded-lg flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-400 to-sky-500 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}