'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  
  // Extract the current language from the path
  const currentLang = pathname.startsWith('/es') ? 'es' : 'en'
  
  // Create the alternate path
  const alternatePath = currentLang === 'en' 
    ? pathname.replace('/en', '/es') 
    : pathname.replace('/es', '/en')
  
  return (
    <div className="language-switcher">
      <Link 
        href={alternatePath}
        className={`lang-link ${currentLang === 'en' ? 'active' : ''}`}
      >
        EN
      </Link>
      <span className="lang-separator">|</span>
      <Link 
        href={alternatePath}
        className={`lang-link ${currentLang === 'es' ? 'active' : ''}`}
      >
        ES
      </Link>
    </div>
  )
}
