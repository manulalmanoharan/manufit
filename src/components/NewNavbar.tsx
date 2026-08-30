import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

export default function NewNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold" style={{ color: '#3E332E' }}>
            Manu<span style={{ color: '#E1916F' }}>Fit</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium"
              style={{ color: '#3E332E' }}
            >
              What's Included
            </button>
            <button
              onClick={() => scrollToSection('trainer')}
              className="text-sm font-medium"
              style={{ color: '#3E332E' }}
            >
              About
            </button>
            <a
              href="/login"
              className="px-6 py-2 rounded-full font-medium text-white transition-colors"
              style={{ backgroundColor: '#3E332E' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2a261e')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3E332E')}
            >
              Client Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2"
            style={{ color: '#3E332E' }}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 border-t" style={{ borderColor: '#F1E4D8' }}>
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-4 py-2 text-sm font-medium"
              style={{ color: '#3E332E' }}
            >
              What's Included
            </button>
            <button
              onClick={() => scrollToSection('trainer')}
              className="block w-full text-left px-4 py-2 text-sm font-medium"
              style={{ color: '#3E332E' }}
            >
              About
            </button>
            <a
              href="/login"
              className="block w-full text-center px-4 py-2 rounded-full font-medium text-white"
              style={{ backgroundColor: '#3E332E' }}
            >
              Client Login
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
