'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './styles.module.css'

// Shared state for the mobile menu across all hamburger instances
let sharedMenuState = {
  isOpen: false,
  listeners: new Set()
}

const HamburgerMenu = ({ className = '', contactLink = '/contact' }) => {
  const [isOpen, setIsOpen] = useState(sharedMenuState.isOpen)

  useEffect(() => {
    const updateState = () => setIsOpen(sharedMenuState.isOpen)
    sharedMenuState.listeners.add(updateState)
    
    return () => {
      sharedMenuState.listeners.delete(updateState)
      // Cleanup: remove class when component unmounts
      document.body.classList.remove('mobile-menu-open')
    }
  }, [])

  const toggleMenu = () => {
    sharedMenuState.isOpen = !sharedMenuState.isOpen
    sharedMenuState.listeners.forEach(listener => listener())
    
    // Add/remove class to body for CSS styling
    if (sharedMenuState.isOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
  }

  const closeMenu = () => {
    sharedMenuState.isOpen = false
    sharedMenuState.listeners.forEach(listener => listener())
    
    // Remove class from body
    document.body.classList.remove('mobile-menu-open')
  }

  return (
    <>
      <div className={`${styles.hamburgerContainer} ${className}`}>
        <button 
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>
      </div>
      
      {/* Only render the mobile menu once - check if this is the first instance */}
      {className.includes('hero') && isOpen && createPortal(
        <>
          {/* Always visible hamburger button when menu is open */}
          <div className={styles.alwaysVisibleHamburger}>
            <button 
              className={`${styles.hamburger} ${styles.open}`}
              onClick={closeMenu}
              aria-label="Close navigation menu"
            >
              <span className={styles.line}></span>
              <span className={styles.line}></span>
              <span className={styles.line}></span>
            </button>
          </div>
          
          <nav className={`${styles.mobileNav} ${styles.open}`}>
            <div className={styles.navContent}>
              <a href="#projects" onClick={closeMenu}>Portfolio</a>
              <a href="#reviews" onClick={closeMenu}>Reviews</a>
              <a href="#bento" onClick={closeMenu}>Products</a>
              <a href="#mission" onClick={closeMenu}>Mission</a>
              <a href={contactLink} onClick={closeMenu}>Let's Talk</a>
            </div>
          </nav>
          
          {/* Overlay to close menu when clicking outside */}
          <div className={styles.overlay} onClick={closeMenu}></div>
        </>,
        document.body
      )}
    </>
  )
}

export default HamburgerMenu
