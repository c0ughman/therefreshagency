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
        wheel.style.transform = `rotate(${currentRotation + 1}deg)`
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
        </div>

        {/* Main title */}
        <h1 className="contact-title">Get Your Website Redesigned in 10 Minutes</h1>

        {/* Subtitle */}
        <p className="contact-subtitle">Stop losing customers to your outdated website. Our AI-powered design service delivers stunning, conversion-focused websites that turn visitors into paying customers—faster than you can finish your coffee.</p>

        {/* CTA Button */}
        <button className="contact-button">Start Your Project</button>

        {/* Value proposition pills */}
        <div className="value-pills">
          <div className="value-pill">
            <span>Custom Design</span>
          </div>
          <div className="value-pill">
            <span>Fast Delivery</span>
          </div>
          <div className="value-pill">
            <span>SEO Optimized</span>
          </div>
        </div>
      </main>

      {/* Waves divider */}
      <div className="waves-divider">
        <img src="/waves.svg" alt="Waves" />
      </div>

      {/* Urgency Section */}
      <section className={styles.contactUrgency}>
        <div className={styles.urgencyContainer}>
          <h2 className={styles.urgencyTitle}>Don't Let Your Competitors Steal Your Customers</h2>
          <p className={styles.urgencySubtitle}>
            While you're reading this, your competitors are converting visitors into customers with modern, fast-loading websites. 
            Every second your website stays outdated is money lost.
          </p>
          <div className={styles.urgencyStats}>
            <div className={styles.urgencyStat}>
              <span className={styles.urgencyStatNumber}>73%</span>
              <span className={styles.urgencyStatLabel}>of users leave sites that take longer than 3 seconds to load</span>
            </div>
            <div className={styles.urgencyStat}>
              <span className={styles.urgencyStatNumber}>$2.6M</span>
              <span className={styles.urgencyStatLabel}>average revenue lost per year due to poor website performance</span>
            </div>
            <div className={styles.urgencyStat}>
              <span className={styles.urgencyStatNumber}>10 min</span>
              <span className={styles.urgencyStatLabel}>is all it takes to transform your website with our AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle CTA Link */}
      <div className={styles.subtleCtaLink}>
        <p>Ready to see what we can do for your business? <a href="#" className={styles.subtleCtaAnchor}>Get started now</a></p>
      </div>

      {/* Testimonials Section */}
      <section className="contact-testimonials">
        <div className="testimonials-container">
          {/* Main title */}
          <h2 className="testimonials-title">What Our Clients Say</h2>

          {/* Value proposition */}
          <div className="testimonials-value-prop">
            <p>
              Our AI-powered approach delivers stunning websites in minutes, not months. From custom designs to SEO optimization, 
              we help businesses convert visitors into customers with proven results that speak for themselves.
            </p>
          </div>

          {/* Client testimonials */}
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The Refresh Agency transformed our website in just 10 minutes. Our conversion rate increased by 300% 
                and we're getting more qualified leads than ever before."
              </p>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>CEO, TechStart Inc.</span>
              </div>
            </div>

            <div className="testimonial-item">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Finally, a web design service that actually delivers on its promises. The AI-powered approach 
                created a website that perfectly represents our brand and converts like crazy."
              </p>
              <div className="testimonial-author">
                <strong>Michael Chen</strong>
                <span>Founder, Digital Solutions</span>
              </div>
            </div>

            <div className="testimonial-item">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Lightning fast delivery, stunning results, and incredible support. The Refresh Agency 
                helped us refresh our entire online presence and boost our sales by 250%."
              </p>
              <div className="testimonial-author">
                <strong>Emily Rodriguez</strong>
                <span>Marketing Director, GrowthCo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      <section className="contact-media">
        <div className="media-container">
          <h2 className="media-title">Our Work in Action</h2>
          <p className="media-subtitle">
            See the stunning results we've delivered for our clients. Each project showcases our commitment to 
            innovative design and exceptional user experience.
          </p>
          
          <div className="media-grid">
            <div className="media-item">
              <img src="/gather.png" alt="Gather Project" className="media-image" />
              <div className="media-overlay">
                <h3 className="media-project-title">Gather</h3>
                <p className="media-project-description">AI-powered collaboration platform</p>
              </div>
            </div>
            
            <div className="media-item">
              <img src="/briefed.png" alt="Briefed Project" className="media-image" />
              <div className="media-overlay">
                <h3 className="media-project-title">Briefed</h3>
                <p className="media-project-description">Streamlined project management</p>
              </div>
            </div>
            
            <div className="media-item">
              <img src="/edecoration.png" alt="E-Decoration Project" className="media-image" />
              <div className="media-overlay">
                <h3 className="media-project-title">E-Decoration</h3>
                <p className="media-project-description">Digital interior design platform</p>
              </div>
            </div>
            
            <div className="media-item">
              <img src="/rg.png" alt="RG Law Firm Project" className="media-image" />
              <div className="media-overlay">
                <h3 className="media-project-title">RG Law Firm</h3>
                <p className="media-project-description">Professional legal services website</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className={styles.contactCtaSection}>
        <div className={styles.contactCtaContainer}>
          <h2 className={styles.contactCtaTitle}>Ready to Transform Your Business?</h2>
          <p className={styles.contactCtaSubtitle}>
            Stop losing customers to competitors with better websites. Our AI-powered design service delivers stunning, conversion-focused websites that turn visitors into paying customers—in minutes, not months.
          </p>
          
          <ul className={styles.contactCtaBenefits}>
            <li>Lightning-fast delivery in under 10 minutes</li>
            <li>Custom designs tailored to your brand</li>
            <li>SEO-optimized for maximum visibility</li>
            <li>Proven to increase conversion rates by 300%</li>
            <li>Money-back guarantee if you're not satisfied</li>
            <li>Mobile-responsive and fast-loading</li>
          </ul>

          <div className={styles.contactCtaUrgency}>
            <p className={styles.contactCtaUrgencyText}>
              <strong>Limited spots available this month.</strong> Don't let your competitors get ahead while you wait.
            </p>
          </div>

          <button className={styles.contactCtaButton}>Start Your Project Today</button>
          
          <div className={styles.contactCtaGuarantee}>
            <span className={styles.contactCtaGuaranteeIcon}>✓</span>
            <span className={styles.contactCtaGuaranteeText}>Free consultation • No hidden fees • 100% satisfaction guarantee</span>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles.contactComparisonSection}>
        <div className={styles.contactComparisonContainer}>
          <h2 className={styles.contactComparisonTitle}>Why Choose The Refresh Agency?</h2>
          <div className={styles.contactComparisonGrid}>
            <div className={`${styles.contactComparisonColumn} ${styles.left}`}>
              <h3>Other Agencies</h3>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.left}`}>✗</span>
                <span className={styles.contactComparisonText}>Months of delays and missed deadlines</span>
              </div>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.left}`}>✗</span>
                <span className={styles.contactComparisonText}>Generic templates that look like everyone else</span>
              </div>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.left}`}>✗</span>
                <span className={styles.contactComparisonText}>Poor communication and unclear processes</span>
              </div>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.left}`}>✗</span>
                <span className={styles.contactComparisonText}>Hidden costs and surprise charges</span>
              </div>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.left}`}>✗</span>
                <span className={styles.contactComparisonText}>No SEO optimization or conversion focus</span>
              </div>
            </div>
            <div className={`${styles.contactComparisonColumn} ${styles.right}`}>
              <h3>The Refresh Agency</h3>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.right}`}>✓</span>
                <span className={styles.contactComparisonText}>Lightning-fast delivery in minutes, not months</span>
              </div>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.right}`}>✓</span>
                <span className={styles.contactComparisonText}>Custom designs tailored to your brand</span>
              </div>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.right}`}>✓</span>
                <span className={styles.contactComparisonText}>Transparent process with clear communication</span>
              </div>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.right}`}>✓</span>
                <span className={styles.contactComparisonText}>Fixed pricing with no hidden fees</span>
              </div>
              <div className={styles.contactComparisonItem}>
                <span className={`${styles.contactComparisonIcon} ${styles.right}`}>✓</span>
                <span className={styles.contactComparisonText}>SEO-optimized and conversion-focused design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle CTA Link */}
      <div className={styles.subtleCtaLink}>
        <p>See how easy it is to get started. <a href="#" className={styles.subtleCtaAnchor}>Start your project now</a></p>
      </div>

      {/* Timeline Section */}
      <section className={styles.contactTimelineSection}>
        <div className={styles.contactTimelineContainer}>
          <h2 className={styles.contactTimelineTitle}>How It Works</h2>
          <div className={styles.contactTimelineWrapper}>
            <div className={styles.contactTimelineLine}></div>
            <div className={styles.contactTimelineItems}>
              <div className={styles.contactTimelineItem}>
                <div className={styles.contactTimelineNumber}>1</div>
                <div className={styles.contactTimelineContent}>
                  <h3 className={styles.contactTimelineStep}>Share Your Vision</h3>
                  <p className={styles.contactTimelineDescription}>
                    Tell us about your business, goals, and what makes you unique. We'll analyze your needs and create a custom strategy.
                  </p>
                </div>
              </div>
              <div className={styles.contactTimelineItem}>
                <div className={styles.contactTimelineNumber}>2</div>
                <div className={styles.contactTimelineContent}>
                  <h3 className={styles.contactTimelineStep}>AI-Powered Design</h3>
                  <p className={styles.contactTimelineDescription}>
                    Our advanced AI creates stunning, custom designs that perfectly represent your brand and convert visitors into customers.
                  </p>
                </div>
              </div>
              <div className={styles.contactTimelineItem}>
                <div className={styles.contactTimelineNumber}>3</div>
                <div className={styles.contactTimelineContent}>
                  <h3 className={styles.contactTimelineStep}>Lightning-Fast Delivery</h3>
                  <p className={styles.contactTimelineDescription}>
                    Get your professional website delivered in minutes, not months. Fast, efficient, and ready to launch.
                  </p>
                </div>
              </div>
              <div className={styles.contactTimelineItem}>
                <div className={styles.contactTimelineNumber}>4</div>
                <div className={styles.contactTimelineContent}>
                  <h3 className={styles.contactTimelineStep}>Launch & Grow</h3>
                  <p className={styles.contactTimelineDescription}>
                    Your website goes live with SEO optimization and conversion tracking. Watch your business grow with measurable results.
                  </p>
                </div>
              </div>
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
            <h2 className={styles.contactFooterCtaTitle}>Stop Losing Customers to Your Website</h2>
            <p className={styles.contactFooterCtaSubtitle}>
              Every day your website stays outdated, you're losing potential customers to competitors. 
              Don't let another day pass with a website that doesn't convert.
            </p>
            
            {/* 5 Star Badge */}
            <div className={styles.contactFooterCtaStars}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.starsText}>Rated 5 stars by our clients</span>
            </div>
            
            {/* Value Pills */}
            <div className={styles.contactFooterCtaPills}>
              <div className={styles.contactFooterCtaPill}>
                <span>Lightning Fast</span>
              </div>
              <div className={styles.contactFooterCtaPill}>
                <span>AI Powered</span>
              </div>
              <div className={styles.contactFooterCtaPill}>
                <span>Results Driven</span>
              </div>
            </div>
            
            <div className={styles.contactFooterCtaButtons}>
              <button className={`${styles.contactFooterCtaButton} ${styles.primary}`}>
                Transform My Website Now
              </button>
            </div>
            
            <p className={styles.contactFooterCtaGuarantee}>
              ✓ Free consultation • ✓ No hidden fees • ✓ Money-back guarantee
            </p>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className={styles.contactFooterCtaCopyright}>
          <div className={styles.contactFooterCtaCopyrightLine}></div>
          <p className={styles.contactFooterCtaCopyrightText}>
            © 2024 The Refresh Agency. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  )
}
