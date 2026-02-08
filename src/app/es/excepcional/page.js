'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './contact-sections.module.scss'

// Email Contact Modal Component - Using Formspree
function EmailContactModal({ isOpen, onClose, gtag_report_form_conversion }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // null, 'success', 'error'

  // Handle Formspree form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target)

    try {
      const response = await fetch("https://formspree.io/f/xwvqgrvn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Fire form submission conversion tracking
        gtag_report_form_conversion()
        // Redirect to thank-you page after short delay
        setTimeout(() => {
          window.location.href = '/es/gracias'
        }, 1500)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitStatus(null)
    }
  }, [isOpen])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.emailModalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.emailModalContent}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Blue Header with Spinner Only */}
            <div className={styles.emailModalBlueHeader}>
              <div className={styles.emailModalLogo}>
                <img src="/wheel.png" alt="The Refresh Agency" />
              </div>
              {/* Wavy divider */}
              <div className={styles.emailModalWave}>
                <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
                  <path d="M0,0 Q300,50 600,25 T1200,30 L1200,60 L0,60 Z" fill="white"/>
                </svg>
              </div>
            </div>

            {/* Title Section - Below wave, on white */}
            <div className={styles.emailModalTitleSection}>
              <h2 className={styles.emailModalTitle}>Empezemos con Tu Proyecto</h2>
              <p className={styles.emailModalSubtitle}>
                Cuéntanos qué quieres implementar y te responderemos con una propuesta clara y accionable. <strong>Este es el primer paso.</strong>
              </p>
            </div>

            {/* Form - Powered by Formspree */}
            <form
              onSubmit={handleSubmit}
              className={styles.emailModalForm}
            >

              {/* Row with Name and Email */}
              <div className={styles.emailModalRow}>
                <div className={styles.emailModalField}>
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="¿Cómo te llamas?"
                    required
                  />
                </div>

                <div className={styles.emailModalField}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              {/* WhatsApp Field (Optional) */}
              <div className={styles.emailModalField}>
                <label htmlFor="whatsapp">WhatsApp <span className={styles.optionalLabel}>(opcional)</span></label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="+1 234 567 8900 (incluye código de país)"
                />
              </div>

              {/* Description Field */}
              <div className={styles.emailModalField}>
                <label htmlFor="description">¿Qué tienes en mente?</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Cuéntanos sobre tu negocio, tus metas, y cómo podemos ayudarte a crecer..."
                  rows="3"
                  required
                />
              </div>

              {/* Submit Button - styled like CTA */}
              <button
                type="submit"
                className="contact-button"
                style={{width: '100%', marginTop: '8px', padding: '20px 24px', background: '#ff0000'}}
                disabled={isSubmitting || submitStatus === 'success'}
              >
                {isSubmitting ? (
                  <span>Enviando...</span>
                ) : submitStatus === 'success' ? (
                  <span>¡Mensaje enviado! Redirigiendo...</span>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22,2 15,22 11,13 2,9"></polygon>
                    </svg>
                    Enviar y recibir respuesta rápida
                  </>
                )}
              </button>

              {/* Trust indicators */}
              <div className={styles.emailModalTrust}>
                <div className={styles.emailModalTrustItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  Respuesta en minutos
                </div>
                <div className={styles.emailModalTrustItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                  Sin compromiso
                </div>
                <div className={styles.emailModalTrustItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Consulta gratuita
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Contact() {
  const wheelRef = useRef(null)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  // Google Ads conversion tracking - Form Submit (Primary)
  const gtag_report_form_conversion = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17600735113/nHBaCJb6-fQbEInP18hB',
        'value': 1.0,
        'currency': 'USD'
      });
    }
  }

  // Google Ads conversion tracking - WhatsApp Click (Secondary/Observation)
  const gtag_report_whatsapp_conversion = () => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17600735113/JtwnCJfgh_UbEInP18hB',
        'value': 1.0,
        'currency': 'USD'
      });
    }
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

    return () => {
      document.removeEventListener('mousemove', handleButtonMouseMove)
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
          <span className="stars-text">Creamos resultados concretos.</span>
        </div>

        {/* Main title */}
        <h1 className="contact-title">Más Allá de<br />Diseño Web</h1>

        {/* Subtitle */}
        <p className="contact-subtitle"><span style={{color: 'rgba(255, 255, 255, 0.5)', opacity: 0.7}}>Una Agencia que:</span><br />Eleva tu marca con una experiencia web excepcional, con <u><strong>una maquina de generar clientes</strong></u> por detrás. Déjanos encargarnos de todo.</p>

        {/* CTA Button - Desktop: Email, Mobile: WhatsApp */}
        {/* Desktop Email Button */}
        <button
          className={`contact-button ${styles.desktopOnly}`}
          onClick={() => setIsEmailModalOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Hablemos por email
        </button>
        {/* Mobile WhatsApp Button */}
        <a href="https://wa.me/19784045049?text=Hola,%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes.%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_whatsapp_conversion()} className={styles.mobileOnly}>
          <button className="contact-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Hablemos por WhatsApp
          </button>
        </a>

        {/* Pills under button */}
        <div className="contact-pills">
          <div className="contact-pill">Diseño Único</div>
          <div className="contact-pill">4x Más Clientes</div>
          <div className="contact-pill">Apoyo</div>
        </div>
      </main>

      {/* Waves divider */}
      <div className="waves-divider">
        <img src="/waves.svg" alt="Waves" />
      </div>

      {/* Auto-rotating Image Slideshow */}
      <section className={styles.imageSlideshow}>
        <div className={styles.slideshowContainer}>
          {/* Row 1: Shuffled images - slides left */}
          <div className={styles.slideshowRow}>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.45.08-PM.webp" alt="New Example 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_3.webp" alt="Briefed Project Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.50.11-PM.webp" alt="New Example 6" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_5.webp" alt="Edecoration Screenshot 5" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_2.webp" alt="Huella Real Screenshot 2" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/rglaw.webp" alt="RG Law Firm New" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_1.webp" alt="Briefed Project Screenshot 1" width="300" height="200" loading="lazy" />
            </div>
            {/* Duplicate for infinite scroll */}
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.45.08-PM.webp" alt="New Example 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_3.webp" alt="Briefed Project Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.50.11-PM.webp" alt="New Example 6" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_5.webp" alt="Edecoration Screenshot 5" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_2.webp" alt="Huella Real Screenshot 2" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/rglaw.webp" alt="RG Law Firm New" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_1.webp" alt="Briefed Project Screenshot 1" width="300" height="200" loading="lazy" />
            </div>
          </div>
          
          {/* Row 2: Shuffled images - slides right */}
          <div className={styles.slideshowRow}>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/designer-knit/designer-knit_1.webp" alt="Designer Knit Screenshot 1" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.43.09-PM.webp" alt="New Example 1" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_2.webp" alt="RG Law Firm Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_2.webp" alt="Edecoration Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.46.29-PM.webp" alt="New Example 4" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_3.webp" alt="Gather Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_00percent.webp" alt="Briefed Project - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.52.41-PM.webp" alt="New Example 7" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_6.webp" alt="Edecoration Screenshot 6" width="300" height="200" loading="lazy" />
            </div>
            {/* Duplicate for infinite scroll */}
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/designer-knit/designer-knit_1.webp" alt="Designer Knit Screenshot 1" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.43.09-PM.webp" alt="New Example 1" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_2.webp" alt="RG Law Firm Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_2.webp" alt="Edecoration Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.46.29-PM.webp" alt="New Example 4" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_3.webp" alt="Gather Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_00percent.webp" alt="Briefed Project - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.52.41-PM.webp" alt="New Example 7" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_6.webp" alt="Edecoration Screenshot 6" width="300" height="200" loading="lazy" />
            </div>
          </div>

          {/* Row 3: Shuffled images - slides left */}
          <div className={`${styles.slideshowRow} ${styles.slideshowRow3}`}>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_00percent.webp" alt="Gather Project - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.44.23-PM.webp" alt="New Example 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_4.webp" alt="Edecoration Screenshot 4" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.49.35-PM.webp" alt="New Example 5" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_1.webp" alt="Huella Real Screenshot 1" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_00percent.webp" alt="RG Law Firm - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_4.webp" alt="Gather Screenshot 4" width="300" height="200" loading="lazy" />
            </div>
            {/* Duplicate for infinite scroll */}
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_00percent.webp" alt="Gather Project - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.44.23-PM.webp" alt="New Example 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_4.webp" alt="Edecoration Screenshot 4" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.49.35-PM.webp" alt="New Example 5" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_1.webp" alt="Huella Real Screenshot 1" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_00percent.webp" alt="RG Law Firm - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_4.webp" alt="Gather Screenshot 4" width="300" height="200" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Combined Numbers & Reviews Section */}
      <section className={styles.contactCombinedSection}>
        <div className={styles.combinedContainer}>
          {/* Main title */}
          <h2 className={styles.combinedTitle}>Nuestros Resultados Hablan Por Sí Solos</h2>

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
              <span className={styles.combinedNumberValue}>$3,000+</span>
              <span className={styles.combinedNumberLabel}>Dinero extra generado por uno de nuestros clientes en el primer mes.</span>
            </div>
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>4x</span>
              <span className={styles.combinedNumberLabel}>Multiplica tus ventas y ganancias con nuestros servicios, sin trabajo adicional.</span>
            </div>
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>22.8%</span>
              <span className={styles.combinedNumberLabel}>Tasa de conversión de uno de nuestros clientes (promedio mundial: 2-3%).</span>
            </div>
          </div>

          {/* Block of text */}
          <div className={styles.combinedDescription}>
            <p>
              Tras trabajar con nosotros, recibirás un <u><strong>sitio web digno de premios de diseño</strong></u>, una consulta de mercadeo estratégico y páginas funnel para multiplicar tu potencial de ventas. Manejamos todo el proceso para que no tengas que preocuparte por nada.
            </p>
          </div>

          {/* CTA Button after description - Desktop: Email, Mobile: WhatsApp */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', marginBottom: '60px'}}>
            {/* Desktop Email Button */}
            <button
              className={`contact-button ${styles.desktopOnly}`}
              style={{background: '#ff6b35', color: 'white'}}
              onClick={() => setIsEmailModalOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Hablemos por email
            </button>
            {/* Mobile WhatsApp Button */}
            <a href="https://wa.me/19784045049?text=Hola,%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes..%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_whatsapp_conversion()} className={styles.mobileOnly}>
              <button className="contact-button" style={{background: '#ff6b35', color: 'white'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Hablemos por WhatsApp
              </button>
            </a>
            
            {/* Trust Pills */}
            <div className={styles.contactCtaPills} style={{marginTop: '15px', justifyContent: 'center'}}>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                Respuesta en minutos
              </div>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
                Sin compromiso
              </div>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Consulta gratuita
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <div className={styles.combinedReviews}>
            <div className={styles.combinedTestimonialsGrid}>
              <div className={styles.combinedTestimonialItem}>
                <div className={styles.combinedTestimonialStars}>★★★★★</div>
                <p className={styles.combinedTestimonialText}>
                  "El sitio web tiene un diseño <strong>elegante, llamativo y lleno de fotos y videos</strong>. Como un showroom digital que va más allá de cualquier otra cosa en el mercado. Gran trabajo... ¡Sigan así!"
                </p>
                <div className={styles.combinedTestimonialAuthor}>
                  <strong>Edecoration</strong>
                  <span>Website</span>
                </div>
                <div className={styles.combinedTestimonialImage}>
                  <img src="/review-images/edecoration-website.png" alt="Edecoration website review" />
                </div>
              </div>

              <div className={`${styles.combinedTestimonialItem} ${styles.designerknitItem}`}>
                <div className={styles.combinedTestimonialStars}>★★★★★</div>
                <p className={styles.combinedTestimonialText}>
                  "El diseño de la tienda e-commerce que The Refresh Agency creó para nosotros es <strong>diferente a cualquier cosa que hayamos visto en el mercado</strong>. Es hermoso, llamativo e innegablemente atractivo."
                </p>
                <div className={styles.combinedTestimonialAuthor}>
                  <strong>DesignerKnit</strong>
                  <span>Ecommerce Design</span>
                </div>
                <div className={styles.combinedTestimonialImage}>
                  <img src="/review-images/designerknit-sales.png" alt="DesignerKnit e-commerce review" />
                </div>
              </div>

              <div className={styles.combinedTestimonialItem}>
                <div className={styles.combinedTestimonialStars}>★★★★★</div>
                <p className={styles.combinedTestimonialText}>
                  "Sin que tengamos que microgestionar todo, la agencia <strong>trabaja de forma independiente</strong>, trayendo resultados reales a nuestro negocio y construyendo cosas increíbles muy rápido. Un verdadero socio estratégico."
                </p>
                <div className={styles.combinedTestimonialAuthor}>
                  <strong>RG Business & Property Law Firm</strong>
                  <span>Website + Marketing</span>
                </div>
                <div className={styles.combinedTestimonialImage}>
                  <img src="/review-images/rglawfirm-seo.png" alt="R.G. Law Firm website and marketing review" />
                </div>
              </div>

              <div className={`${styles.combinedTestimonialItem} ${styles.briefedItem}`}>
                <div className={styles.combinedTestimonialStars}>★★★★★</div>
                <p className={styles.combinedTestimonialText}>
                  "The Refresh Agency realmente nos ayudó a crear una identidad de marca única y aplicarla perfectamente a nuestro <strong>sitio web y producto</strong>. El resultado es una interfaz hermosa y bien pensada para nuestros futuros clientes."
                </p>
                <div className={styles.combinedTestimonialAuthor}>
                  <strong>Briefed</strong>
                  <span>Website and product</span>
                </div>
                <div className={styles.combinedTestimonialImage}>
                  <img src="/review-images/briefed-product-1.webp" alt="Briefed product review 1" />
                  <img src="/review-images/briefed-product-2.png" alt="Briefed product review 2" />
                  <img src="/review-images/briefed-product-3.png" alt="Briefed product review 3" />
                </div>
              </div>
            </div>
          </div>

          {/* Benefits list after reviews */}
          <ul className={styles.combinedBenefits}>
            <li>Sitio web digno de premios de diseño</li>
            <li>Páginas funnel para multiplicar tus ventas</li>
            <li>Consulta de mercadeo estratégico incluida</li>
            <li>Versión optimizada para móvil responsiva</li>
            <li>SEO básico y performance optimizado</li>
            <li>Apoyo técnico directo y mantenimiento</li>
          </ul>

          {/* CTA Button after benefits - Desktop: Email, Mobile: WhatsApp */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px'}}>
            {/* Desktop Email Button */}
            <button
              className={`contact-button ${styles.desktopOnly}`}
              style={{background: '#ff6b35', color: 'white'}}
              onClick={() => setIsEmailModalOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Hablemos por email
            </button>
            {/* Mobile WhatsApp Button */}
            <a href="https://wa.me/19784045049?text=Hola,%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes...%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_whatsapp_conversion()} className={styles.mobileOnly}>
              <button className="contact-button" style={{background: '#ff6b35', color: 'white'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Hablemos por WhatsApp
              </button>
            </a>
            
            {/* Trust Pills */}
            <div className={styles.contactCtaPills} style={{marginTop: '15px', justifyContent: 'center'}}>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                Respuesta en minutos
              </div>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
                Sin compromiso
              </div>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Consulta gratuita
              </div>
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
            <span className="stars-text">Creamos resultados concretos.</span>
          </div>

          <h2 className={styles.contactCtaTitle} style={{marginTop: '0px'}}>No Esperes Más,<br />Asesoría y Cotización<br />Hoy Mismo</h2>
          <p className={styles.contactCtaSubtitle}>
          Sólo trabajamos con <strong><u>tres cupos por mes</u></strong> para asegurar la mejor atención y calidad de resultados, no te quedes sin tu lugar. 
          </p>

          {/* Desktop Email Button */}
          <button
            className={`contact-button ${styles.desktopOnly}`}
            onClick={() => setIsEmailModalOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Hablemos por email
          </button>
          {/* Mobile WhatsApp Button */}
          <a href="https://wa.me/19784045049?text=Hola,%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes....%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_whatsapp_conversion()} className={styles.mobileOnly}>
            <button className="contact-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Hablemos por WhatsApp
            </button>
          </a>

          {/* Trust Pills */}
          <div className={styles.contactCtaPills}>
            <div className={styles.contactCtaPill}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              Respuesta en minutos
            </div>
            <div className={styles.contactCtaPill}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
              Sin compromiso
            </div>
            <div className={styles.contactCtaPill}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Consulta gratuita
            </div>
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
          
          <h2 className={styles.contactComparisonTitle}>
            Lo Que <span style={{fontFamily: "'Georgia', serif", fontSize: '0.88em', fontWeight: '900', transform: 'scaleY(1.2) translateY(-2px)', display: 'inline-block', verticalAlign: 'baseline'}}>The Refresh Agency</span>
            <br />Hace Mejor
          </h2>
          
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
            
            <div className={styles.contactComparisonTableRow}>
              <div className={`${styles.contactComparisonTableCell} ${styles.left}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Entregan leads basura y resultados que no sirven.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Estrategias que generan <strong>clientes reales</strong> y <strong>resultados medibles</strong>.</span>
                </div>
              </div>
            </div>
            
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
            
            <div className={styles.contactComparisonTableRow}>
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
            
            <div className={styles.contactComparisonTableRow}>
              <div className={`${styles.contactComparisonTableCell} ${styles.left}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Retrasos constantes y deshonestidad con los plazos.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Cumplimos plazos con <strong>procesos claros</strong> y <strong>responsables</strong>.</span>
                </div>
              </div>
            </div>
            
            <div className={styles.contactComparisonTableRow}>
              <div className={`${styles.contactComparisonTableCell} ${styles.left}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Usan tecnología anticuada que desperdicia tiempo y dinero.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Tecnología <strong>moderna y eficiente</strong> que <strong>potencia tu negocio</strong>.</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Alternating Comparison List */}
          <div className={styles.contactComparisonMobile}>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Precios <strong>justos y transparentes</strong>, sin sorpresas ocultas.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Cobran $5,000+ por servicios sencillos con costos escondidos.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Estrategias que generan <strong>clientes reales</strong> y <strong>resultados medibles</strong>.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Entregan leads basura y resultados que no sirven.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Diseños <strong>únicos</strong> que reflejan la <strong>esencia de tu marca</strong>.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Diseños genéricos basados en plantillas sin personalidad.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Comunicación <strong>cercana, rápida</strong> y <strong>clara</strong> en todo momento.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Comunicación lenta, confusa y poco profesional.</span>
            </div>
          </div>

          {/* CTA Button after comparison table - Desktop: Email, Mobile: WhatsApp */}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px'}}>
            {/* Desktop Email Button */}
            <button
              className={`contact-button ${styles.desktopOnly}`}
              style={{background: '#ff6b35', color: 'white'}}
              onClick={() => setIsEmailModalOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Hablemos por email
            </button>
            {/* Mobile WhatsApp Button */}
            <a href="https://wa.me/19784045049?text=Hola%21%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes.%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_whatsapp_conversion()} className={styles.mobileOnly}>
              <button className="contact-button" style={{background: '#ff6b35', color: 'white'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Hablemos por WhatsApp
              </button>
            </a>
            
            {/* Trust Pills */}
            <div className={styles.contactCtaPills} style={{marginTop: '15px', justifyContent: 'center'}}>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                Respuesta en minutos
              </div>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
                Sin compromiso
              </div>
              <div className={styles.contactCtaPill} style={{background: 'rgba(0, 0, 0, 0.05)', color: 'var(--color-text-dark)'}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Consulta gratuita
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.contactHowItWorksSection}>
        <div className={styles.contactHowItWorksContainer}>
          <h2 className={styles.contactHowItWorksTitle}>Oferta:<br />Sólo Para los Próximos<br /><span className={styles.blueUnderline}>Tres Clientes</span></h2>
          <p className={styles.contactHowItWorksSubtitle}>
            Nuestro paquete base de diseño web por <u>menos de la mitad del precio normal.</u><br />Mientras otros ocultan sus costos, nosotros mostramos exactamente que ofrecemos y cuánto te costaría. <br /><strong>Esta oportunidad no volverá a repetirse.</strong>
          </p>
          
          {/* Funnel Pricing Section */}
          <div className={styles.contactFooterCtaFunnel}>
            <div className={styles.contactFooterCtaFunnelTitle}>Lo que incluye tu paquete:</div>
            
            <div className={styles.contactFooterCtaFunnelServices}>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Sitio Web 100% Personalizado</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Único, creativo y adaptado para móvil (hasta de 5 páginas incluídas)</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$1400</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Página Funnel para Ventas</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Optimizada para multiplicar tus ventas, desde ads o otros canales.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$800</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Consultoría Estratégica en Marketing</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Una sesión personalizada para ayudar a tu negocio y situacion específica.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$300</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>15 Artículos de Blogs Detallados</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>15 artículos ultra específicos para marketing de contenido y SEO.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$300</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>SEO Básico, Rendimiento y Velocidad</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Optimizamos tu sitio para que sea rápido y fácil de encontrar en Google.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$400</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Gestión de Hosting y Dominio</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Gestion completa de hosting, dominio y todo el proceso técnico inicial.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$300</span>
              </div>
            </div>
            
            <div className={styles.contactFooterCtaFunnelTotal}>
              <div className={styles.contactFooterCtaFunnelTotalRow}>
                <span className={styles.contactFooterCtaFunnelTotalLabel}>Valor total:</span>
                <span className={styles.contactFooterCtaFunnelTotalPrice}>$3,500</span>
              </div>
              <div className={styles.contactFooterCtaFunnelDiscountRow}>
                <span className={styles.contactFooterCtaFunnelDiscountLabel}>Tu precio especial:</span>
                <span className={styles.contactFooterCtaFunnelDiscountPrice}>$1,700</span>
              </div>
              <div className={styles.contactFooterCtaFunnelSavingsRow}>
                <span className={styles.contactFooterCtaFunnelSavingsPrice}>más del 50% de descuento - sólo para los próximos 3 clientes</span>
              </div>
            </div>
            
            <div className={styles.contactFooterCtaFunnelBasePriceNote}>
              <span className={styles.contactFooterCtaFunnelBasePriceText}>
                Este es el precio base. Para proyectos que incluyan ecommerce, blog completo, traduccion, páginas funnel extra, etc. <a href="#" style={{textDecoration: 'underline', fontWeight: 'bold', fontStyle: 'normal', color: 'black', cursor: 'pointer'}} onClick={(e) => { e.preventDefault(); setIsEmailModalOpen(true); }}>Contáctanos para una cotización personalizada.</a>
              </span>
            </div>
          </div>
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
              <span className="stars-text">Creamos resultados concretos.</span>
            </div>
            <h2 className={styles.contactFooterCtaTitle}>¿Listo Para un Cambio Refrescante?</h2>
            <p className={styles.contactFooterCtaSubtitle}>
            Un <strong><u>sitio web personalizado</u></strong> que también funciona como <strong><u>máquina de generar ventas</u></strong>. ¿Qué estás esperando? Trae un cambio refrescante a tu marca y multiplica sus posibilidades. Déjalo en nuestras manos.
            </p>
            
            <div className={styles.contactFooterCtaButtons}>
              {/* Desktop Email Button */}
              <button
                className={`${styles.contactFooterCtaButton} ${styles.primary} ${styles.desktopOnly}`}
                onClick={() => setIsEmailModalOpen(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Hablemos por email
              </button>
              {/* Mobile WhatsApp Button */}
              <a href="https://wa.me/19784045049?text=Hola%21%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes...%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" onClick={() => gtag_report_whatsapp_conversion()} className={styles.mobileOnly}>
                <button className={`${styles.contactFooterCtaButton} ${styles.primary}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Hablemos por WhatsApp
                </button>
              </a>
            </div>
            
            {/* Trust Pills */}
            <div className={styles.contactFooterCtaPills}>
              <div className={styles.contactFooterCtaPill}>✓ Cupos limitados</div>
              <div className={styles.contactFooterCtaPill}>✓ Sin compromiso</div>
              <div className={styles.contactFooterCtaPill}>✓ Consulta gratuita</div>
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

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        gtag_report_form_conversion={gtag_report_form_conversion}
      />
    </div>
  )
}


