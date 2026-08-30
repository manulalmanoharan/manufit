export default function Hero() {
  return (
    <section
      className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      style={{
        background: 'linear-gradient(135deg, #FBF3EC 0%, #FDF9F5 50%, #FFFDFB 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Eyebrow */}
        <div
          className="inline-block mb-6 text-xs font-semibold uppercase tracking-widest"
          style={{ color: '#93837A' }}
        >
          Personal Fitness Coaching
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
          style={{ color: '#3E332E', fontFamily: "'Fraunces', serif" }}
        >
          Results that{' '}
          <span style={{ color: '#E1916F', fontStyle: 'italic' }}>hold.</span>
        </h1>

        {/* Subtext */}
        <p
          className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: '#93837A', fontFamily: "'Inter', sans-serif" }}
        >
          Keep the weight off with personalized daily coaching and proven habits that stick
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/login"
            className="px-8 py-3 rounded-full font-semibold text-white transition-colors duration-300"
            style={{
              backgroundColor: '#E1916F',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C97850')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E1916F')}
          >
            Sign In
          </a>
          <button
            onClick={() => {
              const element = document.getElementById('trainer')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="px-8 py-3 rounded-full font-semibold transition-all duration-300 border-2"
            style={{
              color: '#E1916F',
              borderColor: '#E1916F',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFF5F0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Meet Your Trainer
          </button>
        </div>
      </div>
    </section>
  )
}
