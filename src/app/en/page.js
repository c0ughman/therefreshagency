'use client'

import { useEffect, useRef, useState } from 'react'
import ZoomParallax from '../../components/ZoomParallax/index'
import WordAnimation from '../../components/WordAnimation/index'
import WordByWordAnimation from '../../components/WordByWordAnimation/index'
import TiltEffect from '../../components/TiltEffect/index'
import HamburgerMenu from '../../components/HamburgerMenu/index'
import LanguageSwitcher from '../../components/LanguageSwitcher/index'
import Lenis from 'lenis'

export default function Home() {
  const wheelRef = useRef(null)
  const stickyWheelRef = useRef(null)
  const canvasRef = useRef(null)
  const buttonRef = useRef(null)
  const blueCursorRef = useRef(null)
  const stickyHeaderRef = useRef(null)
  const webDesignRef = useRef(null)
  const [showChatbotPopup, setShowChatbotPopup] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [showValueProps, setShowValueProps] = useState(false)
  const [showValuePropsText, setShowValuePropsText] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)


  useEffect(() => {
    // Show chatbot popup after 4 seconds
    const popupTimer = setTimeout(() => {
      setShowChatbotPopup(true)
    }, 4000)

    // Lenis smooth scrolling with enhanced configuration
    window.lenis = new Lenis({
      duration: 2.4,  // Longer duration for extra smooth scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.7, // Reduced multiplier for smoother wheel scrolling
      smooth: true,
    })
   
    // Handle smooth scrolling for navigation links
    const handleNavClick = (e) => {
      const link = e.target.closest('a')
      if (!link) return
      
      const href = link.getAttribute('href')
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)
        const serviceType = link.getAttribute('data-service')
        const projectType = link.getAttribute('data-project')
        
        if (targetElement) {
          window.lenis.scrollTo(targetElement, {
            offset: -100, // Offset to account for header height
            duration: 3,  // Even slower for navigation clicks
            easing: (t) => 1 - Math.pow(1 - t, 5) // Smooth easing for nav
          }).then(() => {
            // Handle service highlights
            if (serviceType) {
              // Remove any existing highlights
              document.querySelectorAll('.bento-highlight').forEach(el => {
                el.classList.remove('bento-highlight')
              })

              // Add highlight to the selected service
              let targetCard
              switch(serviceType) {
                case 'web-design':
                  targetCard = document.querySelector('.complex-left')
                  break
                case 'marketing':
                  targetCard = document.querySelector('.complex-top-right')
                  break
                case 'chatbot':
                  targetCard = document.querySelector('.complex-square-5')
                  break
                case 'mvp':
                  targetCard = document.querySelector('.complex-square-8')
                  break
              }

              if (targetCard) {
                targetCard.classList.add('bento-highlight')
                // Remove highlight after animation
                setTimeout(() => {
                  targetCard.classList.remove('bento-highlight')
                }, 2000)
              }
            }

            // Handle project highlights
            if (projectType) {
              // Remove any existing highlights
              document.querySelectorAll('.project-highlight').forEach(el => {
                el.classList.remove('project-highlight')
              })

              // Add highlight to the selected project
              const targetProject = document.querySelector(`#matrix-${projectType}`)?.closest('.project-row')
              if (targetProject) {
                targetProject.classList.add('project-highlight')
                // Ensure the project is in view
                setTimeout(() => {
                  targetProject.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  // Remove highlight after animation
                  setTimeout(() => {
                    targetProject.classList.remove('project-highlight')
                  }, 2000)
                }, 1000) // Wait for initial scroll to complete
              }
            }
          })
        }
      }
    }

    // Add click handlers to both navigation menus
    const mainNav = document.querySelector('header nav')
    const stickyNav = document.querySelector('.sticky-header nav')
    
    if (mainNav) mainNav.addEventListener('click', handleNavClick)
    if (stickyNav) stickyNav.addEventListener('click', handleNavClick)

    function raf(time) {
      window.lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Hero wheel rotation
    const wheel = wheelRef.current
    let lastY = 0
    let velocity = 0
    let rotation = 0

    const handleMouseMove = (e) => {
      const deltaY = e.clientY - lastY
      velocity += deltaY * 0.05
      lastY = e.clientY
    }

    function animateWheel() {
      rotation += velocity
      velocity *= 0.9
      if (wheel) {
        wheel.style.transform = `rotate(${rotation}deg)`
      }
      requestAnimationFrame(animateWheel)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animateWheel()


    // Blue cursor movement
    const blueCursor = blueCursorRef.current
    const handleCursorMove = (e) => {
      if (blueCursor) {
        blueCursor.style.left = `${e.clientX}px`
        blueCursor.style.top = `${e.clientY}px`
      }
    }

    document.addEventListener('mousemove', handleCursorMove)

    // Web design showcase mask effect
    const webDesignSection = webDesignRef.current
    const handleWebDesignMouseMove = (e) => {
      const showcaseImg = webDesignSection?.querySelector('.showcase-image')
      if (showcaseImg) {
        const rect = showcaseImg.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        showcaseImg.style.setProperty('--mouse-x', `${x}%`)
        showcaseImg.style.setProperty('--mouse-y', `${y}%`)
      }
    }

    if (webDesignSection) {
      webDesignSection.addEventListener('mousemove', handleWebDesignMouseMove)
    }

    // Sticky header scroll control
    const stickyHeader = stickyHeaderRef.current
    const scrollThreshold = window.innerHeight * 0.5 // 50% of viewport height

    const handleScroll = () => {
      // Get footer element
      const footer = document.querySelector('.footer')
      
      if (!footer) return
      
      // Calculate when footer comes into view
      const footerRect = footer.getBoundingClientRect()
      const footerTop = footerRect.top
      const windowHeight = window.innerHeight
      
      // Show sticky header when scrolling past threshold and footer is not in view
      if (window.scrollY > scrollThreshold && footerTop > windowHeight) {
        stickyHeader?.classList.add('visible')
      } else {
        stickyHeader?.classList.remove('visible')
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Sticky wheel rotation
    const stickyWheel = stickyWheelRef.current
    let stickyWheelLastY = 0
    let stickyWheelVelocity = 0
    let stickyWheelRotation = 0

    const handleStickyWheelMouseMove = (e) => {
      const deltaY = e.clientY - stickyWheelLastY
      stickyWheelVelocity += deltaY * 0.05
      stickyWheelLastY = e.clientY
    }

    function animateStickyWheel() {
      stickyWheelRotation += stickyWheelVelocity
      stickyWheelVelocity *= 0.9
      if (stickyWheel) {
        stickyWheel.style.transform = `rotate(${stickyWheelRotation}deg)`
      }
      requestAnimationFrame(animateStickyWheel)
    }

    document.addEventListener('mousemove', handleStickyWheelMouseMove)
    animateStickyWheel()

    // Button gradient cursor following effect
    const handleButtonMouseMove = (e) => {
      const button = e.target.closest('.button, .footer-button, .footer-cta-button, .cta-button')
      if (button) {
        const rect = button.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        // Calculate distance from center (50%, 50%)
        const centerX = 50
        const centerY = 50
        const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
        
        // Calculate glow intensity based on distance from center
        // Closer to edge = higher intensity (max distance from center is ~35%)
        const maxDistance = 35
        const intensity = Math.min(distanceFromCenter / maxDistance, 1)
        
        // Calculate offset for outer glow (cursor position relative to center)
        const glowOffsetX = (x - 50) * 0.1 // Reduced offset for tighter effect
        const glowOffsetY = (y - 50) * 0.1
        
        button.style.setProperty('--gradient-x', `${x}%`)
        button.style.setProperty('--gradient-y', `${y}%`)
        button.style.setProperty('--glow-offset-x', `${glowOffsetX}px`)
        button.style.setProperty('--glow-offset-y', `${glowOffsetY}px`)
        button.style.setProperty('--glow-intensity', intensity)
      }
    }

    document.addEventListener('mousemove', handleButtonMouseMove)

    // Scroll-based video and project effects
    const briefedVideo = document.querySelector('video[alt*="Briefed"]')
    const rgVideo = document.querySelector('video[alt*="RG Law Firm"]')
    const edecorationVideo = document.querySelector('video[alt*="Edecoration"]')
    const gatherVideo = document.querySelector('video[alt*="Gather"]')
    const huellaVideo = document.querySelector('video[alt*="Huella Real"]')
    const designerVideo = document.querySelector('video[alt*="Designer Knit"]')
    
    const briefedRow = document.querySelector('#matrix-briefed')?.closest('.project-row')
    const rgRow = document.querySelector('#matrix-rg')?.closest('.project-row')
    const edecorationRow = document.querySelector('#matrix-edecoration')?.closest('.project-row')
    const gatherRow = document.querySelector('#matrix-gather')?.closest('.project-row')
    const huellaRow = document.querySelector('#matrix-huella')?.closest('.project-row')
    const designerRow = document.querySelector('#matrix-designer')?.closest('.project-row')
    
    // Project rows and their corresponding videos
    const projectData = [
      { row: briefedRow, video: briefedVideo },
      { row: rgRow, video: rgVideo },
      { row: edecorationRow, video: edecorationVideo },
      { row: gatherRow, video: gatherVideo },
      { row: huellaRow, video: huellaVideo },
      { row: designerRow, video: designerVideo }
    ]
    
    // Detect if device is mobile/touch
    const isMobile = () => {
      return window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }

    // Function to activate project (play video and add active class)
    const activateProject = (row, video) => {
      if (!row) return
      
      // Add scroll-active class for styling
      row.classList.add('scroll-active')
      
      // Play video if it exists
      if (video) {
        video.play().catch(e => console.log('Video play failed:', e))
      }
    }

    // Function to deactivate project (pause video and remove active class)
    const deactivateProject = (row, video) => {
      if (!row) return
      
      // Remove scroll-active class
      row.classList.remove('scroll-active')
      
      // Pause and reset video if it exists
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }

    // Function to check if project center aligns with viewport center (mobile only)
    const checkProjectAlignment = () => {
      if (!isMobile()) return // Skip on desktop
      
      const viewportCenter = window.innerHeight / 2
      
      projectData.forEach(({ row, video }) => {
        if (!row) return
        
        const rect = row.getBoundingClientRect()
        const projectCenter = rect.top + (rect.height / 2)
        
        // Check if project center is close to viewport center (within 100px tolerance)
        const isAligned = Math.abs(projectCenter - viewportCenter) < 100
        
        if (isAligned) {
          activateProject(row, video)
        } else {
          deactivateProject(row, video)
        }
      })
    }

    // Desktop hover handlers
    const setupDesktopHover = () => {
      if (isMobile()) return // Skip on mobile
      
      projectData.forEach(({ row, video }) => {
        if (!row) return
        
        // Mouse enter handler
        const handleMouseEnter = () => {
          activateProject(row, video)
        }
        
        // Mouse leave handler
        const handleMouseLeave = () => {
          deactivateProject(row, video)
        }
        
        // Add event listeners
        row.addEventListener('mouseenter', handleMouseEnter)
        row.addEventListener('mouseleave', handleMouseLeave)
        
        // Store handlers for cleanup
        row._hoverHandlers = { handleMouseEnter, handleMouseLeave }
      })
    }

    // Throttled scroll handler for performance (mobile only)
    let scrollTimeout
    const handleProjectScroll = () => {
      if (!isMobile()) return // Skip on desktop
      
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      scrollTimeout = setTimeout(checkProjectAlignment, 10)
    }
    
    // Handle window resize to switch between desktop and mobile behavior
    const handleResize = () => {
      // Clean up existing hover handlers
      projectData.forEach(({ row }) => {
        if (row && row._hoverHandlers) {
          row.removeEventListener('mouseenter', row._hoverHandlers.handleMouseEnter)
          row.removeEventListener('mouseleave', row._hoverHandlers.handleMouseLeave)
          delete row._hoverHandlers
        }
      })
      
      // Reset all projects
      projectData.forEach(({ row, video }) => {
        deactivateProject(row, video)
      })
      
      // Setup appropriate behavior
      if (isMobile()) {
        checkProjectAlignment() // Initial check for mobile
      } else {
        setupDesktopHover() // Setup hover for desktop
      }
    }
    
    // Initial setup
    handleResize()
    
    // Listen for scroll events (mobile) and resize events
    window.addEventListener('scroll', handleProjectScroll)
    window.addEventListener('resize', handleResize)

    // SVG Divider scroll effect
    let lastScrollY = window.scrollY
    let lastScrollTime = Date.now()
    let currentBend = 0
    let targetBend = 0
    let animationFrameId

    const updateDividers = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const deltaTime = currentTime - lastScrollTime
      const deltaY = currentScrollY - lastScrollY
      
      // Calculate instantaneous scroll velocity
      const instantVelocity = deltaTime > 0 ? deltaY / deltaTime * 16 : 0 // 16ms = 60fps
      
      // Set target bend based on scroll velocity
      // Positive velocity (scrolling down) = curve up, negative velocity (scrolling up) = curve down
      targetBend = instantVelocity * 2
      
      // Apply natural decay when not scrolling
      if (Math.abs(instantVelocity) < 1) {
        targetBend = 0 // Force target to center when not scrolling
        currentBend *= 0.98 // Much slower decay
      }
      
      // Smoothly animate current bend towards target
      currentBend += (targetBend - currentBend) * 0.15
      
      // Clamp bend amount
      const maxBend = 80
      currentBend = Math.max(-maxBend, Math.min(maxBend, currentBend))
      
      // Update divider paths
      const topPath = document.getElementById('top-path')
      const bottomPath = document.getElementById('bottom-path')
      
      if (topPath && bottomPath) {
        // Center is at 150, bend amount creates the curve
        const centerY = 150 + currentBend
        
        // Calculate curve intensity based on scroll velocity
        const curveIntensity = Math.abs(instantVelocity) * 2
        
        // Create curved divider shapes with dynamic curve intensity
        const topPathData = `M0,0 L1200,0 L1200,${centerY} Q600,${centerY + curveIntensity} 0,${centerY} Z`
        const bottomPathData = `M0,${centerY} Q600,${centerY - curveIntensity} 1200,${centerY} L1200,300 L0,300 Z`
        
        topPath.setAttribute('d', topPathData)
        bottomPath.setAttribute('d', bottomPathData)
        
        // Debug: log values to console
        console.log('Scroll velocity:', instantVelocity, 'Current bend:', currentBend, 'Target bend:', targetBend, 'Curve intensity:', curveIntensity)
      } else {
        console.log('SVG paths not found')
      }
      
      lastScrollY = currentScrollY
      lastScrollTime = currentTime
      animationFrameId = requestAnimationFrame(updateDividers)
    }
    
    // Start the animation after a short delay to ensure DOM is ready
    setTimeout(() => {
      updateDividers()
    }, 100)

    // Matrix effect for CTA section
    let handleMatrixMouseMove
    setTimeout(() => {
      const matrix = document.getElementById('matrix')
      if (matrix) {
        const cellWidth = 15
        const cellHeight = 20
        const cols = Math.floor(window.innerWidth / cellWidth)
        const rows = Math.floor(window.innerHeight / cellHeight)

        // Build grid + 2D array
        const grid = []
        for (let r = 0; r < rows; r++) {
          const row = []
          for (let c = 0; c < cols; c++) {
            const span = document.createElement('span')
            span.textContent = Math.random() > 0.5 ? '1' : '0'
            matrix.appendChild(span)
            row.push(span)
          }
          grid.push(row)
        }

        handleMatrixMouseMove = (e) => {
          const radius = 80 // circular brush radius in px

          // brush bounds in grid coordinates
          const rowStart = Math.max(0, Math.floor((e.clientY - radius) / cellHeight))
          const rowEnd = Math.min(rows - 1, Math.floor((e.clientY + radius) / cellHeight))
          const colStart = Math.max(0, Math.floor((e.clientX - radius) / cellWidth))
          const colEnd = Math.min(cols - 1, Math.floor((e.clientX + radius) / cellWidth))

          for (let r = rowStart; r <= rowEnd; r++) {
            for (let c = colStart; c <= colEnd; c++) {
              const span = grid[r][c]
              const x = c * cellWidth + cellWidth / 2
              const y = r * cellHeight + cellHeight / 2

              const dist = Math.hypot(e.clientX - x, e.clientY - y)

              if (dist <= radius) {
                span.classList.add('visible')
              } else {
                span.classList.remove('visible')
              }
            }
          }
        }

        document.addEventListener('mousemove', handleMatrixMouseMove)
      }
    }, 100)

    // Initialize matrix effects for project rows
    // Toggle for binary effect - set to false to disable
    const enableBinaryEffect = false
    
    setTimeout(() => {
      if (!enableBinaryEffect) return
      
      const projectMatrixIds = ['matrix-briefed', 'matrix-rg', 'matrix-edecoration', 'matrix-gather']
      
      projectMatrixIds.forEach(matrixId => {
        const matrix = document.getElementById(matrixId)
        if (matrix) {
          const projectRow = matrix.closest('.project-row')
          if (projectRow) {
            const rect = projectRow.getBoundingClientRect()
            const cellWidth = 15
            const cellHeight = 20
            const cols = Math.floor(rect.width / cellWidth)
            const rows = Math.floor(rect.height / cellHeight)

            // Build grid + 2D array
            const grid = []
            for (let r = 0; r < rows; r++) {
              const row = []
              for (let c = 0; c < cols; c++) {
                const span = document.createElement('span')
                span.textContent = Math.random() > 0.5 ? '1' : '0'
                matrix.appendChild(span)
                row.push(span)
              }
              grid.push(row)
            }

            // Add mouse move handler for this project row
            const handleProjectMatrixMouseMove = (e) => {
              const rect = projectRow.getBoundingClientRect()
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top
              
              if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const radius = 60 // circular brush radius in px
                
                // brush bounds in grid coordinates
                const rowStart = Math.max(0, Math.floor((y - radius) / cellHeight))
                const rowEnd = Math.min(rows - 1, Math.floor((y + radius) / cellHeight))
                const colStart = Math.max(0, Math.floor((x - radius) / cellWidth))
                const colEnd = Math.min(cols - 1, Math.floor((x + radius) / cellWidth))
                
                // activate cells in brush area
                for (let r = rowStart; r <= rowEnd; r++) {
                  for (let c = colStart; c <= colEnd; c++) {
                    const dx = (c * cellWidth + cellWidth / 2) - x
                    const dy = (r * cellHeight + cellHeight / 2) - y
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    
                    if (distance <= radius) {
                      const span = grid[r][c]
                      span.classList.add('visible')
                      
                      // fade out after delay
                      setTimeout(() => {
                        span.classList.remove('visible')
                      }, 1000)
                    }
                  }
                }
              }
            }

            projectRow.addEventListener('mousemove', handleProjectMatrixMouseMove)
          }
        }
      })
    }, 200)

    // Cleanup
    return () => {
      clearTimeout(popupTimer)
      if (mainNav) mainNav.removeEventListener('click', handleNavClick)
      if (stickyNav) stickyNav.removeEventListener('click', handleNavClick)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousemove', handleCursorMove)
      document.removeEventListener('mousemove', handleStickyWheelMouseMove)
      document.removeEventListener('mousemove', handleButtonMouseMove)
      if (handleMatrixMouseMove) {
        document.removeEventListener('mousemove', handleMatrixMouseMove)
      }
      if (webDesignSection) {
        webDesignSection.removeEventListener('mousemove', handleWebDesignMouseMove)
      }
      window.removeEventListener('scroll', handleScroll)
      
      // Cleanup scroll-based project effects
      window.removeEventListener('scroll', handleProjectScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // Cancel animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

    }
  }, [])

  // Page load animation effect
  useEffect(() => {
    // Trigger page load animation after a short delay
    const loadTimer = setTimeout(() => {
      setIsPageLoaded(true)
    }, 100)

    // Trigger gradients fade-in at 0.1s (skip on mobile)
    const gradientsTimer = setTimeout(() => {
      if (window.innerWidth <= 768) {
        setShowValueProps(true) // Still set to true but CSS will override animations
      } else {
        setShowValueProps(true)
      }
    }, 100) // Start at 0.1s

    // Trigger text fade-in at 0.3s (skip on mobile)
    const textTimer = setTimeout(() => {
      if (window.innerWidth <= 768) {
        setShowValuePropsText(true) // Still set to true but CSS will override animations
      } else {
        setShowValuePropsText(true)
      }
    }, 300) // Start at 0.3s

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(gradientsTimer)
      clearTimeout(textTimer)
    }
  }, [])

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      // Skip animations on mobile devices (768px and below)
      if (window.innerWidth <= 768) {
        setScrollProgress(0)
        return
      }
      
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll percentage of the page
      const scrollPercentage = scrollY / (documentHeight - windowHeight)
      
      // Animation happens between 0% and 10% of page scroll
      const animationStart = 0.00 // 0%
      const animationEnd = 0.10   // 10%
      
      // Calculate progress from 0 to 1 within the animation range
      let progress = 0
      if (scrollPercentage >= animationStart) {
        const animationRange = animationEnd - animationStart
        const animationProgress = (scrollPercentage - animationStart) / animationRange
        progress = Math.min(Math.max(animationProgress, 0), 1)
      }
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ocean canvas effect that depends on isPageLoaded state
  useEffect(() => {
    const canvas = canvasRef.current
    const button = buttonRef.current
    if (!canvas || !button) return

    const ctx = canvas.getContext('2d')
    let width, height
    let animationId
    
    // Mobile detection
    const isMobile = window.innerWidth <= 768
    let animationCompleted = false
    let finalCanvasPosition = null

    function updateCanvasPosition() {
      // On mobile, only update position once after animation completes
      if (isMobile && animationCompleted) {
        return
      }
      
      const buttonRect = button.getBoundingClientRect()
      const buttonBottom = buttonRect.bottom
      const desiredOffset = -window.innerHeight + buttonBottom + 270
      canvas.style.transform = `translateY(${desiredOffset}px)`
      
      // Store final position for mobile after animation
      if (isMobile && animationCompleted) {
        finalCanvasPosition = desiredOffset
      }
    }

    function resizeCanvas() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      
      // On mobile, maintain the final position after animation
      if (isMobile && animationCompleted && finalCanvasPosition !== null) {
        canvas.style.transform = `translateY(${finalCanvasPosition}px)`
      } else {
        updateCanvasPosition() // Update position on resize
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let waveOffset = 0
    let mouseForce = 0
    let smoothedForce = 0
    
    // Animation variables for smooth wave movement
    let targetWaveY = height * 0.2 // Start at top
    let currentWaveY = height * 0.2
    let animationStartTime = null
    const animationDuration = 1200 // 1.2 seconds

    const handleCanvasMouseMove = (e) => {
      const force = Math.abs(e.movementX) + Math.abs(e.movementY)
      mouseForce = Math.min(100, force)
    }

    function drawOcean() {
      ctx.clearRect(0, 0, width, height)
      waveOffset += 0.03 + (smoothedForce / 500)
      smoothedForce += (mouseForce - smoothedForce) * 0.05

      // Smooth animation of wave position
      if (isPageLoaded && animationStartTime === null) {
        animationStartTime = Date.now()
        targetWaveY = height * 0.65 // Move to bottom
      }

      if (animationStartTime) {
        const elapsed = Date.now() - animationStartTime
        const progress = Math.min(elapsed / animationDuration, 1)
        
        // Smooth easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        currentWaveY = height * 0.2 + (targetWaveY - height * 0.2) * easeProgress
        
        // Mark animation as completed and set final position on mobile
        if (progress >= 1 && !animationCompleted) {
          animationCompleted = true
          if (isMobile) {
            // Set the final canvas position based on button location
            const buttonRect = button.getBoundingClientRect()
            const buttonBottom = buttonRect.bottom
            finalCanvasPosition = -window.innerHeight + buttonBottom + 270
            canvas.style.transform = `translateY(${finalCanvasPosition}px)`
          }
        }
      }

      // Draw the wave shape
      ctx.beginPath()
      ctx.moveTo(0, height)
      
      // Draw the wave curve
      for (let x = 0; x <= width; x++) {
        let y = currentWaveY + Math.sin((x + waveOffset * 100) * 0.008) * (20 + smoothedForce * 1.8) +
                Math.sin((x + waveOffset * 150) * 0.012) * (10 + smoothedForce * 0.6)
        ctx.lineTo(x, y)
      }
      
      // Complete the shape by going to bottom right corner
      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fillStyle = 'white'
      ctx.fill()

      mouseForce *= 0.9
      animationId = requestAnimationFrame(drawOcean)
    }

    document.addEventListener('mousemove', handleCanvasMouseMove)
    drawOcean()

    return () => {
      document.removeEventListener('mousemove', handleCanvasMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPageLoaded])

  return (
    <>

      <header>
        <div className="logo">The Refresh Agency.</div>
        <nav className="desktop-nav">
          <a href="#projects">Portfolio</a>
          <a href="#reviews">Reviews</a>
          <a href="#bento">Products</a>
          <a href="#mission">Mission</a>
          <a href="/en/contact">Talk to Us</a>
        </nav>
        <LanguageSwitcher />
        <HamburgerMenu className="mobile-nav hero" />
      </header>

      {/* Sticky header that appears on scroll */}
      <header className="sticky-header" ref={stickyHeaderRef}>
        <div className="logo">
          <img src="/wheel.png" alt="The Refresh Agency" className="sticky-wheel" ref={stickyWheelRef} />
        </div>
        <nav className="desktop-nav">
          <a href="#projects">Portfolio</a>
          <a href="#reviews">Reviews</a>
          <a href="#bento">Products</a>
          <a href="#mission">Mission</a>
          <a href="/en/contact">Talk to Us</a>
        </nav>
        <LanguageSwitcher />
        <HamburgerMenu className="mobile-nav" />
      </header>

      <div className="main">
        <div className="hero-container">
          <WordByWordAnimation className="title-header">
            Beyond Websites, Refreshing Experiences That Convert
          </WordByWordAnimation>
          <div className="hero-content">
            <div className="hero-left">
              <p>Elevate your brand with a captivating website and then build a customer-generating machine behind it. All while relying on us for the heavy lifting.</p>
              <a href="/en/contact" ref={buttonRef} className="button">Talk to Us</a>
            </div>
            <div className="hero-right">
              <div className="star">
                <img src="/wheel.png" alt="Decorative Star Shape" ref={wheelRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Columns */}
      <section className="value-props">
        <div className="value-props-container">
            {/* Background gradient layer */}
            <div className={`value-props-background ${showValueProps ? 'gradients-fade-in' : ''}`}>
              <div 
                className="value-gradient value-gradient-1"
                style={{
                  opacity: Math.max(0, 1 - scrollProgress * 2),
                  transform: `translateX(${-150 * scrollProgress * 0.7}px) translateY(${-400 * scrollProgress * 0.8}px) rotate(${-8 * scrollProgress * 0.6}deg)`,
                  zIndex: scrollProgress > 0 ? 9998 : 'auto'
                }}
              ></div>
              <div 
                className="value-gradient value-gradient-2"
                style={{
                  opacity: Math.max(0, 1 - scrollProgress * 2),
                  transform: `translateY(${-500 * scrollProgress * 1.2}px)`,
                  zIndex: scrollProgress > 0 ? 9998 : 'auto'
                }}
              ></div>
              <div 
                className="value-gradient value-gradient-3"
                style={{
                  opacity: Math.max(0, 1 - scrollProgress * 2),
                  transform: `translateX(${150 * scrollProgress * 0.9}px) translateY(${-400 * scrollProgress * 0.7}px) rotate(${8 * scrollProgress * 0.8}deg)`,
                  zIndex: scrollProgress > 0 ? 9998 : 'auto'
                }}
              ></div>
              <div 
                className="value-gradient value-gradient-4"
                style={{
                  opacity: Math.max(0, 1 - scrollProgress * 2),
                  transform: `translateX(${-150 * scrollProgress * 0.7}px) translateY(${-400 * scrollProgress * 0.8}px) rotate(${-8 * scrollProgress * 0.6}deg)`,
                  zIndex: scrollProgress > 0 ? 9998 : 'auto'
                }}
              ></div>
              <div 
                className="value-gradient value-gradient-5"
                style={{
                  opacity: Math.max(0, 1 - scrollProgress * 2),
                  transform: `translateY(${-500 * scrollProgress * 1.2}px)`,
                  zIndex: scrollProgress > 0 ? 9998 : 'auto'
                }}
              ></div>
              <div 
                className="value-gradient value-gradient-6"
                style={{
                  opacity: Math.max(0, 1 - scrollProgress * 2),
                  transform: `translateX(${150 * scrollProgress * 0.9}px) translateY(${-400 * scrollProgress * 0.7}px) rotate(${8 * scrollProgress * 0.8}deg)`,
                  zIndex: scrollProgress > 0 ? 9998 : 'auto'
                }}
              ></div>
            </div>
          
          {/* Content layer */}
          <div className={`value-props-grid ${showValuePropsText ? 'text-fade-in' : ''}`}>
            <div 
              className="value-column value-column-left"
              style={{
                transform: `translateX(${-150 * scrollProgress * 0.7}px) translateY(${-400 * scrollProgress * 0.8}px) rotate(${-8 * scrollProgress * 0.6}deg)`,
                zIndex: scrollProgress > 0 ? 9999 : 'auto'
              }}
            >
              <h3> Forget the Technical Stuff</h3>
              <p>
              <strong>✘</strong> Wonky site builders<br />
              <strong>✘</strong> Wordpress headaches<br />
              <strong>✘</strong> Overwhelmed and confused<br />
              <strong>✘</strong> No support
              </p>
            </div>
            <div 
              className="value-column value-column-center"
              style={{
                transform: `translateY(${-500 * scrollProgress * 1.2}px)`,
                zIndex: scrollProgress > 0 ? 9999 : 'auto'
              }}
            >
              <h3>Award-Worthy Design</h3>
              <p>
              No more <b>boring old websites.</b><br />No more generic templates.<br />We express your brand in a unique, powerful, and captivating way.
              </p>
            </div>
            <div 
              className="value-column value-column-right"
              style={{
                transform: `translateX(${150 * scrollProgress * 0.9}px) translateY(${-400 * scrollProgress * 0.7}px) rotate(${8 * scrollProgress * 0.8}deg)`,
                zIndex: scrollProgress > 0 ? 9999 : 'auto'
              }}
            >
              <h3>Lead Machine</h3>
              <p>
              Stop chasing customers.<br /><i>Attract them instead.</i><br />
          We transform your website into a customer-generating machine.

              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="reviews-container">
          <div className="reviews-header">
            <h2>What our clients say</h2>
            <p>Real results from real businesses</p>
          </div>
        </div>
      </section>
      
      {/* Zoom Parallax Section */}
      <div className="zoom-parallax-wrapper">
        <ZoomParallax />
      </div>

      {/* Pain Point Section 1 */}
      <section className="pain-point-section">
        <div className="pain-point-container">
          <WordAnimation className="pain-point-text">
          Quit wasting time on janky site builders. Quit running improvised Google ads. Let us handle the whole internet side of your business, from website to sale.
          </WordAnimation>
        </div>
      </section>

      {/* Bento Section */}
      <div id="bento" className="what-we-do">
        <div className="what-we-do-bg"></div>
        <div className="what-we-do-content">
          <div className="complex-container">
            <TiltEffect intensity={8} perspective={1200} className="complex-left" ref={webDesignRef}>
              <div className="bento-content">
                <h3>Tailored Website Design</h3>
                <p>Complete end-to-end development with hosting, maintenance, and optimization. We build everything from scratch.</p>
                <div className="bento-features">
                  <span>Full Stack Development</span>
                  <span>Hosting & Maintenance</span>
                  <span>Performance Optimization</span>
                </div>
              </div>
              <img src="/showcase-wf.png" alt="Website Design Showcase Wireframe" className="showcase-wf-image" />
              <img src="/showcase.png" alt="Website Design Showcase" className="showcase-image" />
              <div className="empty-space-right">
                <div className="bento-features">
                  <span>Completely Custom</span>
                  <span>Award-Worthy Design</span>
                </div>
              </div>
              <a href="#" className="interested-link">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <div className="wave-elements">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
              </div>
            </TiltEffect>
            <div className="complex-right">
              <TiltEffect intensity={17} perspective={1000} className="complex-top-right">
                <div className="bento-content">
                  <h3>Marketing Strategy and Funnels</h3>
                  <p>Strategic partner for growth. We make landing pages that multiply your sales and conversions.</p>
                  <img src="/funnels.png" alt="Marketing Funnels & SEO" className="funnels-image" />
                  <div className="bento-features">
                    <span>Conversion Optimization</span>
                    <span>Search Engine Rankings</span>
                  </div>
                </div>
                <a href="#" className="interested-link">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <div className="wave-elements">
                  <div className="wave wave-1"></div>
                  <div className="wave wave-2"></div>
                  <div className="wave wave-3"></div>
                </div>
              </TiltEffect>
              <div className="complex-bottom-right">
                <div className="complex-left-of-8">
                  <div className="complex-above-5">
                    <TiltEffect intensity={30} perspective={800} className="complex-square-3">
                      <a href="/contact" className="button">Talk to Us</a>
                    </TiltEffect>
                  </div>
                  <TiltEffect intensity={30} perspective={900} className="complex-square-5">
                    <div className="bento-content">
                      <h3>Complete AI Chatbot Integration to Website</h3>
                      <div className="bento-features">
                        <span>24/7 Support</span>
                        <span>Smart Replies</span>
                      </div>
                    </div>
                    <div className="circular-wave-elements">
                      <div className="circular-wave circular-wave-1"></div>
                      <div className="circular-wave circular-wave-2"></div>
                      <div className="circular-wave circular-wave-3"></div>
                    </div>
                    {/* Chatbot Popup Message */}
                    {showChatbotPopup && (
                      <div className="chatbot-popup">
                        <div className="chatbot-popup-content">
                          <div className="chatbot-popup-avatar">
                            <div className="chatbot-avatar-icon">🤖</div>
                          </div>
                          <div className="chatbot-popup-message">
                            <p>Hi! Need help?</p>
                          </div>
                        </div>
                        <div className="chatbot-popup-tail"></div>
                      </div>
                    )}
                  </TiltEffect>
                </div>
                <TiltEffect intensity={17} perspective={1000} className="complex-square-8">
                  <div className="bento-content">
                    <h3>Launch Your MVP</h3>
                    <p>Ship your web app MVP in days, not months.</p>
                    <div className="bento-features">


                      <span>Fast Development</span>
                      <span>Market Ready</span>
                    </div>
                  </div>
                  <a href="#" className="interested-link">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </TiltEffect>
              </div>
            </div>
          </div>
        </div>
      </div>



                         {/* Top SVG Divider */}
             <div className="svg-divider top-divider">
         <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
           <path id="top-path" d="M0,0 L1200,0 L1200,150 L0,150 Z" fill="white" />
         </svg>
       </div>


      {/* CTA Section */}
      <section className="cta-section">
        <div className="matrix" id="matrix"></div>
        <div className="cta-container">
          <h2 className="cta-title">Set Yourself Apart<br />
          Get a Refresh Today</h2>
          <p className="cta-subtitle">Transform your website into a customer-generating machine.<br /><br />

✓ Stunning, high-performance website<br />
✓ Attract consistent, high-quality leads<br />
✓ Convert visitors into paying clients<br /><br />

Limited to 3 clients per month for exceptional results.
</p>
          <div className="cta-button-wrapper">
            <a href="/contact" className="cta-button">Talk to Us</a>
          </div>
        </div>
      </section>

                         {/* Bottom SVG Divider */}
             <div className="svg-divider bottom-divider">
          <svg viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path id="bottom-path" d="M0,150 L1200,150 L1200,300 L0,300 Z" fill="white" />
          </svg>
        </div>


      {/* Pain Point Section 2 */}
      <section className="pain-point-section">
        <div className="pain-point-container">
          <WordAnimation className="pain-point-text">
          A well designed landing page can 4X your online sales and profit. We build them for you. Then show you exactly how to use them. 
          How's that for ROI?
          </WordAnimation>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2>Our Projects</h2>
            <p>Showcasing our latest work and creative solutions</p>
          </div>
          {/* Project 1 - Briefed */}
          <div className="project-row">
            <div className="matrix" id="matrix-briefed"></div>
            <div className="project-columns">
              <div className="project-column client-type">
                <span>SaaS</span>
              </div>
              <div className="project-column service">
                <span>Frontend,<br />Identity</span>
              </div>
              <div className="project-column project-name">
                <h2>Briefed</h2>
                <video 
                  src="/briefed.mp4" 
                  alt="Briefed Project"
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                  poster="/briefed.png"
                />
              </div>
              <div className="project-column project-description">
                <p><strong>How We Helped:</strong><br />We built out their whole front-end and brand identity, worked on a <u>beautiful central dashboard</u> which is the cornerstone of their product.</p>
              </div>
              <div className="project-column arrow">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#0000ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="project-divider"></div>
          
          {/* Project 2 - RG Law Firm */}
          <div className="project-row">
            <div className="matrix" id="matrix-rg"></div>
            <div className="project-columns">
              <div className="project-column client-type">
                <span>LAW FIRM</span>
              </div>
              <div className="project-column service">
                <span>Website,<br />SEO</span>
              </div>
              <div className="project-column project-name">
                <h2>RG B&P<br />Law Firm</h2>
                <video 
                  src="/rg-law-firm.mp4" 
                  alt="RG Law Firm Project"
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                  poster="/rg.png"
                />
              </div>
              <div className="project-column project-description">
                <p><strong>How We Helped:</strong><br />Built out a multi-language SEO centric website to <u>rank page #1 within weeks</u> on some local and international queries.</p>
              </div>
              <div className="project-column arrow">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#0000ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="project-divider"></div>
          
          {/* Project 3 - Edecoration */}
          <div className="project-row">
            <div className="matrix" id="matrix-edecoration"></div>
            <div className="project-columns">
              <div className="project-column client-type">
                <span>HOME DECOR</span>
              </div>
              <div className="project-column service">
                <span>Website,<br />PAID ADS</span>
              </div>
              <div className="project-column project-name">
                <h2>Edecoration</h2>
                <video 
                  src="/edecoration.mp4" 
                  alt="Edecoration Project"
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                  poster="/edecoration.png"
                />
              </div>
              <div className="project-column project-description">
                <p><strong>How We Helped:</strong><br />Built a <u>digital showroom</u> showcasing many of their top projects, most important clients, and various products. Elegance and prestige.</p>
              </div>
              <div className="project-column arrow">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#0000ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="project-divider"></div>
          
          {/* Project 4 - Gather */}
          <div className="project-row">
            <div className="matrix" id="matrix-gather"></div>
            <div className="project-columns">
              <div className="project-column client-type">
                <span>AI AGENTS PLATFORM</span>
              </div>
              <div className="project-column service">
                <span>UI/UX DESIGN</span>
              </div>
              <div className="project-column project-name">
                <h2>Gather</h2>
                <video 
                  src="/gather.mp4" 
                  alt="Gather Project"
                  muted 
                  loop 
                  playsInline
                  preload="metadata"
                  poster="/gather.png"
                />
              </div>
              <div className="project-column project-description">
                <p><strong>How We Helped:</strong><br />On the journey of developing a design language for this groundbreaking AI multi-agent platform. <u>We are cooking up something truly special.</u> </p>
              </div>
              <div className="project-column arrow">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#0000ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="project-divider"></div>
          
          {/* Project 5 - Huella Real */}
          <div className="project-row">
            <div className="matrix" id="matrix-huella"></div>
            <div className="project-columns">
              <div className="project-column client-type">
                <span>ECOMMERCE</span>
              </div>
              <div className="project-column service">
                <span>WEBSITE,<br />CRO</span>
              </div>
              <div className="project-column project-name">
                <h2>Huella Real</h2>
                <video 
                  src="/huella-real.mp4" 
                  alt="Huella Real Project"
                  muted 
                  loop 
                  playsInline
                />
              </div>
              <div className="project-column project-description">
                <p><strong>How We Helped:</strong><br />This Spain-based Ecommerce store was carefully developed with the end user in mind, implementing <u>powerful CRO measures</u> from the start.</p>
              </div>
              <div className="project-column arrow">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#0000ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="project-divider"></div>
          
          {/* Project 6 - Designer Knit */}
          <div className="project-row">
            <div className="matrix" id="matrix-designer"></div>
            <div className="project-columns">
              <div className="project-column client-type">
                <span>Fashion, ECOMMERCE</span>
              </div>
              <div className="project-column service">
                <span>Website</span>
              </div>
              <div className="project-column project-name">
                <h2>Designer Knit</h2>
                <video 
                  src="/designer-knit.mp4" 
                  alt="Designer Knit Project"
                  muted 
                  loop 
                  playsInline
                />
              </div>
              <div className="project-column project-description">
                <p><strong>How We Helped:</strong><br />Designed a <u>bold, elegant, and attractive</u> brand identity and website. Which resonated deeply with the target audience and brought exciting results.</p>
              </div>
              <div className="project-column arrow">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#0000ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="mission-section">
        <div className="mission-container">
          <div className="mission-graphic">
            <div className="mission-graphic-inner">
              <img src="/face.png" alt="Digital portrait in binary code" className="mission-image" />
            </div>
          </div>
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p className="mission-subtitle">To redefine the digital landscape by infusing sites with beauty, impact, expression, and intuitive design.</p>
            <div className="mission-text">
              <p>
<strong>Elevate Aesthetics & Expression</strong> Crafting stunning and intuitively designed digital platforms that reflect the unique essence of each brand, making the internet a more intentional and impactful place.<br /><br />

<strong>Maximize Untapped Potential</strong> Unlocking the full potential of novel tools and strategies, transforming websites into powerful engines for multiplied profit, enhanced performance, and tangible results.<br /><br />

<strong>Eliminate Unnecessary Effort</strong> Creating purposeful systems that drive profits in the most efficient and scalable manner. No more outdated, unnecessary or low impact work.
</p>
            </div>

          </div>
        </div>
      </section>

      <canvas 
        id="ocean-canvas" 
        ref={canvasRef}
        className={`ocean-canvas ${isPageLoaded ? 'loaded' : ''}`}
      ></canvas>


      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-bg"></div>
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/wheel.png" alt="The Refresh Agency" className="footer-wheel" />
              </div>
              <h3>The Refresh Agency.</h3>
              <p>Transforming digital experiences with innovative design and cutting-edge technology.</p>
              <div className="footer-social">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Instagram</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4><span className="dash">----</span>Services<span className="dash">---</span></h4>
              <ul>
                <li><a href="#bento" data-service="web-design">Web Design</a></li>
                <li><a href="#bento" data-service="marketing">Marketing & Funnels</a></li>
                <li><a href="#bento" data-service="chatbot">AI Chatbot</a></li>
                <li><a href="#bento" data-service="mvp">MVP Development</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4><span className="dash">----</span>Projects<span className="dash">---</span></h4>
              <ul>
                <li><a href="#projects" data-project="briefed">Briefed</a></li>
                <li><a href="#projects" data-project="rg">RG Law Firm</a></li>
                <li><a href="#projects" data-project="edecoration">Edecoration</a></li>
                <li><a href="#projects" data-project="gather">Gather</a></li>
                <li><a href="#projects" data-project="huella">Huella Real</a></li>
                <li><a href="#projects" data-project="designer">Designer Knit</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4><span className="dash">----</span>Company<span className="dash">---</span></h4>
              <ul>
                <li><a href="#projects">Portfolio</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#bento">Products</a></li>
                <li><a href="#mission">Mission</a></li>
                <li><a href="/contact">Talk to Us</a></li>
              </ul>
            </div>
          </div>
          
          {/* IBM Logo */}
          <div className="footer-ibm-logo">
            <img src="/ibm-logo.png" alt="IBM Logo" />
            <a href="/contact" className="footer-cta-button">Talk to Us</a>
          </div>
        </div>
      </footer>
      
    </>
  )
}
