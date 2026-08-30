export default function CTAFooter() {
  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FBF3EC 0%, #FDF9F5 50%, #FFFDFB 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-8"
          style={{ color: '#3E332E', fontFamily: "'Fraunces', serif" }}
        >
          Ready to Keep the Weight Off?
        </h2>

        <a
          href="/dashboard"
          className="inline-block px-8 py-3 rounded-full font-semibold text-white transition-colors duration-300"
          style={{
            backgroundColor: '#E1916F',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C97850')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E1916F')}
        >
          Start Your Plan
        </a>
      </div>
    </section>
  )
}
