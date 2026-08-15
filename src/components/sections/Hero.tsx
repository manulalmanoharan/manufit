import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import CountUp from './CountUp'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-secondary-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-block mb-6 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary-400 font-semibold text-sm">🎯 Transform Your Life</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Transform Your </span>
            <span className="gradient-text">Body.</span>
            <br />
            <span className="text-white">Transform Your </span>
            <span className="gradient-text">Life.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Personalized training programs, nutrition guidance, and expert coaching to help you achieve your fitness goals and transform your life completely.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 btn-glow group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Free Consultation
              <FiArrowRight className="group-hover:translate-x-1 transition" />
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-primary-500 text-primary-400 font-bold rounded-lg hover:bg-primary-500/10 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Programs
            </motion.button>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-dark-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CountUp end={500} suffix="+" label="Clients Trained" />
            <CountUp end={10} suffix="+" label="Years Experience" />
            <CountUp end={98} suffix="%" label="Success Rate" />
          </motion.div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          className="flex-1 hidden lg:block relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
            {/* Hero Image - Using a placeholder, replace with actual image */}
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"
              alt="Fitness trainer demonstrating exercise"
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/40 to-secondary-500/40" />
            {/* Floating Element */}
            <motion.div
              className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-primary-400">
          <span className="text-sm font-semibold">Scroll to explore</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
