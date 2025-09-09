// Type definitions for the application

export interface Designer {
  id: string
  name: string
  avatar?: string
  bio?: string
  specialties: string[]
  rating: number
  totalProjects: number
  profileUrl?: string
  socialLinks?: {
    behance?: string
    dribbble?: string
    instagram?: string
    website?: string
  }
  badges?: Badge[]
}

export interface Badge {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export interface DesignWork {
  id: string
  title: string
  description?: string
  imageUrl: string
  thumbnailUrl?: string
  designer: Designer
  designType: string
  createdAt: Date
  projectUrl?: string
  likes: number
  views: number
  tags: string[]
  status: 'draft' | 'published' | 'featured'
  animations?: AnimationEffect[]
}

export interface AnimationEffect {
  type: 'particle' | 'glow' | 'float' | 'morph' | 'hologram'
  intensity: number
  color?: string
  duration?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
  progress: number
  maxProgress: number
  reward?: string
}

export interface InteractionSound {
  hover: string
  click: string
  success: string
  error: string
  notification: string
}