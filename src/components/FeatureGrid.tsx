import { FiUser, FiCheckCircle, FiTrendingUp, FiCalendar, FiAward, FiBarChart2 } from 'react-icons/fi'

export default function FeatureGrid() {
  const features = [
    {
      icon: <FiUser size={32} />,
      title: 'Your Profile',
      description: 'Personalized coaching tailored to your goals',
      route: '/profile'
    },
    {
      icon: <FiCheckCircle size={32} />,
      title: 'Daily Check-In',
      description: 'Track your daily habits and progress',
      route: '/dailytrack'
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: 'Monthly Progress',
      description: 'Review your monthly achievements and trends',
      route: '/monthlytrack'
    },
    {
      icon: <FiCalendar size={32} />,
      title: 'Session Scheduling',
      description: 'Book and manage your training sessions',
      route: '/slots'
    },
    {
      icon: <FiAward size={32} />,
      title: 'Trainer Background',
      description: 'Learn about your certified coach',
      route: '/trainer'
    },
    {
      icon: <FiBarChart2 size={32} />,
      title: 'Progress Reports',
      description: 'Detailed analytics and success metrics',
      route: '/progress'
    }
  ]

  return (
    <section
      id="features"
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FBF3EC 0%, #FDF9F5 50%, #FFFDFB 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2
          className="text-4xl sm:text-5xl font-bold text-center mb-16"
          style={{ color: '#3E332E', fontFamily: "'Fraunces', serif" }}
        >
          What's Included
        </h2>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.route}
              className="p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#F1E4D8',
                boxShadow: '0 10px 28px rgba(120, 90, 60, 0.07)',
                textDecoration: 'none',
              }}
            >
              <div
                className="mb-4"
                style={{ color: '#E1916F' }}
              >
                {feature.icon}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: '#3E332E', fontFamily: "'Fraunces', serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: '#93837A' }}
              >
                {feature.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
