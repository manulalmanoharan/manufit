import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function CTA() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Main Heading */}
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Ready To Start Your </span>
            <span className="gradient-text">Fitness Journey?</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join hundreds of satisfied clients who've transformed their bodies and lives through personalized training and expert coaching.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-10 py-5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-lg rounded-lg flex items-center gap-3 btn-glow group w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Free Consultation
              <FiArrowRight className="group-hover:translate-x-1 transition" size={20} />
            </motion.button>

            <motion.button
              className="px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white/10 transition w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn About Programs
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="mt-16 pt-12 border-t border-dark-700 flex flex-wrap justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-400 mb-2">500+</p>
              <p className="text-sm text-gray-400">Clients Trained</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-400 mb-2">98%</p>
              <p className="text-sm text-gray-400">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-400 mb-2">10+</p>
              <p className="text-sm text-gray-400">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-400 mb-2">24/7</p>
              <p className="text-sm text-gray-400">Support Available</p>
            </div>
          </motion.div>

          {/* Guarantee */}
          <motion.div
            className="mt-12 glass rounded-xl p-6 border border-dark-700 inline-block max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm md:text-base text-gray-300">
              <span className="text-primary-400 font-semibold">✓ 90-Day Guarantee:</span> Follow your program and see results, or we'll work with you for free. That's how confident we are.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
