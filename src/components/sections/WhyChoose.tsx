import { motion } from 'framer-motion'
import {
  MdVerified,
  MdSchool,
  MdSchedule,
  MdSupport,
  MdOutlineTrendingUp,
  MdEmojiFoodActivityOutlined,
} from 'react-icons/md'

export default function WhyChoose() {
  const reasons = [
    {
      id: 1,
      icon: MdVerified,
      title: 'Certified Trainer',
      description: 'NASM certified with 10+ years of professional experience in fitness coaching and personal training.',
    },
    {
      id: 2,
      icon: MdSchool,
      title: 'Personalized Plans',
      description: 'Every program is custom-designed based on your goals, fitness level, and lifestyle requirements.',
    },
    {
      id: 3,
      icon: MdSchedule,
      title: 'Flexible Scheduling',
      description: 'Train at your convenience with flexible session times that fit your busy lifestyle.',
    },
    {
      id: 4,
      icon: MdSupport,
      title: 'Online Support',
      description: '24/7 chat support, progress tracking, and personalized guidance throughout your fitness journey.',
    },
    {
      id: 5,
      icon: MdOutlineTrendingUp,
      title: 'Proven Results',
      description: 'Documented transformation results with 98% client success rate and long-term lifestyle changes.',
    },
    {
      id: 6,
      icon: MdEmojiFoodActivityOutlined,
      title: 'Nutrition Expertise',
      description: 'Comprehensive nutrition planning and guidance integrated with your training program.',
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
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-dark-900 to-dark-800 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

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
            className="inline-block mb-4 px-4 py-2 bg-accent/20 border border-accent/50 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-accent font-semibold text-sm">Why Choose Us</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-white">Why I'm Different from </span>
            <span className="gradient-text">Other Trainers</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover what sets our coaching apart and why hundreds of clients have transformed their bodies and lives.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.id}
                className="group relative"
                variants={itemVariants}
              >
                {/* Card */}
                <motion.div
                  className="relative glass rounded-2xl p-8 border border-dark-700 group-hover:border-primary-500/50 transition h-full flex flex-col"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon Container */}
                  <motion.div
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 mb-6 group-hover:border-primary-500 transition"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon size={32} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                    {reason.description}
                  </p>

                  {/* Accent Line */}
                  <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition duration-300" />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Guarantee Section */}
        <motion.div
          className="glass rounded-2xl p-8 md:p-12 border border-dark-700 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              💪 90-Day Transformation Guarantee
            </motion.p>
            <p className="text-gray-300 mb-6">
              Follow your personalized program consistently, and you'll see noticeable results within 90 days. If you don't see progress, we'll adjust your plan for free. That's how confident I am in our approach.
            </p>
            <div className="flex justify-center gap-4 flex-wrap text-sm">
              <span className="px-4 py-2 bg-primary-500/20 border border-primary-500/50 rounded-full text-primary-400 font-semibold">
                ✓ Full Refund Policy
              </span>
              <span className="px-4 py-2 bg-secondary-500/20 border border-secondary-500/50 rounded-full text-secondary-400 font-semibold">
                ✓ No Hidden Fees
              </span>
              <span className="px-4 py-2 bg-accent/20 border border-accent/50 rounded-full text-accent font-semibold">
                ✓ Lifetime Support
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
