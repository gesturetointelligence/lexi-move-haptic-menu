'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MagicWand, PencilSimpleLine, PenNib } from '@phosphor-icons/react'
import './styles.css'

export default function HapticRadialMenu() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [selectedOption, setSelectedOption] = useState(null)
  const longPressTimer = useRef(null)
  const containerRef = useRef(null)
  const isLongPress = useRef(false)

  const triggerHaptic = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }, [])

  const handleStart = useCallback((e) => {
    e.preventDefault()
    isLongPress.current = false

    const getPosition = (event) => {
      if (event.touches) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY }
      }
      return { x: event.clientX, y: event.clientY }
    }

    const pos = getPosition(e)

    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true
      setMenuPosition(pos)
      setMenuVisible(true)
      triggerHaptic()
    }, 500) // 500ms long press
  }, [triggerHaptic])

  const handleEnd = useCallback((e) => {
    e.preventDefault()

    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }

    if (menuVisible && selectedOption) {
      console.log(`Selected: ${selectedOption}`)
      triggerHaptic()
    }

    setMenuVisible(false)
    setSelectedOption(null)
    isLongPress.current = false
  }, [menuVisible, selectedOption, triggerHaptic])

  const handleMove = useCallback((e) => {
    if (!menuVisible) return

    const getPosition = (event) => {
      if (event.touches) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY }
      }
      return { x: event.clientX, y: event.clientY }
    }

    const currentPos = getPosition(e)
    const dx = currentPos.x - menuPosition.x
    const dy = currentPos.y - menuPosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance > 40) { // Detection radius
      const angle = Math.atan2(dy, dx) * 180 / Math.PI

      // Determine which option based on angle
      // Top: -60 to -120 degrees
      // Left: 120 to 180 or -180 to -150 degrees
      // Right: -30 to 30 degrees

      let newSelection = null
      if (angle >= -120 && angle <= -60) {
        newSelection = 'style'
      } else if ((angle >= 150 || angle <= -150)) {
        newSelection = 'rewrite'
      } else if (angle >= -30 && angle <= 30) {
        newSelection = 'new-card'
      }

      if (newSelection !== selectedOption) {
        setSelectedOption(newSelection)
        if (newSelection) {
          triggerHaptic()
        }
      }
    } else {
      setSelectedOption(null)
    }
  }, [menuVisible, menuPosition, selectedOption, triggerHaptic])

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
    }
  }, [])

  const menuOptions = [
    {
      id: 'rewrite',
      icon: <MagicWand size={24} weight="bold" />,
      label: 'Rewrite',
      position: 'left'
    },
    {
      id: 'new-card',
      icon: <PencilSimpleLine size={24} weight="bold" />,
      label: 'New Card',
      position: 'right'
    },
    {
      id: 'style',
      icon: <PenNib size={24} weight="bold" />,
      label: 'Style',
      position: 'top'
    }
  ]

  return (
    <div className="experiment-content">
      <div
        ref={containerRef}
        className="touch-area"
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseMove={handleMove}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onTouchMove={handleMove}
        onTouchCancel={handleEnd}
      >

        {menuVisible && (
          <div
            className="radial-menu"
            style={{
              left: `${menuPosition.x}px`,
              top: `${menuPosition.y}px`,
            }}
          >
            <div className="menu-center" />

            {menuOptions.map((option) => (
              <div
                key={option.id}
                className={`menu-option ${option.position} ${selectedOption === option.id ? 'selected' : ''}`}
              >
                <div className="option-icon">
                  {option.icon}
                </div>
                <span className="option-label">{option.label}</span>
              </div>
            ))}

            <svg className="menu-bg" width="200" height="200" viewBox="-100 -100 200 200">
              <circle cx="0" cy="0" r="80" fill="none" stroke="var(--lexi-border)" strokeWidth="1" opacity="0.2" />
            </svg>
          </div>
        )}
      </div>

      <div className="bottom-instructions">
        <p>Long press anywhere to activate the radial menu and then drag to select.</p>
      </div>
    </div>
  )
}
