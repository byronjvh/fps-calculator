import { useEffect } from 'react'

export function useClickOutside (ref, updateOpen) {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      updateOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
}
