'use client'

import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import { Moon, Sun, Desktop } from '@phosphor-icons/react'

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useContext(ThemeContext)

  const handleClick = () => {
    // Cycle through: light -> system -> dark -> light
    const nextMode = themeMode === 'light' ? 'system' : themeMode === 'system' ? 'dark' : 'light'
    setThemeMode(nextMode)
  }

  const getIcon = () => {
    if (themeMode === 'system') {
      return <Desktop size={16} weight="bold" />
    }
    if (themeMode === 'light') {
      return <Sun size={16} weight="bold" />
    }
    return <Moon size={16} weight="bold" />
  }

  const getLabel = () => {
    if (themeMode === 'system') return 'System theme'
    if (themeMode === 'light') return 'Light theme'
    return 'Dark theme'
  }

  return (
    <div className="theme-toggle">
      <button
        type="button"
        aria-label={`Current: ${getLabel()}. Click to change theme`}
        title={getLabel()}
        onClick={handleClick}
        style={{
          position: 'relative',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: 'var(--lexi-fg-muted)',
          transition: 'color 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--lexi-accent)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--lexi-fg-muted)'}
      >
        {getIcon()}
      </button>
    </div>
  )
}
