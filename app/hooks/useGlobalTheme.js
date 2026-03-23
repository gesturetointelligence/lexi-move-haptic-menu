'use client'

import { useState, useEffect } from 'react'

export function useGlobalTheme() {
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Read the actual theme from localStorage/document
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const documentTheme = document.documentElement.getAttribute('data-theme') || savedTheme
    setTheme(documentTheme)

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme')
          if (newTheme) setTheme(newTheme)
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [])

  return { theme, mounted }
}
