import { useState, useEffect, useCallback } from 'react'

/**
 * A hook that syncs state with localStorage.
 * @param {string} key - The localStorage key.
 * @param {*} initialValue - Default value if key doesn't exist.
 */
export function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue])

  const [storedValue, setStoredValue] = useState(readValue)

  const setValue = useCallback(
    (value) => {
      try {
        const newValue = value instanceof Function ? value(storedValue) : value
        window.localStorage.setItem(key, JSON.stringify(newValue))
        setStoredValue(newValue)
        window.dispatchEvent(new Event('local-storage'))
      } catch (error) {
        console.warn(`useLocalStorage: error setting key "${key}"`, error)
      }
    },
    [key, storedValue],
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
      window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`useLocalStorage: error removing key "${key}"`, error)
    }
  }, [key, initialValue])

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('local-storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('local-storage', handleStorageChange)
    }
  }, [readValue])

  return [storedValue, setValue, removeValue]
}
