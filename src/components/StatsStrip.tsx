export default function StatsStrip() {
  const stats = [
    {
      number: '3x',
      label: 'Weight Retention'
    },
    {
      number: '~60',
      label: 'Days to Build Habit'
    },
    {
      number: '↓ 80%',
      label: 'Reduced Regain'
    }
  ]

  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FBF3EC 0%, #FDF9F5 50%, #FFFDFB 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border-2 text-center"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#F1E4D8',
                boxShadow: '0 10px 28px rgba(120, 90, 60, 0.07)'
              }}
            >
              <div
                className="text-3xl sm:text-4xl font-bold mb-2"
                style={{ color: '#E1916F', fontFamily: "'Fraunces', serif" }}
              >
                {stat.number}
              </div>
              <div
                className="text-sm font-medium"
                style={{ color: '#93837A' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
