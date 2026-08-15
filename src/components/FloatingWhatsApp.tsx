import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

export default function FloatingWhatsApp() {
  const phoneNumber = '+1 (555) 123-4567'
  const message = 'Hi! I would like to book a free consultation.'

  const handleClick = () => {
    const whatsappURL = `https://wa.me/15551234567?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, '_blank')
  }

  return (
    <AnimatePresence>
      <motion.button
        onClick={handleClick}
        className="fixed bottom-8 right-8 z-30 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp size={28} />
      </motion.button>
    </AnimatePresence>
  )
}
