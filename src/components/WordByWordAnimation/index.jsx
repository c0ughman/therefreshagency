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
    convert: 1877,      // After 0.25 seconds (2 syllables: con-vert)
    más: 0,           // Shows immediately
    allá: 300,        // After 0.3 seconds
    de: 500,          // After 0.5 seconds
    sitios: 700,      // After 0.7 seconds
    web: 1000,        // After 1 second
    experiencias: 1277, // After 1.277 seconds
    refrescantes: 1777, // After 1.777 seconds
    que: 2200,        // After 2.2 seconds
    convierten: 2400   // After 2.4 seconds
  }

  // Split the text into words and clean them for matching
  const words = children.split(' ').map(word =>
    word.replace(/[^\w\u00C0-\u017F]/g, '') // Include accented characters
  )
  const originalWords = children.split(' ')

  useEffect(() => {
    setIsAnimating(true)

    // Detect if Spanish and show all words sequentially
    const isSpanishText = originalWords.some(word =>
      ['más', 'allá', 'experiencias', 'refrescantes', 'venden'].includes(
        word.toLowerCase().replace(/[^\w\u00C0-\u017F]/g, '')
      )
    )

    if (isSpanishText) {
      // For Spanish, show words sequentially
      const spanishTimings = [0, 300, 500, 700, 1000, 1277, 1777, 2200, 2400]
      originalWords.forEach((word, index) => {
        setTimeout(() => {
          setVisibleWords(prev => [...prev, index])
        }, spanishTimings[index] || index * 300)
      })
    } else {
      // For English, use the original timing logic
      Object.entries(TIMING_VARIABLES).forEach(([word, delay]) => {
        const wordIndex = words.findIndex(w => w.toLowerCase() === word.toLowerCase())

        if (wordIndex !== -1) {
          setTimeout(() => {
            setVisibleWords(prev => [...prev, wordIndex])
          }, delay)
        }
      })
    }

    // Clean up after animation completes
    const maxDelay = isSpanishText ? 2400 : Math.max(...Object.values(TIMING_VARIABLES))
    setTimeout(() => {
      setIsAnimating(false)
    }, maxDelay + 1000)

  }, [])

  // Detect language and set appropriate line structure
  const isSpanish = originalWords.some(word =>
    ['más', 'allá', 'experiencias', 'refrescantes', 'venden'].includes(
      word.toLowerCase().replace(/[^\w\u00C0-\u017F]/g, '')
    )
  )

  let lineStructure
  if (isSpanish) {
    // Spanish: "Más Allá de Sitios Web," / "Experiencias Refrescantes" / "Que Venden"
    lineStructure = [
      { start: 0, end: 5 }, // "Más Allá de Sitios Web,"
      { start: 5, end: 7 }, // "Experiencias Refrescantes"
      { start: 7, end: 9 }  // "Que Venden"
    ]
  } else {
    // English: "Beyond Websites" / "Refreshing Experiences" / "That Convert"
    lineStructure = [
      { start: 0, end: 2 }, // "Beyond Websites"
      { start: 2, end: 4 }, // "Refreshing Experiences"
      { start: 4, end: 6 }  // "That Convert"
    ]
  }

  return (
    <h1 className={`${styles.titleHeader} ${className}`}>
      {lineStructure.map((line, lineIndex) => (
        <div key={lineIndex} className={styles.line}>
          {originalWords.slice(line.start, line.end).map((word, wordIndex) => {
            const globalIndex = line.start + wordIndex
            return (
              <span key={globalIndex}>
                <span
                  className={`${styles.word} ${visibleWords.includes(globalIndex) ? styles.visible : ''}`}
                >
                  {word}
                </span>
                {wordIndex < line.end - line.start - 1 && <span> </span>}
              </span>
            )
          })}
        </div>
      ))}
    </h1>
  )
}

export default WordByWordAnimation
