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
          <span className="stars-text">We create concrete results.</span>
        </div>

        {/* Main title */}
        <h1 className="contact-title">Beyond<br />Web Design</h1>

        {/* Subtitle */}
        <p className="contact-subtitle">Elevate your brand with an exceptional web experience, with <u><strong>a customer-generating machine</strong></u> behind it. Let us handle everything.</p>

        {/* CTA Button */}
        <button className="contact-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Let's Talk on WhatsApp
        </button>

        {/* Pills under button */}
        <div className="contact-pills">
          <div className="contact-pill">Unique Design</div>
          <div className="contact-pill">4x More Clients</div>
          <div className="contact-pill">Support</div>
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
          <h2 className={styles.combinedTitle}>Our Results Speak for Themselves</h2>

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
              <span className={styles.combinedNumberLabel}>extra profit generated by one of our clients in the first month</span>
            </div>
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>4x</span>
              <span className={styles.combinedNumberLabel}>multiply your sales and profits without additional work</span>
            </div>
            <div className={styles.combinedNumber}>
              <span className={styles.combinedNumberValue}>22.8%</span>
              <span className={styles.combinedNumberLabel}>conversion rate of one of our clients (world average: 2-3%)</span>
            </div>
          </div>

          {/* Block of text */}
          <div className={styles.combinedDescription}>
            <p>
              After working with us, you'll receive an <u><strong>award-worthy website design</strong></u>, strategic marketing consultation and funnel pages to multiply your sales potential. We handle the entire process so you don't have to worry about anything.
            </p>
          </div>

          {/* Reviews section */}
          <div className={styles.combinedReviews}>
            <div className={styles.combinedTestimonialsGrid}>
              <div className={styles.combinedTestimonialItem}>
                <div className={styles.combinedTestimonialStars}>★★★★★</div>
                <p className={styles.combinedTestimonialText}>
                  "The website is an <strong>elegant, media-packed, beautiful</strong> piece of design. Like a digital showroom that goes beyond anything else in the market. Great job... Keep it up!"
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
                  "The e-commerce store design that the refresh agency built out for us is <strong>different from anything we've ever seen in the market</strong>. It's beautiful, striking, and undeniably attractive."
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
                  "Without us having to micromanage everything, the research agency <strong>works independently</strong>, bringing real results to our business and building out amazing things really fast. A real strategic partner."
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
                  "The Refresh Agency really helped us in coming up with a unique brand identity and applying it seamlessly to our <strong>website and product</strong>. The result is a beautiful, well-thought-out interface for our future customers to enjoy."
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
            <li>Award-worthy design website</li>
            <li>Funnel pages to multiply your sales</li>
            <li>Strategic marketing consultation included</li>
            <li>Mobile optimized, fully responsive</li>
            <li>Performance optimization and Basic SEO</li>
            <li>Direct technical support and maintenance</li>
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
            <span className="stars-text">We create concrete results.</span>
          </div>

          <h2 className={styles.contactCtaTitle} style={{marginTop: '0px'}}>Don't Wait Any Longer,<br />Consultation and Quote<br />Today</h2>
          <p className={styles.contactCtaSubtitle}>
          We only work with <strong><u>three spots per month</u></strong> to ensure the best attention and quality of results, don't miss your chance. 
          </p>

          <button className="contact-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Let's Talk on WhatsApp
          </button>
          
          {/* Trust Pills */}
          <div className={styles.contactCtaPills}>
            <div className={styles.contactCtaPill}>✓ Response in minutes</div>
            <div className={styles.contactCtaPill}>✓ No commitment</div>
            <div className={styles.contactCtaPill}>✓ Free consultation</div>
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
          
          <h2 className={styles.contactComparisonTitle}>Our Difference</h2>
          
          {/* Desktop Table View */}
          <div className={styles.contactComparisonTable}>
            <div className={styles.contactComparisonTableHeader}>
              <div className={styles.contactComparisonTableHeaderCell}>
                <h3>Other Agencies</h3>
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
                  <span className={styles.contactComparisonText}>Charge $5,000+ for simple services with hidden costs.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}><strong>Fair and transparent</strong> prices, with no hidden surprises.</span>
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
                  <span className={styles.contactComparisonText}>Deliver junk leads and useless results.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>Strategies that generate <strong>real clients</strong> and <strong>measurable results</strong>.</span>
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
                  <span className={styles.contactComparisonText}>Generic designs based on templates without personality.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}><strong>Unique</strong> designs that reflect the <strong>essence of your brand</strong>.</span>
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
                  <span className={styles.contactComparisonText}>Abandon projects without notice and disappear after delivery.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>We accompany your project <strong>from start to finish</strong>, <strong>no abandonment</strong>.</span>
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
                  <span className={styles.contactComparisonText}>Slow, confusing and unprofessional communication.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}><strong>Close, fast</strong> and <strong>clear</strong> communication at all times.</span>
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
                  <span className={styles.contactComparisonText}>Constant delays and dishonesty with deadlines.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}>We meet deadlines with <strong>clear</strong> and <strong>responsible</strong> processes.</span>
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
                  <span className={styles.contactComparisonText}>They use outdated technology that wastes time and money.</span>
                </div>
              </div>
              <div className={`${styles.contactComparisonTableCell} ${styles.right}`}>
                <div className={styles.contactComparisonItem}>
                  <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  </span>
                  <span className={styles.contactComparisonText}><strong>Modern and efficient</strong> technology that <strong>empowers your business</strong>.</span>
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
              <span className={styles.contactComparisonText}><strong>Fair and transparent</strong> prices, with no hidden surprises.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Charge $5,000+ for simple services with hidden costs.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Strategies that generate <strong>real clients</strong> and <strong>measurable results</strong>.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Deliver junk leads and useless results.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}><strong>Unique</strong> designs that reflect the <strong>essence of your brand</strong>.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Generic designs based on templates without personality.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.right}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </span>
              <span className={styles.contactComparisonText}><strong>Close, fast</strong> and <strong>clear</strong> communication at all times.</span>
            </div>
            <div className={styles.contactComparisonMobileItem}>
              <span className={`${styles.contactComparisonIcon} ${styles.left}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <span className={styles.contactComparisonText}>Slow, confusing and unprofessional communication.</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.contactHowItWorksSection}>
        <div className={styles.contactHowItWorksContainer}>
          <h2 className={styles.contactHowItWorksTitle}>Offer:<br />Only For The Next<br /><span className={styles.blueUnderline}>Three Clients</span></h2>
          <p className={styles.contactHowItWorksSubtitle}>
            Our base package for website design <u>less than half the normal price.</u><br />While others hide their costs, we show exactly what we offer and how much it would cost you. <br /><strong>This opportunity will not be repeated.</strong>
          </p>
          
          {/* Funnel Pricing Section */}
          <div className={styles.contactFooterCtaFunnel}>
            <div className={styles.contactFooterCtaFunnelTitle}>What your package includes:</div>
            
            <div className={styles.contactFooterCtaFunnelServices}>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>100% Custom Website</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Unique, creative and mobile responsive (up to 5 pages included)</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$700</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Sales Funnel Page</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Optimized to multiply your sales, from ads or other channels.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$300</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Strategic Marketing Consulting</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>A personalized session to help your business grow, tailored to your specific situation.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$120</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>15 Detailed Blog Articles</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>15 ultra specific articles for content marketing and SEO.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$300</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Performance, Speed and Basic SEO</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>We optimize your site to be fast and easy to find on Google.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$150</span>
              </div>
              <div className={styles.contactFooterCtaFunnelService}>
                <div className={styles.contactFooterCtaFunnelServiceContent}>
                  <span className={styles.contactFooterCtaFunnelServiceTitle}>Hosting and Domain Management</span>
                  <span className={styles.contactFooterCtaFunnelServiceDescription}>Complete hosting, domain and all the technical stuff handled.</span>
                </div>
                <span className={styles.contactFooterCtaFunnelServicePrice}>$150</span>
              </div>
            </div>
            
            <div className={styles.contactFooterCtaFunnelTotal}>
              <div className={styles.contactFooterCtaFunnelTotalRow}>
                <span className={styles.contactFooterCtaFunnelTotalLabel}>Total value:</span>
                <span className={styles.contactFooterCtaFunnelTotalPrice}>$1,720</span>
              </div>
              <div className={styles.contactFooterCtaFunnelDiscountRow}>
                <span className={styles.contactFooterCtaFunnelDiscountLabel}>Your special price:</span>
                <span className={styles.contactFooterCtaFunnelDiscountPrice}>$850</span>
              </div>
              <div className={styles.contactFooterCtaFunnelSavingsRow}>
                <span className={styles.contactFooterCtaFunnelSavingsPrice}>more than 50% discount</span>
              </div>
            </div>
            
            <div className={styles.contactFooterCtaFunnelBasePriceNote}>
              <span className={styles.contactFooterCtaFunnelBasePriceText}>
                This is the base price. For projects that include ecommerce, complete blog, translation, extra funnel pages, etc. <a href="#" style={{textDecoration: 'underline', fontWeight: 'bold', fontStyle: 'normal', color: 'black'}}>Contact us for a personalized quote.</a>
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
              <span className="stars-text">We create concrete results.</span>
            </div>
            <h2 className={styles.contactFooterCtaTitle}>Ready For a Refreshing Change?</h2>
            <p className={styles.contactFooterCtaSubtitle}>
            A <strong><u>custom website</u></strong> that also works as a <strong><u>sales generating machine</u></strong>. What are you waiting for? Bring a refreshing change to your brand and multiply its possibilities. Leave it in our hands.
            </p>
            
            <div className={styles.contactFooterCtaButtons}>
              <button className={`${styles.contactFooterCtaButton} ${styles.primary}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Let's Talk on WhatsApp
              </button>
            </div>
            
            {/* Trust Pills */}
            <div className={styles.contactFooterCtaPills}>
              <div className={styles.contactFooterCtaPill}>✓ Limited spots</div>
              <div className={styles.contactFooterCtaPill}>✓ No commitment</div>
              <div className={styles.contactFooterCtaPill}>✓ Free consultation</div>
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

