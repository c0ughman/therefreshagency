'use client'

import { useRef, useEffect, forwardRef } from 'react'

const TiltEffect = forwardRef(({ children, className = '', intensity = 10, perspective = 1000, reverse = false }, ref) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY
      
      const rotateX = (mouseY / rect.height) * intensity * (reverse ? 1 : -1)
      const rotateY = (mouseX / rect.width) * intensity * (reverse ? -1 : 1)
      
      element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      element.style.transition = 'transform 0.1s ease-out'
    }

    const handleMouseEnter = () => {
      element.style.willChange = 'transform'
    }

    const handleMouseLeave = () => {
      element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`
      element.style.transition = 'transform 0.5s ease'
      element.style.willChange = 'auto'
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [intensity, perspective, reverse])

  return (
    <div
      ref={(node) => {
        elementRef.current = node
        if (ref) {
          if (typeof ref === 'function') {
            ref(node)
          } else {
            ref.current = node
          }
        }
      }}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  )
})

TiltEffect.displayName = 'TiltEffect'

export default TiltEffect