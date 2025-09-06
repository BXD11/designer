'use client'

import { useEffect, useState } from 'react'

export function ParticlesBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; delay: number }>>([])

  useEffect(() => {
    const particlesArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      left: Math.random() * 100,
      delay: Math.random() * 20,
    }))
    setParticles(particlesArray)
  }, [])

  return (
    <div className="particles-bg">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}