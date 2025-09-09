'use client'

import { useEffect, useRef, useState } from 'react'

interface SoundOptions {
  volume?: number
  playbackRate?: number
  loop?: boolean
}

export function useSound(url: string, options: SoundOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(url)
    audio.volume = options.volume || 0.5
    audio.playbackRate = options.playbackRate || 1
    audio.loop = options.loop || false

    audio.addEventListener('loadeddata', () => setIsLoaded(true))
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audio.addEventListener('ended', () => setIsPlaying(false))

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.removeEventListener('loadeddata', () => setIsLoaded(true))
      audio.removeEventListener('play', () => setIsPlaying(true))
      audio.removeEventListener('pause', () => setIsPlaying(false))
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [url, options.volume, options.playbackRate, options.loop])

  const play = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return { play, pause, stop, isPlaying, isLoaded }
}

// Sound Manager for global sound effects
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private enabled: boolean = true

  constructor() {
    // Initialize with base64 encoded sounds or URLs
    this.loadSound('hover', 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAAAAA==')
    this.loadSound('click', 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAAAAA==')
    this.loadSound('success', 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAAAAA==')
    this.loadSound('error', 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAAAAA==')
    this.loadSound('notification', 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAAAAA==')
  }

  private loadSound(name: string, url: string) {
    const audio = new Audio(url)
    audio.volume = 0.3
    this.sounds.set(name, audio)
  }

  play(name: string) {
    if (!this.enabled) return
    const sound = this.sounds.get(name)
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(() => {
        // Silently fail if audio playback is blocked
      })
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  isEnabled() {
    return this.enabled
  }
}

// Create singleton instance
export const soundManager = new SoundManager()