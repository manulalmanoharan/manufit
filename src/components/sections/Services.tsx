import { motion } from 'framer-motion'
import {
  MdFitnessCenter,
  MdDirectionsRun,
  MdSelfImprovement,
  MdOutlineMonitor,
  MdOutlineRestaurant,
  MdBolt,
} from 'react-icons/md'
import { FiArrowRight } from 'react-icons/fi'

export default function Services() {
  const services = [
    {
      id: 1,
      icon: MdFitnessCenter,
      title: 'Personal Training',
      description: 'One-on-one customized workout programs designed specifically for your goals and fitness level.',
      color: 'from-primary-500 to-orange-500',
    },
    {
      id: 2,
      icon: MdDirectionsRun,
      title: 'Weight Loss Coaching',
      description: 'Comprehensive weight management programs combining exercise, nutrition, and behavioral coaching.',
      color: 'from-secondary-500 to-red-500',
    },
    {
      id: 3,
      icon: MdBolt,
      title: 'Muscle Building',
      description: 'Progressive strength training programs to build lean muscle mass and improve body composition.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 4,
      icon: MdOutlineMonitor,
      title: 'Online Coaching',
      description: 'Flexible remote training sessions with personalized workout plans and progress tracking.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 5,
      icon: MdOutlineRestaurant,
      title: 'Nutrition Planning',
      description: 'Custom meal plans and nutritional guidance tailored to your fitness goals and dietary preferences.',
      color: 'from-green-500 to-teal-500',
    },
    {
      id: 6,
      icon: MdSelfImprovement,
      title: 'Strength & Conditioning',
      description: 'Specialized training for athletic performance, power development, and functional fitness.',
      color: 'from-purple-500 to-pink-500',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="services"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
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
            <span className="text-primary-400 font-semibold text-sm">Our Services</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Comprehensive </span>
            <span className="gradient-text">Fitness Solutions</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our range of professional services designed to help you achieve your fitness goals and transform your lifestyle.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                className="group relative"
                variants={itemVariants}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition duration-500" />

                {/* Card */}
                <motion.div
                  className="relative glass rounded-2xl p-8 border border-dark-700 group-hover:border-primary-500/50 transition duration-300 h-full flex flex-col"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:shadow-lg transition duration-300`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon size={32} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>

                  {/* Learn More Button */}
                  <motion.button
                    className="inline-flex items-center gap-2 text-primary-400 font-semibold text-sm hover:text-primary-300 group/btn"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <FiArrowRight className="group-hover/btn:translate-x-1 transition" />
                  </motion.button>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">
            Not sure which service is right for you?
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-lg btn-glow inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Free Consultation
            <FiArrowRight />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
