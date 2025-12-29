'use client'

import { useEffect, useRef } from 'react'
import { SUPPORTED_TOKENS } from '@/lib/tokens'

interface Bubble {
  token: typeof SUPPORTED_TOKENS[0]
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function TokenBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create bubbles with tokens
    const createBubbles = () => {
      const bubbles: Bubble[] = []
      const tokens = SUPPORTED_TOKENS.slice(0, 15) // Use first 15 tokens
      
      tokens.forEach((token, index) => {
        bubbles.push({
          token,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slow horizontal velocity
          vy: (Math.random() - 0.5) * 0.3, // Slow vertical velocity
          size: 60 + Math.random() * 40, // Size between 60-100
          opacity: 0.15 + Math.random() * 0.1, // Opacity between 0.15-0.25
        })
      })
      
      bubblesRef.current = bubbles
    }

    createBubbles()

    // Draw bubble with token
    const drawBubble = (bubble: Bubble) => {
      ctx.save()
      
      // Draw glow effect
      const gradient = ctx.createRadialGradient(
        bubble.x,
        bubble.y,
        0,
        bubble.x,
        bubble.y,
        bubble.size
      )
      gradient.addColorStop(0, `rgba(236, 72, 153, ${bubble.opacity * 0.3})`)
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${bubble.opacity * 0.2})`)
      gradient.addColorStop(1, `rgba(236, 72, 153, 0)`)
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
      ctx.fill()

      // Draw bubble circle
      ctx.strokeStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.3})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(bubble.x, bubble.y, bubble.size * 0.9, 0, Math.PI * 2)
      ctx.stroke()

      // Draw token icon
      ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.8})`
      ctx.font = `${bubble.size * 0.4}px Arial`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(bubble.token.icon, bubble.x, bubble.y)

      // Draw token symbol below icon
      ctx.font = `${bubble.size * 0.15}px Arial`
      ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.6})`
      ctx.fillText(bubble.token.symbol, bubble.x, bubble.y + bubble.size * 0.35)

      ctx.restore()
    }

    // Animate bubbles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubblesRef.current.forEach((bubble) => {
        // Update position
        bubble.x += bubble.vx
        bubble.y += bubble.vy

        // Bounce off edges
        if (bubble.x - bubble.size < 0 || bubble.x + bubble.size > canvas.width) {
          bubble.vx *= -1
        }
        if (bubble.y - bubble.size < 0 || bubble.y + bubble.size > canvas.height) {
          bubble.vy *= -1
        }

        // Keep bubbles within bounds
        bubble.x = Math.max(bubble.size, Math.min(canvas.width - bubble.size, bubble.x))
        bubble.y = Math.max(bubble.size, Math.min(canvas.height - bubble.size, bubble.y))

        // Add slight random movement for more organic feel
        bubble.vx += (Math.random() - 0.5) * 0.01
        bubble.vy += (Math.random() - 0.5) * 0.01

        // Limit velocity
        bubble.vx = Math.max(-0.5, Math.min(0.5, bubble.vx))
        bubble.vy = Math.max(-0.5, Math.min(0.5, bubble.vy))

        drawBubble(bubble)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

