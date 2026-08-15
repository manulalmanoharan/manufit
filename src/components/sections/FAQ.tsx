import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdAdd, MdRemove } from 'react-icons/md'

export default function FAQ() {
  const faqs = [
    {
      id: 1,
      question: 'How often should I train per week?',
      answer:
        'It depends on your fitness level and goals. Beginners should start with 3 sessions per week, intermediate trainers 4-5 sessions, and advanced athletes 5-6 sessions. We customize the frequency based on your schedule and recovery capacity.',
    },
    {
      id: 2,
      question: 'Do I need to follow a strict diet?',
      answer:
        'Not necessarily strict, but consistent. We create flexible nutrition plans that fit your lifestyle and preferences. The goal is sustainable habits, not restrictive dieting. We focus on 80/20 rule - 80% healthy choices, 20% flexibility.',
    },
    {
      id: 3,
      question: 'Is online coaching as effective as in-person training?',
      answer:
        'Yes, absolutely! With online coaching, you get personalized programming, video form checks, progress tracking, and 24/7 support. Many clients achieve the same results or better due to program consistency.',
    },
    {
      id: 4,
      question: 'How long until I see results?',
      answer:
        'You can feel results within 2 weeks (energy, strength increases), see visible changes in 4-6 weeks, and significant transformations in 8-12 weeks with consistent training and nutrition.',
    },
    {
      id: 5,
      question: 'Can I cancel my membership anytime?',
      answer:
        'Yes, there are no long-term contracts. You can cancel anytime with 7 days notice. However, we offer a 90-day guarantee - if you follow the program and don\'t see results, we\'ll work with you for free.',
    },
    {
      id: 6,
      question: 'What if I have an injury or physical limitation?',
      answer:
        'We can modify any program for injuries or limitations. We work with physical therapists and trainers specializing in rehabilitation. Your safety and progression are our priorities.',
    },
  ]

  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section
      id="faq"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-dark-800 to-dark-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

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
            <span className="text-secondary-400 font-semibold text-sm">FAQ</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-white">Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our training programs, nutrition guidance, and coaching services.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Question Button */}
              <motion.button
                onClick={() => toggleFaq(faq.id)}
                className="w-full glass rounded-lg p-6 border border-dark-700 group-hover:border-primary-500/50 transition flex items-center justify-between text-left"
                whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.05)' }}
              >
                <h3 className="text-lg font-bold text-white pr-4">{faq.question}</h3>
                <motion.div
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white flex-shrink-0"
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedId === faq.id ? (
                    <MdRemove size={20} />
                  ) : (
                    <MdAdd size={20} />
                  )}
                </motion.div>
              </motion.button>

              {/* Answer */}
              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="glass rounded-b-lg border border-t-0 border-dark-700 p-6 border-dark-700 group-hover:border-primary-500/50 transition">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Please contact us.
          </p>
          <motion.button
            className="px-8 py-3 border-2 border-primary-500 text-primary-400 font-bold rounded-lg hover:bg-primary-500/10 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
