"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  end: number
  decimals?: number
  duration?: number
  className?: string
}

export default function CountUp({ end, decimals = 0, duration = 2000, className }: Props) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (end === 0) { setCount(0); return }

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setCount(parseFloat((eased * end).toFixed(decimals)))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [end, decimals, duration])

  return <span className={className}>{count.toFixed(decimals)}</span>
}
