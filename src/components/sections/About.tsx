import { motion } from 'framer-motion'
import { MdCheckCircle } from 'react-icons/md'

export default function About() {
  const achievements = [
    'NASM Certified Personal Trainer',
    '10+ Years of Fitness Experience',
    '500+ Clients Transformed',
    'Specialization in Strength & Conditioning',
    'Nutrition Certification Holder',
    'Online & Offline Training Expert',
  ]

  return (
    <section
      id="about"
      className="relative py-20 lg:py-32 bg-dark-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1566574236754-85a393cd8aa0?w=600&q=80"
                alt="Professional fitness trainer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30" />
              
              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-6 -right-6 glass rounded-xl p-6 max-w-xs"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <p className="text-sm text-gray-300 mb-2">
                  "Certified and dedicated to your fitness journey"
                </p>
                <p className="text-xs text-primary-400 font-semibold">- Elite Trainer Since 2014</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-block mb-6 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary-400 font-semibold text-sm">About Your Coach</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl lg:text-5xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-white">Meet Your </span>
              <span className="gradient-text">Fitness Coach</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              With over 10 years of experience in the fitness industry, I've dedicated my career to helping individuals achieve their health and wellness goals. My passion lies in creating personalized training programs that not only transform bodies but also inspire minds.
            </motion.p>

            {/* Mission Statement */}
            <motion.div
              className="glass rounded-lg p-6 mb-8 border-l-4 border-primary-500"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-primary-400 font-bold text-lg mb-2">My Mission</p>
              <p className="text-gray-300">
                To empower individuals through science-based fitness training, nutritional guidance, and motivational coaching that creates lasting lifestyle changes and builds confidence.
              </p>
            </motion.div>

            {/* Achievements Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MdCheckCircle className="text-primary-400 flex-shrink-0 mt-1" size={24} />
                  <span className="text-gray-300 font-medium">{achievement}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
