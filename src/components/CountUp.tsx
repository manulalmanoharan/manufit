import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface CountUpProps {
  end: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export default function CountUp({
  end,
  suffix = '',
  prefix = '',
  label,
  duration = 2,
}: CountUpProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (inView && count === 0) {
      const steps = 60
      const stepValue = end / steps
      let current = 0

      intervalRef.current = setInterval(() => {
        current += stepValue
        if (current >= end) {
          setCount(end)
          if (intervalRef.current) clearInterval(intervalRef.current)
        } else {
          setCount(Math.floor(current))
        }
      }, (duration * 1000) / steps)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [inView, end, duration, count])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="text-sm text-gray-400">{label}</p>
    </motion.div>
  )
}
