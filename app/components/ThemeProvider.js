'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({
  themeMode: 'system', // 'light' | 'dark' | 'system'
  resolvedTheme: 'dark', // actual theme being used
  setThemeMode: () => {},
  toggleTheme: () => {}, // keep for backward compatibility
})

export const useTheme = () => useContext(ThemeContext)

export default function ThemeProvider({ children }) {
  const [themeMode, setThemeModeState] = useState('system')
  const [resolvedTheme, setResolvedTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedMode = localStorage.getItem('theme-mode') || 'system'
    setThemeModeState(savedMode)

    // Apply the theme
    applyTheme(savedMode)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (themeMode === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [themeMode, mounted])

  const applyTheme = (mode) => {
    let theme
    if (mode === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      theme = mode
    }

    setResolvedTheme(theme)
    document.documentElement.setAttribute('data-theme', theme)

    // For backward compatibility
    localStorage.setItem('theme', theme)
  }

  const setThemeMode = (mode) => {
    setThemeModeState(mode)
    localStorage.setItem('theme-mode', mode)
    applyTheme(mode)
  }

  // Backward compatibility
  const toggleTheme = () => {
    const modes = ['light', 'system', 'dark']
    const currentIndex = modes.indexOf(themeMode)
    const nextMode = modes[(currentIndex + 1) % 3]
    setThemeMode(nextMode)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{
      themeMode,
      resolvedTheme,
      setThemeMode,
      toggleTheme,
      // Backward compatibility
      theme: resolvedTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
