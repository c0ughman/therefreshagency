'use client'

import { useEffect, useRef } from 'react'
import styles from './contact-sections.module.scss'

export default function Contact() {
  const wheelRef = useRef(null)

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
        <h1 className="contact-title">Más Alla de<br />Diseño Web</h1>

        {/* Subtitle */}
        <p className="contact-subtitle">Eleva tu marca con una experiencia web excepcional, con <u><strong>una maquina de generar clientes</strong></u> por detrás. Déjanos encargarnos de todo.</p>

        {/* CTA Button */}
        <a href="https://wa.me/19784045049?text=Buenas%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes.%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer">
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
          {/* Row 1: All new screenshots with infinite scroll */}
          <div className={styles.slideshowRow}>
            {/* Briefed Project Screenshots */}
            {/* Scrambled images for visual variety */}
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_00percent.webp" alt="Briefed Project - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/designer-knit/designer-knit_1.webp" alt="Designer Knit Screenshot 1" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_2.webp" alt="Edecoration Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_3.webp" alt="Briefed Project Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_1.webp" alt="Gather Screenshot 1" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/designer-knit/designer-knit_2.webp" alt="Designer Knit Screenshot 2" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_1.webp" alt="Edecoration Screenshot 1" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_1.webp" alt="Huella Real Screenshot 1" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_1.webp" alt="Briefed Project Screenshot 1" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_1.webp" alt="RG Law Firm Screenshot 1" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_3.webp" alt="Edecoration Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/designer-knit/designer-knit_3.webp" alt="Designer Knit Screenshot 3" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_2.webp" alt="Briefed Project Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_2.webp" alt="Gather Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_4.webp" alt="Briefed Project Screenshot 4" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_4.webp" alt="Edecoration Screenshot 4" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_2.webp" alt="Huella Real Screenshot 2" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/briefed/briefed_5.webp" alt="Briefed Project Screenshot 5" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_2.webp" alt="RG Law Firm Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_3.webp" alt="Gather Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
          </div>
          
          {/* Row 2: Remaining screenshots with infinite scroll */}
          <div className={styles.slideshowRow}>
            {/* Scrambled images for visual variety - Row 2 */}
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_00percent.webp" alt="Gather Project - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_5.webp" alt="Edecoration Screenshot 5" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_10percent.webp" alt="Huella Real - Early" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_00percent.webp" alt="RG Law Firm - Start" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_4.webp" alt="Gather Screenshot 4" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_6.webp" alt="Edecoration Screenshot 6" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_80percent.webp" alt="Huella Real - Late" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_3.webp" alt="RG Law Firm Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_4.webp" alt="Edecoration Screenshot 4" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_1.webp" alt="Gather Screenshot 1" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_1.webp" alt="RG Law Firm Screenshot 1" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_1.webp" alt="Huella Real Screenshot 1" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_2.webp" alt="Gather Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_5.webp" alt="Edecoration Screenshot 5" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_2.webp" alt="RG Law Firm Screenshot 2" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/huella-real/huella-real_2.webp" alt="Huella Real Screenshot 2" className={styles.portraitImage} width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/gather/gather_3.webp" alt="Gather Screenshot 3" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/edecoration/edecoration_6.webp" alt="Edecoration Screenshot 6" width="300" height="200" loading="lazy" />
            </div>
            <div className={styles.slideshowImage}>
              <img src="/video-screenshots/rg-law-firm/rg-law-firm_3.webp" alt="RG Law Firm Screenshot 3" width="300" height="200" loading="lazy" />
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
              <span className={styles.combinedNumberLabel}>dinero extra, generado por uno de nuestros clientes en el primer mes</span>
            </div>
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>4x</span>
              <span className={styles.combinedNumberLabel}>multiplica tus ventas y ganancias con nuestros servicios, sin trabajo adicional</span>
            </div>
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>22.8%</span>
              <span className={styles.combinedNumberLabel}>tasa de conversión de uno de nuestros clientes (promedio mundial: 2-3%)</span>
            </div>
          </div>

          {/* Block of text */}
          <div className={styles.combinedDescription}>
            <p>
              Tras trabajar con nosotros, recibirás un <u><strong>sitio web digno de premios de diseño</strong></u>, una consulta de mercadeo estratégico y páginas funnel para multiplicar tu potencial de ventas. Manejamos todo el proceso para que no tengas que preocuparte por nada.
            </p>
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

          <a href="https://wa.me/19784045049?text=Buenas%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes..%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer">
            <button className="contact-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Hablemos por WhatsApp
            </button>
          </a>
          
          {/* Trust Pills */}
          <div className={styles.contactCtaPills}>
            <div className={styles.contactCtaPill}>✓ Respuesta en minutos</div>
            <div className={styles.contactCtaPill}>✓ Sin compromiso</div>
            <div className={styles.contactCtaPill}>✓ Consulta gratuita</div>
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
          
          <h2 className={styles.contactComparisonTitle}>Nuestra Diferencia</h2>
          
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
                <span className={styles.contactFooterCtaFunnelServicePrice}>$700</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Página Funnel para Ventas</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Optimizada para multiplicar tus ventas, desde ads o otros canales.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$300</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Consultoría Estratégica en Marketing</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Una sesión personalizada para ayudar a tu negocio y situacion específica.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$120</span>
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
                <span className={styles.contactFooterCtaFunnelServicePrice}>$150</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Gestión de Hosting y Dominio</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Gestion completa de hosting, dominio y todo el proceso técnico inicial.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$150</span>
              </div>
            </div>
            
            <div className={styles.contactFooterCtaFunnelTotal}>
              <div className={styles.contactFooterCtaFunnelTotalRow}>
                <span className={styles.contactFooterCtaFunnelTotalLabel}>Valor total:</span>
                <span className={styles.contactFooterCtaFunnelTotalPrice}>$1,720</span>
              </div>
              <div className={styles.contactFooterCtaFunnelDiscountRow}>
                <span className={styles.contactFooterCtaFunnelDiscountLabel}>Tu precio especial:</span>
                <span className={styles.contactFooterCtaFunnelDiscountPrice}>$850</span>
              </div>
              <div className={styles.contactFooterCtaFunnelSavingsRow}>
                <span className={styles.contactFooterCtaFunnelSavingsPrice}>más del 50% de descuento</span>
              </div>
            </div>
            
            <div className={styles.contactFooterCtaFunnelBasePriceNote}>
              <span className={styles.contactFooterCtaFunnelBasePriceText}>
                Este es el precio base. Para proyectos que incluyan ecommerce, blog completo, traduccion, páginas funnel extra, etc. <a href="https://wa.me/19784045049?text=Buenas%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes...%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline', fontWeight: 'bold', fontStyle: 'normal', color: 'black'}}>Contáctanos para una cotización personalizada.</a>
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
              <a href="https://wa.me/19784045049?text=Buenas%20Quiero%20una%20web%20excepcional%20que%20me%20traiga%20clientes....%20%C2%BFQu%C3%A9%20sigue?" target="_blank" rel="noopener noreferrer">
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
    </div>
  )
}
