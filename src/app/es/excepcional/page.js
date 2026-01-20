'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './contact-sections.module.scss'
import WordAnimation from '../../../components/WordAnimation/index'

export default function Contact() {
  const wheelRef = useRef(null)

  // Google Ads conversion tracking function
  const gtag_report_conversion = (url) => {
    const callback = function () {
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-17600735113/CTnuCKTu4aEbEInP18hB',
        'value': 1.0,
        'currency': 'USD',
        'event_callback': callback
    });
    return false;
  }

  useEffect(() => {
    // Spinning wheel animation
    const wheel = wheelRef.current
    if (wheel) {
      const animateWheel = () => {
        const currentRotation = parseFloat(wheel.style.transform.replace(/[^\d.]/g, '')) || 0
        wheel.style.transform = `rotate(${currentRotation + 0.5}deg)`
        requestAnimationFrame(animateWheel)
      }
      animateWheel()
    }

    // Spinning arrow wheel animations (same speed as hero wheel)
    const animateArrowWheels = () => {
      const arrowWheels = document.querySelectorAll('.project-column.arrow img')
      arrowWheels.forEach((arrowWheel) => {
        if (arrowWheel) {
          const currentRotation = parseFloat(arrowWheel.style.transform.replace(/[^\d.]/g, '')) || 0
          arrowWheel.style.transform = `rotate(${currentRotation + 0.5}deg)`
        }
      })
      requestAnimationFrame(animateArrowWheels)
    }
    animateArrowWheels()

    // Button gradient cursor following effect
    const handleButtonMouseMove = (e) => {
      const button = e.target.closest('.contact-button')
      if (button) {
        const rect = button.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        // Calculate distance from center (50%, 50%)
        const centerX = 50
        const centerY = 50
        const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
        
        // Calculate glow intensity based on distance from center
        const maxDistance = 35
        const intensity = Math.min(distanceFromCenter / maxDistance, 1)
        
        // Calculate offset for outer glow (cursor position relative to center)
        const glowOffsetX = (x - 50) * 0.1
        const glowOffsetY = (y - 50) * 0.1
        
        button.style.setProperty('--gradient-x', `${x}%`)
        button.style.setProperty('--gradient-y', `${y}%`)
        button.style.setProperty('--glow-offset-x', `${glowOffsetX}px`)
        button.style.setProperty('--glow-offset-y', `${glowOffsetY}px`)
        button.style.setProperty('--glow-intensity', intensity)
      }
    }

    document.addEventListener('mousemove', handleButtonMouseMove)

    // Scroll-based video and project effects (mobile)
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

    return () => {
      document.removeEventListener('mousemove', handleButtonMouseMove)
      window.removeEventListener('scroll', handleProjectScroll)
      window.removeEventListener('resize', handleResize)

      // Clean up hover handlers
      projectData.forEach(({ row }) => {
        if (row && row._hoverHandlers) {
          row.removeEventListener('mouseenter', row._hoverHandlers.handleMouseEnter)
          row.removeEventListener('mouseleave', row._hoverHandlers.handleMouseLeave)
        }
      })
    }
  }, [])

  return (
    <div className="contact-page">
      {/* Header with logo and title */}
      <header className="contact-header">
        <div className="contact-logo">
          <img src="/wheel.png" alt="The Refresh Agency" className="contact-wheel" ref={wheelRef} />
        </div>
        <div className="contact-header-title">The Refresh Agency.</div>
      </header>

      {/* Main content */}
      <main className="contact-main">
        {/* Stars pill over title */}
        <div className="stars-pill">
          <span className="stars">★★★★★</span>
          <span className="stars-text">Diseñamos sitios excepcionales.</span>
        </div>

        {/* Main title */}
        <h1 className="contact-title">Más Alla de<br />Diseño Web</h1>

        {/* Subtitle */}
        <p className="contact-subtitle">Eleva tu marca con <u><strong>diseño de alto nivel.</strong></u><br />Nos encargamos de todo, contigo en cada paso.</p>

        {/* CTA Button */}
        <a href="https://wa.me/19784045049?text=Hola,%20Quiero%20una%20web%20excepcional.%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_conversion()}>

          <button className="contact-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Hablemos por WhatsApp
          </button>
        </a>

        {/* Info under button */}
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '4px'}}>
          <span style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem'}}>Cupos limitados</span>
          <div style={{width: '1px', height: '12px', backgroundColor: 'rgba(255, 255, 255, 0.6)'}}></div>
          <span style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem'}}>Desde $2,500</span>
        </div>
      </main>

      {/* Waves divider */}
      <div className="waves-divider">
        <img src="/waves.svg" alt="Waves" />
      </div>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <div className={styles.desktopTextContainer}>
              <div className={styles.desktopTextContent}>
                <h2>Nuestros Resultados Hablan Por Sí Solos</h2>
                <p>Cada proyecto es una pieza única. Siente lo que una buena dirección creativa puede hacer para tu presencia web. Cuando el diseño se siente intencional, la confianza sube.</p>
              </div>
            </div>
          </div>
          {/* Project 1 - Edecoration */}
          <div className="project-row">
            <div className="matrix" id="matrix-edecoration"></div>
            <div className="project-columns">
              <div className="project-column stars">
                <span>★★★★★</span>
              </div>
              <div className="project-column service">
                <span>Website,<br />PAID ADS</span>
              </div>
              <div className="project-column project-name">
                <h2 className={styles.desktopProjectName}>Edeco</h2>
                <h2 className={styles.mobileProjectName}>Edecoration</h2>
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
                <p>"El sitio web tiene un diseño <strong>elegante, llamativo y lleno de fotos y videos</strong>. Como un showroom digital que va más allá de cualquier otra cosa en el mercado. Gran trabajo... ¡Sigan así!"</p>
              </div>
              <div className="project-column client-type">
                <span>HOME DECOR</span>
              </div>
              <div className="project-column arrow">
                <img src="/wheel.png" alt="The Refresh Agency" style={{width: '64px', height: '64px'}} />
              </div>
            </div>
          </div>

          <div className="project-divider"></div>

          {/* Project 2 - Designer Knit */}
          <div className="project-row">
            <div className="matrix" id="matrix-designer"></div>
            <div className="project-columns">
              <div className="project-column stars">
                <span>★★★★★</span>
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
                <p>"El diseño de la tienda e-commerce que The Refresh Agency creó para nosotros es <strong>diferente a cualquier cosa que hayamos visto en el mercado</strong>. Es hermoso, llamativo e innegablemente atractivo."</p>
              </div>
              <div className="project-column client-type">
                <span>Fashion, ECOMMERCE</span>
              </div>
              <div className="project-column arrow">
                <img src="/wheel.png" alt="The Refresh Agency" style={{width: '64px', height: '64px'}} />
              </div>
            </div>
          </div>

          <div className="project-divider"></div>

          {/* Project 3 - RG Law Firm */}
          <div className="project-row">
            <div className="matrix" id="matrix-rg"></div>
            <div className="project-columns">
              <div className="project-column stars">
                <span>★★★★★</span>
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
                <p>"Sin que tengamos que microgestionar todo, la agencia <strong>trabaja de forma independiente</strong>, trayendo resultados reales a nuestro negocio y construyendo cosas increíbles muy rápido. Un verdadero socio estratégico."</p>
              </div>
              <div className="project-column client-type">
                <span>LAW FIRM</span>
              </div>
              <div className="project-column arrow">
                <img src="/wheel.png" alt="The Refresh Agency" style={{width: '64px', height: '64px'}} />
              </div>
            </div>
          </div>

          <div className="project-divider"></div>

          {/* Project 4 - Briefed */}
          <div className="project-row">
            <div className="matrix" id="matrix-briefed"></div>
            <div className="project-columns">
              <div className="project-column stars">
                <span>★★★★★</span>
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
                <p>"The Refresh Agency realmente nos ayudó a crear una <strong>identidad de marca única</strong> y aplicarla perfectamente a nuestro sitio web y producto. El resultado es una interfaz hermosa y bien pensada para nuestros futuros clientes."</p>
              </div>
              <div className="project-column client-type">
                <span>SaaS</span>
              </div>
              <div className="project-column arrow">
                <img src="/wheel.png" alt="The Refresh Agency" style={{width: '64px', height: '64px'}} />
              </div>
            </div>
          </div>

          <div className="project-divider"></div>

          {/* Project 5 - Gather */}
          <div className="project-row">
            <div className="matrix" id="matrix-gather"></div>
            <div className="project-columns">
              <div className="project-column stars">
                <span>★★★★★</span>
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
                <p>"Trabajar con The Refresh Agency es un <strong>verdadero proceso de colaboración</strong>. Explorar el lenguaje visual de nuestro producto y la forma en que se materializa en cada aspecto de la interfaz ha sido una experiencia extraordinaria."</p>
              </div>
              <div className="project-column client-type">
                <span>AI AGENTS PLATFORM</span>
              </div>
              <div className="project-column arrow">
                <img src="/wheel.png" alt="The Refresh Agency" style={{width: '64px', height: '64px'}} />
              </div>
            </div>
          </div>

          <div className="project-divider"></div>

          {/* Project 6 - Huella Real */}
          <div className="project-row">
            <div className="matrix" id="matrix-huella"></div>
            <div className="project-columns">
              <div className="project-column stars">
                <span>★★★★★</span>
              </div>
              <div className="project-column service">
                <span>Google Ads,<br />CRO</span>
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
                <p>"La tienda online que desarrollaron para nosotros está <strong>optimizada para conversión desde el primer día</strong>. El diseño es limpio, profesional, y los clientes encuentran exactamente lo que buscan."</p>
              </div>
              <div className="project-column client-type">
                <span>ECOMMERCE</span>
              </div>
              <div className="project-column arrow">
                <img src="/wheel.png" alt="The Refresh Agency" style={{width: '64px', height: '64px'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Column Numbers Section */}
      <section className={styles.contactCombinedSection}>
        <div className={styles.combinedContainer}>
          {/* Three numbers in smaller format */}
          <div className={styles.combinedNumbers}>
            {/* Gradient elements behind cards */}
            <div className={styles.combinedNumbersGradient1}></div>
            <div className={styles.combinedNumbersGradient2}></div>
            <div className={styles.combinedNumbersGradient3}></div>
            <div className={styles.combinedNumbersGradient4}></div>
            <div className={styles.combinedNumbersGradient5}></div>
            <div className={styles.combinedNumbersGradient6}></div>
            
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>
                <WordAnimation>100%</WordAnimation>
              </span>
              <span className={styles.combinedNumberLabel}>
                <WordAnimation>Diseño personalizado desde cero, sin plantillas ni genéricos. Cada línea pensada para tu marca.</WordAnimation>
              </span>
            </div>
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>
                <WordAnimation>✰</WordAnimation>
              </span>
              <span className={styles.combinedNumberLabel}>
                <WordAnimation>Todos nuestros clientes están satisfechos con nuestro trabajo. Diseño que supera expectativas y genera resultados reales.</WordAnimation>
              </span>
            </div>
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>
                <WordAnimation>∞</WordAnimation>
              </span>
              <span className={styles.combinedNumberLabel}>
                <WordAnimation>Iteraciones hasta lograr el diseño perfecto que refleja tu marca. Sin límites hasta que esté impecable.</WordAnimation>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Numbers & Reviews Section */}
      <section className={styles.contactCombinedSection}>
        <div className={styles.combinedContainer}>
          <div className={styles.desktopTextContainer}>
            <div className={styles.desktopTextContent}>
              {/* Block of text */}
              <div className={styles.combinedDescription}>
                <p>
                  <em>No hacemos "páginas bonitas".</em> <br />Creamos un sitio web <strong>congruente con tu marca</strong>, con atención al detalle y dirección creativa de alto nivel. Tu web tiene que verse (y sentirse) como la opción obvia, especialmente si tu marca compite en un espacio de lujo.
                </p>
              </div>

              {/* Benefits list */}
              <ul className={styles.combinedBenefits}>
                <li>Diseño único e original, sin plantillas</li>
                <li>Dirección creativa y atención en cada pixel</li>
                <li>Colaboración verdadera (tú ves avances y decides con nosotros)</li>
                <li>Comunicación rápida y ordenada, el mejor servicio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Top Curved SVG */}
      <div className={styles.ctaTopCurve}>
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,0 Q600,48 1200,0 L1200,60 L0,60 Z" fill="#0000ff"/>
        </svg>
      </div>

      {/* Call-to-Action Section */}
      <section className={styles.contactCtaSection}>
        <div className={styles.contactCtaContainer}>
          {/* Stars pill over title */}
          <div className="stars-pill" style={{maxWidth: '280px', margin: '0 auto 15px auto'}}>
            <span className="stars">★★★★★</span>
            <span className="stars-text">Diseñamos sitios excepcionales.</span>
          </div>

          <h2 className={styles.contactCtaTitle} style={{marginTop: '0px'}}>Tu Marca Merece<br />Diseño De Verdad</h2>
          <p className={styles.contactCtaSubtitle}>
          <u>Tomamos pocos proyectos al mes</u> para dar la mejor atención. Escríbenos para empezar el proceso hoy. Te diremos con claridad si encajamos y qué haríamos para que tu presencia sea impecable.
          </p>

          <a href="https://wa.me/19784045049?text=Hola,%20Quiero%20una%20web%20excepcional..%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_conversion()}>

            <button className="contact-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Hablemos por WhatsApp
            </button>
          </a>
          
          {/* Info under button */}
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '10px'}}>
            <span style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem'}}>Cupos limitados</span>
            <div style={{width: '1px', height: '12px', backgroundColor: 'rgba(255, 255, 255, 0.6)'}}></div>
            <span style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem'}}>Desde $2,500</span>
          </div>
        </div>
      </section>

      {/* Bottom Curved SVG */}
      <div className={styles.ctaBottomCurve}>
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,60 Q600,12 1200,60 L1200,60 L0,60 Z" fill="white"/>
        </svg>
      </div>

      {/* Comparison Section */}
      <section className={styles.contactComparisonSection}>
        <div className={styles.contactComparisonContainer}>
          {/* Gradient elements behind table - sides and corners only */}
          <div className={styles.contactComparisonGradient1}></div>
          <div className={styles.contactComparisonGradient2}></div>
          <div className={styles.contactComparisonGradient5}></div>
          <div className={styles.contactComparisonGradient6}></div>
          <div className={styles.contactComparisonGradient7}></div>
          <div className={styles.contactComparisonGradient8}></div>
          
          <div className={styles.desktopTextContainer}>
            <div className={styles.desktopTextContent}>
              <h2 className={styles.contactComparisonTitle}>
                Lo Que <span style={{fontFamily: "'Georgia', serif", fontSize: '0.88em', fontWeight: '900', transform: 'scaleY(1.2) translateY(-2px)', display: 'inline-block', verticalAlign: 'baseline'}}>The Refresh Agency</span>
                <br />Hace Mejor
              </h2>
              <p className={styles.contactComparisonSubtitle}>
                <strong>En el mercado hispano,</strong> la mayoría entrega lo de siempre: plantillas aburridas, silencio (no responden) y excusas baratas.<br /><br />Nosotros diseñamos desde cero contigo. Te escuchamos, te mostramos avances, y atendemos cada detalle con diseño excepcional.
              </p>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className={styles.contactComparisonTable}>
            <div className={styles.contactComparisonTableHeader}>
              <div className={styles.contactComparisonTableHeaderCell}>
                <h3>Otras Agencias</h3>
              </div>
              <div className={styles.contactComparisonTableHeaderCell}>
                <h3>The Refresh Agency</h3>
              </div>
            </div>

            {/* Row 1: Unique Designs */}
            <div className={styles.contactComparisonTableRow}>
              <div className={`${styles.contactComparisonTableCell} ${styles.left}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Diseños genéricos basados en plantillas sin personalidad.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Diseños <strong>únicos</strong> que reflejan la <strong>esencia de tu marca</strong>.</span>
                </div>
              </div>
            </div>

            {/* Row 2: Communication */}
            <div className={styles.contactComparisonTableRow}>
              <div className={`${styles.contactComparisonTableCell} ${styles.left}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Comunicación lenta, confusa y poco profesional.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Comunicación <strong>cercana, rápida</strong> y <strong>clara</strong> en todo momento.</span>
                </div>
              </div>
            </div>

            {/* Row 3: Pricing */}
            <div className={styles.contactComparisonTableRow}>
              <div className={`${styles.contactComparisonTableCell} ${styles.left}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Cobran $5,000+ por servicios sencillos con costos escondidos.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Precios <strong>justos y transparentes</strong>, sin sorpresas ocultas.</span>
                </div>
              </div>
            </div>

            {/* Row 4: Abandonment - Desktop Only */}
            <div className={`${styles.contactComparisonTableRow} ${styles.desktopOnly}`}>
              <div className={`${styles.contactComparisonTableCell} ${styles.left}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Abandonan proyectos sin aviso y desaparecen tras la entrega.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Acompañamos tu proyecto <strong>de principio a fin</strong>, <strong>sin abandonos</strong>.</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Alternating Comparison List */}
          <div className={styles.contactComparisonMobile}>
            {/* Unique Designs - Positive */}
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Diseños <strong>únicos</strong> que reflejan la <strong>esencia de tu marca</strong>.</span>
            </div>
            {/* Unique Designs - Negative */}
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Diseños genéricos basados en plantillas sin personalidad.</span>
            </div>
            {/* Communication - Positive */}
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Comunicación <strong>cercana, rápida</strong> y <strong>clara</strong> en todo momento.</span>
            </div>
            {/* Communication - Negative */}
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Comunicación lenta, confusa y poco profesional.</span>
            </div>
            {/* Pricing - Positive */}
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Precios <strong>justos y transparentes</strong>, sin sorpresas ocultas.</span>
            </div>
            {/* Pricing - Negative */}
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Cobran $5,000+ por servicios sencillos con costos escondidos.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rich Text Section with Scroll Animation */}
      <section className="pain-point-section">
        <div className="pain-point-container">
          <WordAnimation className="pain-point-text">
            No más sitios web genéricos que se ven iguales. Tu negocio no es genérico. Tu web tampoco debería serlo. Creamos experiencias digitales desde cero, con diseño innegablemente atractivo.
          </WordAnimation>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className={styles.contactFooterCta}>
        <div className={styles.contactFooterCtaBg}></div>
        <div className={styles.contactFooterCtaContent}>
          {/* Brand Section */}
          <div className={styles.contactFooterCtaBrand}>
            <div className={styles.contactFooterCtaLogo}>
              <img src="/wheel.png" alt="The Refresh Agency" className={styles.contactFooterCtaWheel} />
            </div>
            <h3>The Refresh Agency.</h3>
            <p className={styles.contactFooterCtaBrandText}>
              Transforming digital experiences with innovative design and cutting-edge technology.
            </p>
          </div>
          
          {/* Main CTA Content */}
          <div className={styles.contactFooterCtaMain}>
            {/* Stars pill over title */}
            <div className="stars-pill" style={{maxWidth: '280px', margin: '30px auto 5px auto'}}>
              <span className="stars">★★★★★</span>
              <span className="stars-text">Diseñamos sitios excepcionales.</span>
            </div>
            <h2 className={styles.contactFooterCtaTitle}>Diseño De Alto Nivel.<br />Servicio A La Altura.</h2>
            <p className={styles.contactFooterCtaSubtitle}>
            Diseño <strong><u>hecho a medida</u></strong> con atención en cada detalle. Colaboración real, comunicación directa, ejecución impecable.<br /><br />Si tu marca merece lo mejor, hablemos.
            </p>
            
            <div className={styles.contactFooterCtaButtons}>
              <a href="https://wa.me/19784045049?text=Hola,%20Quiero%20una%20web%20excepcional...%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_conversion()}>

                <button className={`${styles.contactFooterCtaButton} ${styles.primary}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Hablemos por WhatsApp
                </button>
              </a>
            </div>
            
            {/* Info under button */}
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '0px'}}>
              <span style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem'}}>Cupos limitados</span>
              <div style={{width: '1px', height: '12px', backgroundColor: 'rgba(255, 255, 255, 0.6)'}}></div>
              <span style={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.75rem'}}>Desde $2,500</span>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className={styles.contactFooterCtaCopyright}>
          <div className={styles.contactFooterCtaCopyrightLine}></div>
          <p className={styles.contactFooterCtaCopyrightText}>
            © 2025 The Refresh Agency. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  )
}
