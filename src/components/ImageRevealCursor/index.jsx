'use client'

import { useRef, useEffect, useState } from 'react'

const ImageRevealCursor = ({ children, className = '' }) => {
  const containerRef = useRef(null)
  const cursorRef = useRef(null)
  const showcaseImageRef = useRef(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    const cursor = cursorRef.current
    if (!container || !cursor) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      setCursorPosition({ x, y })
      
      // Update CSS custom properties for mask position
      const showcaseImg = container.querySelector('.showcase-image')
      if (showcaseImg) {
        const imgRect = showcaseImg.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        
        const relativeX = ((e.clientX - imgRect.left) / imgRect.width) * 100
        const relativeY = ((e.clientY - imgRect.top) / imgRect.height) * 100
        
        showcaseImg.style.setProperty('--mouse-x', `${relativeX}%`)
        showcaseImg.style.setProperty('--mouse-y', `${relativeY}%`)
      }
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className={`image-reveal-container ${className}`}>
      {children}
      
      {/* Custom cursor circle */}
      <div
        ref={cursorRef}
        className="reveal-cursor"
        style={{
          left: cursorPosition.x - 100,
          top: cursorPosition.y - 100,
        }}
      >
        <div className="cursor-ring"></div>
      </div>
    </div>
  )
}

export default ImageRevealCursor