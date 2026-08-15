import { motion } from 'framer-motion'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

interface ThemeToggleProps {
  isDark: boolean
  toggleTheme: () => void
}

export default function ThemeToggle({ isDark, toggleTheme }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-24 right-8 z-40 w-12 h-12 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-xl hover:border-primary-500 transition"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <MdLightMode className="text-yellow-400" />
      ) : (
        <MdDarkMode className="text-blue-400" />
      )}
    </motion.button>
  )
}
