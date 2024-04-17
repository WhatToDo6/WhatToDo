import { useEffect, useRef, useState } from 'react'

type Ref = HTMLElement | null

type UseIntersectionObserver = [(element: Ref) => void, boolean]

export default function useIntersectionObserver(): UseIntersectionObserver {
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

  const observe = (element: Ref) => {
    if (observer.current && element) {
      observer.current.observe(element)
    }
  }

  return [observe, isScrolled]
}
