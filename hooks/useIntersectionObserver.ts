import { RefObject, useState, useEffect } from 'react'

/** @doc 참고: https://usehooks-ts.com/react-hook/use-intersection-observer */
function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = '0%', enableObserver = true },
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!node || !hasIOSupport) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [
    elementRef?.current,
    root,
    rootMargin,
    JSON.stringify(threshold),
    enableObserver,
  ])

  return entry
}

export default useIntersectionObserver
