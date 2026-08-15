import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiMenu, FiX } from 'react-icons/fi'
import { MdMailOutline, MdPhone } from 'react-icons/md'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { label: 'Home', to: 'home' },
    { label: 'About', to: 'about' },
    { label: 'Services', to: 'services' },
    { label: 'Programs', to: 'programs' },
    { label: 'Gallery', to: 'gallery' },
    { label: 'FAQ', to: 'faq' },
    { label: 'Contact', to: 'contact' },
  ]

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:flex bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-sm py-2 px-8 justify-end gap-8">
        <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary-100 transition">
          <MdPhone size={16} />
          +1 (555) 123-4567
        </a>
        <a href="mailto:info@elitefitnespro.com" className="flex items-center gap-2 hover:text-primary-100 transition">
          <MdMailOutline size={16} />
          info@elitefitnespro.com
        </a>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-900/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-gradient-to-b from-dark-900/80 to-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              EF
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">Elite Fitness</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="text-gray-300 hover:text-primary-400 cursor-pointer transition font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg btn-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Free Consultation
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white text-2xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-dark-800/95 backdrop-blur-md"
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="text-gray-300 hover:text-primary-400 cursor-pointer transition font-medium py-2 border-b border-dark-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg btn-glow">
              Book Free Consultation
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Navbar Spacing */}
      <div className="h-20 md:h-24" />
    </>
  )
}
