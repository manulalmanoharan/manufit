import { motion } from 'framer-motion'
import { MdOutlineTrendingUp } from 'react-icons/md'

export default function Transformations() {
  const transformations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      before: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a7?w=300&q=80',
      after: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80',
      result: 'Lost 30 lbs, Gained Confidence',
      timeframe: '6 Months',
      testimonial: 'The personalized approach completely changed my life!',
    },
    {
      id: 2,
      name: 'Mike Chen',
      before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      after: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
      result: 'Gained 20 lbs Muscle',
      timeframe: '4 Months',
      testimonial: 'Best investment I made for my fitness journey.',
    },
    {
      id: 3,
      name: 'Emma Davis',
      before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
      after: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
      result: 'Strength Increased 50%',
      timeframe: '8 Months',
      testimonial: 'Exceeded all my expectations and goals!',
    },
  ]

  return (
    <section className="relative py-20 lg:py-32 bg-dark-900 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

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
            className="inline-block mb-4 px-4 py-2 bg-secondary-500/10 border border-secondary-500/30 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-secondary-400 font-semibold text-sm">Success Stories</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            <span className="text-white">Real </span>
            <span className="gradient-text">Transformations</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See the incredible results achieved by our clients through dedication and proper guidance.
          </p>
        </motion.div>

        {/* Before/After Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {transformations.map((trans, index) => (
            <motion.div
              key={trans.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Before/After Container */}
              <div className="relative mb-6 rounded-xl overflow-hidden h-80">
                {/* After Image (Base) */}
                <img
                  src={trans.after}
                  alt="After transformation"
                  className="w-full h-full object-cover"
                />

                {/* Before Image Overlay with Transition */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ width: '100%' }}
                  whileHover={{ width: '0%' }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={trans.before}
                    alt="Before transformation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                {/* Labels */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-secondary-600 text-white text-xs font-bold rounded-full">
                  Before
                </div>
                <motion.div
                  className="absolute top-4 right-4 px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  After
                </motion.div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900" />
              </div>

              {/* Info Card */}
              <motion.div
                className="glass rounded-lg p-6 border border-dark-700 group-hover:border-primary-500/50 transition"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{trans.name}</h3>
                    <p className="text-sm text-gray-400">{trans.timeframe}</p>
                  </div>
                  <motion.div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white">
                    <MdOutlineTrendingUp size={20} />
                  </motion.div>
                </div>

                <p className="text-primary-400 font-bold mb-3">{trans.result}</p>
                <p className="text-gray-300 text-sm italic">"{trans.testimonial}"</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-4 border-2 border-primary-500 text-primary-400 font-bold rounded-lg hover:bg-primary-500/10 transition">
            View All Transformations
          </button>
        </motion.div>
      </div>
    </section>
  )
}
