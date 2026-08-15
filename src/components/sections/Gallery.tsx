import { motion } from 'framer-motion'
import { MdZoomIn } from 'react-icons/md'

export default function Gallery() {
  const galleryImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80',
      title: 'Heavy Lifting Session',
      category: 'Strength Training',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&q=80',
      title: 'HIIT Cardio Workout',
      category: 'Cardio',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1552196881-acbed25f4b34?w=500&q=80',
      title: 'CrossFit Training',
      category: 'Functional Training',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80',
      title: 'Stretching & Recovery',
      category: 'Recovery',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80',
      title: 'Client Transformation',
      category: 'Success',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1578472657481-cebcad084746?w=500&q=80',
      title: 'Group Training Session',
      category: 'Group Classes',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="gallery"
      className="relative py-20 lg:py-32 bg-dark-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

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
            <span className="text-primary-400 font-semibold text-sm">Fitness Gallery</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-white">Gym Sessions & </span>
            <span className="gradient-text">Transformations</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Browse through our gallery of training sessions, client achievements, and workout highlights.
          </p>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {galleryImages.map((item) => (
            <motion.div
              key={item.id}
              className="group relative h-72 rounded-xl overflow-hidden"
              variants={itemVariants}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

              {/* Content */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 transition duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <p className="text-xs text-primary-400 font-semibold mb-2 uppercase tracking-wider">
                  {item.category}
                </p>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              </motion.div>

              {/* Zoom Icon */}
              <motion.div
                className="absolute top-4 right-4 w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"
                whileHover={{ scale: 1.1 }}
              >
                <MdZoomIn size={20} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-lg btn-glow">
            View Full Gallery
          </button>
        </motion.div>
      </div>
    </section>
  )
}
