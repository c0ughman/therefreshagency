'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.css'

const WordByWordAnimation = ({ children, className = '' }) => {
  const [visibleWords, setVisibleWords] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Timing variables for each word (in milliseconds)
  // Based on syllable count: 0.25 seconds per syllable
  const TIMING_VARIABLES = {
    beyond: 0,        // Shows immediately (0 syllables)
    websites: 300,     // After 0.5 seconds (2 syllables: web-sites)
    refreshing: 777,  // After 0.5 seconds (2 syllables: re-fresh-ing) 
    experiences: 1277, // After 0.75 seconds (3 syllables: ex-per-i-ences)
    that: 1777,       // After 1 second (1 syllable: that)
    convert: 1877      // After 0.25 seconds (2 syllables: con-vert)
  }

  // Split the text into words and clean them for matching
  const words = children.split(' ').map(word => word.replace(/[^\w]/g, ''))
  const originalWords = children.split(' ')

  useEffect(() => {
    setIsAnimating(true)
    
    // Show each word at its designated time
    Object.entries(TIMING_VARIABLES).forEach(([word, delay]) => {
      const wordIndex = words.findIndex(w => w.toLowerCase() === word)
      
      if (wordIndex !== -1) {
        setTimeout(() => {
          setVisibleWords(prev => [...prev, wordIndex])
        }, delay)
      }
    })

    // Clean up after animation completes
    const maxDelay = Math.max(...Object.values(TIMING_VARIABLES))
    setTimeout(() => {
      setIsAnimating(false)
    }, maxDelay + 1000)

  }, [])

  return (
    <h1 className={`${styles.titleHeader} ${className}`}>
      {/* First line: Beyond Websites */}
      <div className={styles.line}>
        {originalWords.slice(0, 2).map((word, index) => (
          <span key={index}>
            <span
              className={`${styles.word} ${visibleWords.includes(index) ? styles.visible : ''}`}
            >
              {word}
            </span>
            {index < 1 && <span> </span>}
          </span>
        ))}
      </div>
      
      {/* Second line: Refreshing Experiences */}
      <div className={styles.line}>
        {originalWords.slice(2, 4).map((word, index) => (
          <span key={index + 2}>
            <span
              className={`${styles.word} ${visibleWords.includes(index + 2) ? styles.visible : ''}`}
            >
              {word}
            </span>
            {index < 1 && <span> </span>}
          </span>
        ))}
      </div>
      
      {/* Third line: That Convert */}
      <div className={styles.line}>
        {originalWords.slice(4, 6).map((word, index) => (
          <span key={index + 4}>
            <span
              className={`${styles.word} ${visibleWords.includes(index + 4) ? styles.visible : ''}`}
            >
              {word}
            </span>
            {index < 1 && <span> </span>}
          </span>
        ))}
      </div>
    </h1>
  )
}

export default WordByWordAnimation
