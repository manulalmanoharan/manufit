import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Transformations from './components/sections/Transformations'
import Programs from './components/sections/Programs'
import Testimonials from './components/sections/Testimonials'
import WhyChoose from './components/sections/WhyChoose'
import Gallery from './components/sections/Gallery'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import CTA from './components/sections/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Set initial theme
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <Navbar />
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Services />
      <Transformations />
      <Programs />
      <Testimonials />
      <WhyChoose />
      <Gallery />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  )
}

export default App
