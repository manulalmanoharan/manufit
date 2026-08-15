import { motion } from 'framer-motion'
import { MdCheckCircle, MdStar } from 'react-icons/md'
import { FiArrowRight } from 'react-icons/fi'

export default function Programs() {
  const programs = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '$99',
      period: '/month',
      description: 'Perfect for beginners starting their fitness journey',
      popular: false,
      features: [
        '1 Session per week',
        'Basic workout plan',
        'Email support',
        'Progress tracking',
        'Access to app',
        'Monthly check-in',
      ],
      color: 'from-blue-500 to-cyan-500',
      buttonText: 'Get Started',
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: '$249',
      period: '/month',
      description: 'Our most popular choice for serious fitness enthusiasts',
      popular: true,
      features: [
        '3 Sessions per week',
        'Advanced workout plan',
        '24/7 chat support',
        'Nutrition planning',
        'Video coaching',
        'Weekly check-ins',
        'Progress photos',
        'Customized diet plan',
      ],
      color: 'from-primary-500 to-orange-500',
      buttonText: 'Join Now',
    },
    {
      id: 3,
      name: 'Elite Coaching',
      price: '$499',
      period: '/month',
      description: 'Premium personalized coaching for maximum transformation',
      popular: false,
      features: [
        '5 Sessions per week',
        'Personalized program',
        'Priority support',
        'Full nutrition guidance',
        '1-on-1 video calls',
        'Daily check-ins',
        'Transformation guarantee',
        'Lifestyle coaching',
        'Exclusive community access',
      ],
      color: 'from-secondary-500 to-red-500',
      buttonText: 'Start Elite Program',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="programs"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-dark-800 to-dark-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

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
            <span className="text-primary-400 font-semibold text-sm">Pricing Plans</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-white">Choose Your </span>
            <span className="gradient-text">Training Program</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Flexible pricing options designed to fit your budget and fitness goals.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {programs.map((program) => (
            <motion.div
              key={program.id}
              className="relative group"
              variants={itemVariants}
            >
              {/* Popular Badge */}
              {program.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg">
                    <MdStar size={16} />
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Card */}
              <motion.div
                className={`relative glass rounded-2xl p-8 border transition duration-300 h-full flex flex-col ${
                  program.popular
                    ? 'border-primary-500/50 ring-2 ring-primary-500/20 scale-105'
                    : 'border-dark-700 hover:border-primary-500/30'
                }`}
                whileHover={{ y: program.popular ? -12 : -8 }}
              >
                {/* Gradient Background */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${program.color} rounded-t-2xl`} />

                {/* Content */}
                <div className="mt-4">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">{program.name}</h3>
                  <p className="text-sm text-gray-400 mb-6">{program.description}</p>

                  {/* Price */}
                  <motion.div
                    className="mb-8"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className={`text-5xl font-black bg-gradient-to-r ${program.color} bg-clip-text text-transparent`}>
                      {program.price}
                    </span>
                    <span className="text-gray-400 ml-2">{program.period}</span>
                  </motion.div>

                  {/* Features */}
                  <div className="space-y-4 mb-8 flex-grow">
                    {program.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <MdCheckCircle className="text-primary-400 flex-shrink-0" size={20} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full py-3 font-bold rounded-lg flex items-center justify-center gap-2 transition group ${
                      program.popular
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white btn-glow'
                        : 'border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {program.buttonText}
                    <FiArrowRight className="group-hover:translate-x-1 transition" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="glass rounded-xl p-8 border border-dark-700 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-4">
            All plans include a free consultation and personalized assessment. Cancel anytime with no hidden fees.
          </p>
          <p className="text-sm text-gray-400">
            Need a custom plan? <span className="text-primary-400 font-semibold cursor-pointer hover:text-primary-300">Contact us</span> for tailored options.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
