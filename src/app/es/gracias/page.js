'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './gracias.module.scss'
import carouselStyles from '../excepcional/contact-sections.module.scss'

// Generate confetti pieces with varied properties for realistic effect
const generateConfetti = (count) => {
  const colors = ['#ff0000', '#0000ff', '#ffcc00', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']
  const shapes = ['square', 'rectangle', 'circle']

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 720,
    drift: (Math.random() - 0.5) * 100,
    opacity: 0.7 + Math.random() * 0.3
  }))
}

// Real reviews from the landing page
const reviews = [
  {
    company: "Edecoration",
    type: "Website",
    text: "Un showroom digital que va más allá de cualquier otra cosa en el mercado.",
    image: "/review-images/edecoration-website.png"
  },
  {
    company: "DesignerKnit",
    type: "Ecommerce",
    text: "El diseño de la tienda e-commerce que The Refresh Agency creó para nosotros es diferente a cualquier cosa que hayamos visto en el mercado. Es hermoso, llamativo e innegablemente atractivo.",
    image: null
  },
  {
    company: "RG Law Firm",
    type: "Web + Marketing",
    text: "La agencia trabaja de forma independiente, trayendo resultados reales.",
    image: "/review-images/rglawfirm-seo.png"
  }
]

export default function Gracias() {
  const [showConfetti, setShowConfetti] = useState(true)
  const confettiPieces = useMemo(() => generateConfetti(80), [])

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className={styles.graciasPage}>
      {/* Realistic Confetti Animation */}
      {showConfetti && (
        <div className={styles.confettiContainer}>
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className={`${styles.confetti} ${styles[piece.shape]}`}
              style={{
                left: `${piece.left}%`,
                '--delay': `${piece.delay}s`,
                '--duration': `${piece.duration}s`,
                '--color': piece.color,
                '--size': `${piece.size}px`,
                '--rotation': `${piece.rotation}deg`,
                '--rotation-speed': `${piece.rotationSpeed}deg`,
                '--drift': `${piece.drift}px`,
                '--opacity': piece.opacity
              }}
            />
          ))}
        </div>
      )}

      
      {/* Main Content - 40/60 Split */}
      <div className={styles.splitContainer}>
        {/* Left Side - 40% - Message Content */}
        <motion.div
          className={styles.leftContent}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Logo with blue square background */}
          <motion.div
            className={styles.logoContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img src="/wheel.png" alt="The Refresh Agency" />
          </motion.div>

          {/* Success Checkmark - Simple, no background */}
          <motion.div
            className={styles.successCheck}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ¡Mensaje Recibido!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Gracias por contactarnos. Nuestro equipo ya está revisando tu mensaje y te responderemos <strong>en las próximas horas</strong>.
          </motion.p>

          {/* What happens next */}
          <motion.div
            className={styles.nextSteps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2>¿Qué sigue?</h2>
            <div className={styles.stepsTimeline}>
              <div className={styles.step}>
                <div className={styles.stepMarker}>
                  <span className={styles.stepNumber}>1</span>
                  <div className={styles.stepLine}></div>
                </div>
                <div className={styles.stepContent}>
                  <span className={styles.stepText}>Recibimos tu mensaje y <strong>evaluamos</strong> tus necesidades.</span>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepMarker}>
                  <span className={styles.stepNumber}>2</span>
                  <div className={styles.stepLine}></div>
                </div>
                <div className={styles.stepContent}>
                  <span className={styles.stepText}>Te respondemos y tenemos una <strong>breve conversación</strong> sobre cómo podemos ayudarte.</span>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepMarker}>
                  <span className={styles.stepNumber}>3</span>
                </div>
                <div className={styles.stepContent}>
                  <span className={styles.stepText}>Agendamos una <strong>llamada</strong> para discutir los detalles de tu proyecto.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Alternative - Simple text */}
          <motion.div
            className={styles.whatsappText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            <span className={styles.whatsappQuestion}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              ¿Prefieres WhatsApp?
            </span>
            <a href="https://wa.me/19784045049" target="_blank" rel="noopener noreferrer" className={styles.whatsappNumber}>+1 (978) 404-5049</a>
          </motion.div>

          {/* Back Button */}
          <motion.div
            className={styles.ctaSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link href="/es/excepcional" className={styles.backButton}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12,19 5,12 12,5"></polyline>
              </svg>
              Volver
            </Link>
          </motion.div>

          {/* Decorative Gradients */}
          <div className={styles.gradientsContainer}>
            <div className={styles.gradientRed}></div>
            <div className={styles.gradientYellow}></div>
            <div className={styles.gradientRedSmall}></div>
            <div className={styles.gradientYellowSmall}></div>
          </div>
        </motion.div>

        {/* Right Side - 60% - Reviews + Portfolio */}
        <motion.div
          className={styles.rightContent}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          {/* Reviews Section */}
          <div className={styles.reviewsSection}>
            <h3 className={styles.reviewsTitle}>Lo que dicen nuestros clientes</h3>
            <div className={styles.reviewsGrid}>
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className={styles.reviewCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {review.image && (
                    <div className={styles.reviewImage}>
                      <img src={review.image} alt={review.company} loading="lazy" />
                    </div>
                  )}
                  <div className={styles.reviewStars}>★★★★★</div>
                  <p className={styles.reviewText}>"{review.text}"</p>
                  <div className={styles.reviewAuthor}>
                    <span className={styles.reviewName}>{review.company}</span>
                    <span className={styles.reviewCompany}>{review.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Portfolio Carousel */}
          <div className={styles.portfolioSection}>
            <div className={carouselStyles.slideshowContainer}>
              {/* Row 1 */}
              <div className={carouselStyles.slideshowRow}>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.45.08-PM.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/briefed/briefed_3.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.50.11-PM.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/edecoration/edecoration_5.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/new-examples/rglaw.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                {/* Duplicates */}
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.45.08-PM.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/briefed/briefed_3.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.50.11-PM.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/edecoration/edecoration_5.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/new-examples/rglaw.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
              </div>

              {/* Row 2 */}
              <div className={carouselStyles.slideshowRow}>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/gather/gather_3.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/rg-law-firm/rg-law-firm_2.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/edecoration/edecoration_2.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/briefed/briefed_1.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.43.09-PM.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                {/* Duplicates */}
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/gather/gather_3.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/rg-law-firm/rg-law-firm_2.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/edecoration/edecoration_2.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/briefed/briefed_1.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
                <div className={carouselStyles.slideshowImage}>
                  <img src="/video-screenshots/new-examples/Screenshot-2026-01-26-at-7.43.09-PM.webp" alt="Project" width="300" height="200" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
