'use client'

import { useTheme } from "@/providers/themeProvider"

export default function ThemeToggleButton() {
  const { theme, toggleTheme } =
    useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="w-full p-4 rounded mb-8"
      style={{
        background: 'var(--button)',
        color: 'white',
      }}
    >
      {theme === 'light'
        ? 'Włącz ciemny motyw'
        : 'Włącz jasny motyw'}
    </button>
  )
}