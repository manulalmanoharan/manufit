import { useState } from 'react'
import { motion } from 'framer-motion'
import { MdSend, MdPhone, MdEmail, MdLocationOn, MdSchedule } from 'react-icons/md'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', goal: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: MdPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MdEmail,
      label: 'Email',
      value: 'info@elitefitnespro.com',
      href: 'mailto:info@elitefitnespro.com',
    },
    {
      icon: MdLocationOn,
      label: 'Location',
      value: '123 Fitness Avenue, New York, NY 10001',
      href: '#',
    },
    {
      icon: MdSchedule,
      label: 'Hours',
      value: 'Mon-Fri: 6AM - 10PM, Sat-Sun: 8AM - 8PM',
      href: '#',
    },
  ]

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-32 bg-dark-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary-400 font-semibold text-sm">Get in Touch</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-white">Ready to Start Your </span>
            <span className="gradient-text">Transformation?</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Fill out the form below or contact us directly. We'd love to hear from you and help you achieve your fitness goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="glass rounded-2xl p-8 border border-dark-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition outline-none"
                    placeholder="John Doe"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition outline-none"
                    placeholder="john@example.com"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </motion.div>

                {/* Fitness Goal */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">
                    Fitness Goal
                  </label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition outline-none"
                  >
                    <option value="">Select a goal</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="strength">Strength Building</option>
                    <option value="endurance">Endurance</option>
                    <option value="general-fitness">General Fitness</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-white mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-3 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition outline-none resize-none"
                    placeholder="Tell me about your fitness journey and goals..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 btn-glow group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  {submitted ? 'Message Sent! ✓' : 'Send Message'}
                  <MdSend className="group-hover:translate-x-1 transition" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="glass rounded-lg p-6 border border-dark-700 hover:border-primary-500/50 transition group flex items-start gap-4"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white flex-shrink-0 group-hover:shadow-lg transition">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold mb-1">
                      {info.label}
                    </p>
                    <p className="text-white font-semibold group-hover:text-primary-400 transition">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}

            {/* Additional Info */}
            <motion.div
              className="glass rounded-lg p-6 border border-dark-700 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-primary-400">Response Time:</span> I respond to all inquiries within 24 hours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
