import { useEffect, useRef, useState } from 'react'

export default function useIntersectionObserver() {
  const [isScrolled, setIsScrolled] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        setIsScrolled(entry.isIntersecting)
      })
    }

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 1,
    })

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  const observe = (element: HTMLElement) => {
    if (observer.current && element) {
      observer.current.observe(element)
    }
  }

  return { observe, isScrolled }
}
