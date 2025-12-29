'use client'

import { useEffect, useRef } from 'react'

export function MatrixBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const columns: HTMLDivElement[] = []
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

    // Create matrix columns
    for (let i = 0; i < 50; i++) {
      const column = document.createElement('div')
      column.className = 'matrix-column'
      column.style.left = `${(i * 100) / 50}%`
      column.style.animationDuration = `${15 + Math.random() * 10}s`
      column.style.animationDelay = `${Math.random() * 5}s`
      
      // Generate random characters
      let text = ''
      for (let j = 0; j < 30; j++) {
        text += chars[Math.floor(Math.random() * chars.length)] + '<br>'
      }
      column.innerHTML = text
      
      container.appendChild(column)
      columns.push(column)
    }

    return () => {
      columns.forEach(col => col.remove())
    }
  }, [])

  return <div ref={containerRef} className="matrix-container" />
}

