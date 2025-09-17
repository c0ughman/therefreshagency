'use client'

import { useEffect, useRef, useState } from 'react'

const WordAnimation = ({ children, className = '', delay = 0 }) => {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Intersection Observer to detect when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -10% 0px' // Start animation slightly before element is fully in view
      }
    )

    observer.observe(container)

    // Scroll progress calculation with throttling for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!container) return

          const rect = container.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          
          // Calculate progress based on element position relative to viewport
          // Animation starts when element enters viewport and completes when top touches viewport top
          const startPosition = viewportHeight // Element enters viewport (bottom of viewport)
          const endPosition = 0 // Element top touches viewport top
          
          const currentPosition = rect.top
          const progress = Math.max(0, Math.min(1, 
            (startPosition - currentPosition) / (startPosition - endPosition)
          ))
          
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Split text into words and create spans
  const renderWords = () => {
    if (typeof children !== 'string') return children

    const words = children.split(' ')
    const totalWords = words.length

    return words.map((word, index) => {
      // Calculate individual word animation delay
      const wordDelay = delay + (index / totalWords) * 0.8 // Spread animation over 0.8s
      
      // Calculate color based on scroll progress and word delay
      // Words start very light gray (225, 225, 225) and transition to black (0, 0, 0)
      const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordDelay) / 0.4))
      const grayValue = Math.round(225 - (wordProgress * 225))
      const color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`

      return (
        <span
          key={index}
          style={{
            color: color,
            transition: 'color 0.05s ease-out',
            display: 'inline-block',
            marginRight: '0.2em'
          }}
        >
          {word}
        </span>
      )
    })
  }

  return (
    <div 
      ref={containerRef} 
      className={`word-animation ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-out'
      }}
    >
      {renderWords()}
    </div>
  )
}

export default WordAnimation
