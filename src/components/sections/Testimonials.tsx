import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdStar, MdChevronLeft, MdChevronRight } from 'react-icons/md'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'John Anderson',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 5,
      text: 'This training program completely transformed my fitness journey. The personalized approach and dedication from my coach was outstanding. I recommend it to everyone!',
    },
    {
      id: 2,
      name: 'Lisa Chen',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      rating: 5,
      text: 'I achieved my dream body in just 6 months! The nutrition guidance combined with the training program was the perfect combination. Worth every penny!',
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      rating: 5,
      text: 'Best investment I made for my health. The online coaching is flexible and the support is incredible. My strength has increased dramatically!',
    },
    {
      id: 4,
      name: 'Emily Watson',
      role: 'Fitness Enthusiast',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      rating: 5,
      text: 'The coaching style is motivating and professional. I love how adaptive the programs are to my progress. Highly recommended!',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const current = testimonials[currentIndex]

  return (
    <section className="relative py-20 lg:py-32 bg-dark-900 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-secondary-500/10 border border-secondary-500/30 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-secondary-400 font-semibold text-sm">Client Stories</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-white">What Our </span>
            <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="glass rounded-2xl p-8 md:p-12 border border-dark-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Rating */}
              <div className="flex gap-2 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <MdStar className="text-yellow-400" size={24} />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl text-gray-200 mb-8 leading-relaxed italic">
                "{current.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.img
                  src={current.image}
                  alt={current.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div>
                  <p className="text-lg font-bold text-white">{current.name}</p>
                  <p className="text-sm text-gray-400">{current.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-primary-400 hover:bg-primary-500/10 transition group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <MdChevronLeft size={24} className="group-hover:-translate-x-1 transition" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    i === currentIndex ? 'bg-primary-500' : 'bg-dark-700'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-primary-400 hover:bg-primary-500/10 transition group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <MdChevronRight size={24} className="group-hover:translate-x-1 transition" />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="text-center mt-6 text-gray-400 text-sm">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="grid grid-cols-3 gap-6 mt-16 pt-16 border-t border-dark-700 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-3xl font-bold text-primary-400 mb-2">4.9/5</p>
            <p className="text-sm text-gray-400">Average Rating</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-400 mb-2">500+</p>
            <p className="text-sm text-gray-400">Happy Clients</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-400 mb-2">98%</p>
            <p className="text-sm text-gray-400">Success Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
