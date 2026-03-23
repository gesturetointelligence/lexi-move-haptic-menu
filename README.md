# lexi-move-haptic-menu

A Procreate-style long-press radial menu with haptic feedback.

---

## What It Is

A gesture-driven radial menu activated by long press. Hold anywhere for 500ms to summon a three-option radial menu, then drag to select. Haptic feedback fires on open and on each option hover via the Vibration API. Angle-based selection maps left/right/top positions to Rewrite, New Card, and Style actions.

### How it works

- **Long press** (500ms) opens the menu at the press point
- **Drag** outward past 40px to enter selection zone
- **Angle detection** determines which option is highlighted
- **Haptic pulse** (10ms vibration) on menu open and option change
- **Release** to confirm selection

## How to Run

```bash
npm install
npm run dev
```

## What It Connects To

Exploring gestural interaction patterns for Magic — specifically context menus that feel native and physical on mobile.

## Authors

- Ravi

## Date

2026-03-21
