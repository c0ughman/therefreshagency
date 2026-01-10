'use client'

import './watches.css'

export default function WatchesPage() {
  return (
    <>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-links">
          <a href="#precision">Precision</a>
          <a href="#heritage">Heritage</a>
          <a href="#collection">Collection</a>
        </div>
        <div className="nav-logo">AXIOM</div>
      </nav>

      {/* Hero Section - Full Viewport */}
      <section className="hero">
        <div className="hero-content">
          <h1>Engineered Excellence</h1>
          <button className="hero-btn">Explore</button>
        </div>
      </section>

      {/* Three Column Features */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-col">
            <div className="feature-content">
              <h3>Precision Engineering</h3>
              <p>Swiss automatic movement with 72-hour power reserve. Every component machined to tolerances of 1/100mm.</p>
            </div>
            <a href="#precision" className="feature-link">
              Learn More
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="feature-col">
            <div className="feature-content">
              <h3>Refined Minimalism</h3>
              <p>Clean lines meet functional design. Grade 5 titanium case with anti-reflective sapphire crystal.</p>
            </div>
            <a href="#design" className="feature-link">
              Learn More
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="feature-col">
            <div className="feature-content">
              <h3>Lasting Value</h3>
              <p>Built to outlast trends. Designed for those who value substance over status, quality over quantity.</p>
            </div>
            <a href="#heritage" className="feature-link">
              Learn More
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Precision Section */}
      <section id="precision" className="precision">
        <div className="precision-content">
          <div className="precision-text">
            <span className="section-label">01 — Precision</span>
            <h2>Engineered to the Micron</h2>
            <p>
              Every component is manufactured to tolerances of 1/100mm. Our Swiss-made automatic movements
              undergo rigorous testing, ensuring accuracy within -2/+4 seconds per day. This is not just
              timekeeping—this is precision engineering at its finest.
            </p>
            <p>
              72-hour power reserve. 28,800 vibrations per hour. 26 jewels. Each specification chosen
              deliberately, each mechanism refined through decades of horological expertise.
            </p>
          </div>
          <div className="precision-visual">
            <div className="precision-image-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Bento Section */}
      <section className="bento">
        <div className="bento-grid">
          {/* Large feature */}
          <div className="bento-item large">
            <div className="bento-image-placeholder"></div>
            <div className="bento-text">
              <h4>Automatic Movement</h4>
              <p>Self-winding mechanical caliber</p>
            </div>
          </div>

          {/* Medium features */}
          <div className="bento-item medium">
            <div className="bento-number">316L</div>
            <div className="bento-text">
              <h4>Surgical Steel</h4>
              <p>Corrosion resistant</p>
            </div>
          </div>

          <div className="bento-item medium">
            <div className="bento-number">100M</div>
            <div className="bento-text">
              <h4>Water Resistance</h4>
              <p>ISO certified</p>
            </div>
          </div>

          {/* Tall feature */}
          <div className="bento-item tall">
            <div className="bento-image-placeholder dark"></div>
            <div className="bento-text">
              <h4>Sapphire Crystal</h4>
              <p>Scratch resistant, anti-reflective coating</p>
            </div>
          </div>

          {/* Wide feature */}
          <div className="bento-item wide">
            <div className="bento-text centered">
              <h4>Lifetime Warranty</h4>
              <p>Comprehensive coverage on all mechanical components</p>
            </div>
          </div>

          {/* Small features */}
          <div className="bento-item small">
            <div className="bento-text">
              <h4>42mm</h4>
              <p>Case diameter</p>
            </div>
          </div>

          <div className="bento-item small">
            <div className="bento-text">
              <h4>11mm</h4>
              <p>Case thickness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="heritage">
        <div className="heritage-content">
          <div className="heritage-visual">
            <div className="heritage-image-placeholder"></div>
          </div>
          <div className="heritage-text">
            <span className="section-label">02 — Heritage</span>
            <h2>Built on Legacy, Designed for Tomorrow</h2>
            <p>
              Our foundation rests on generations of watchmaking excellence. Each AXIOM timepiece embodies
              the meticulous craftsmanship of Swiss tradition while embracing modern materials and
              manufacturing techniques.
            </p>
            <p>
              Grade 5 titanium. Surgical steel. Anti-reflective sapphire. We honor the past by
              refusing to compromise on the future.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-brand">AXIOM</div>
            <p>Precision timepieces for the discerning.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Explore</h5>
              <a href="#collection">Collection</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-col">
              <h5>Support</h5>
              <a href="#warranty">Warranty</a>
              <a href="#service">Service</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
        </div>
        <div className="footer-image"></div>
      </footer>
    </>
  )
}
