import { createContext, useContext, useState } from 'react'

const ThemeCtx = createContext(null)

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('theme-mode') || 'light')

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme-mode', next)
      return next
    })
  }

  return <ThemeCtx.Provider value={{ mode, toggleMode }}>{children}</ThemeCtx.Provider>
}

export const useThemeMode = () => useContext(ThemeCtx)
