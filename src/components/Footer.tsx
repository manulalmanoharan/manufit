import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { MdPhone, MdEmail, MdLocationOn, MdSchedule } from 'react-icons/md'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ]

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'Programs', href: '#' },
        { label: 'Gallery', href: '#' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Personal Training', href: '#' },
        { label: 'Weight Loss Coaching', href: '#' },
        { label: 'Muscle Building', href: '#' },
        { label: 'Online Coaching', href: '#' },
        { label: 'Nutrition Planning', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Disclaimer', href: '#' },
      ],
    },
  ]

  const contactInfo = [
    { icon: MdPhone, label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MdEmail, label: 'info@elitefitnespro.com', href: 'mailto:info@elitefitnespro.com' },
    { icon: MdLocationOn, label: '123 Fitness Avenue, New York, NY 10001', href: '#' },
    { icon: MdSchedule, label: 'Mon-Fri: 6AM - 10PM, Sat-Sun: 8AM - 8PM', href: '#' },
  ]

  return (
    <footer className="bg-dark-950 border-t border-dark-700">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                EF
              </div>
              <span className="text-xl font-bold gradient-text">Elite Fitness</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Transform your body and mind with personalized training programs and expert coaching.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-bold mb-6 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-t border-dark-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {contactInfo.map((info) => (
            <a
              key={info.label}
              href={info.href}
              className="flex items-start gap-3 text-gray-300 hover:text-primary-400 transition group"
            >
              <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition flex-shrink-0 mt-1">
                <info.icon size={18} />
              </div>
              <span className="text-sm">{info.label}</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-dark-900 border-t border-dark-700 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {currentYear} Elite Fitness Pro. All rights reserved. Designed with ❤️
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-400 transition">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
