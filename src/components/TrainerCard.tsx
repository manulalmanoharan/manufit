export default function TrainerCard() {
  const credentials = [
    '10+ yrs experience',
    'Certified Trainer',
    'B.A. Psychology',
    'Cognitive Science'
  ]

  return (
    <section
      id="trainer"
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FBF3EC 0%, #FDF9F5 50%, #FFFDFB 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-8 sm:p-12"
          style={{
            background: 'linear-gradient(135deg, #4A3B33 0%, #5C493D 100%)',
          }}
        >
          {/* Eyebrow */}
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#E1916F' }}
          >
            Your Trainer
          </div>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: '#FFFFFF', fontFamily: "'Fraunces', serif" }}
          >
            Expert Guidance Every Step
          </h2>

          {/* Bio */}
          <p
            className="text-lg mb-8"
            style={{ color: '#F1E4D8' }}
          >
            With over a decade of experience in fitness coaching and behavioral psychology, your trainer is dedicated to creating lasting results that go beyond the scale.
          </p>

          {/* Credentials */}
          <div className="flex flex-wrap gap-3 mb-8">
            {credentials.map((credential, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(225, 145, 111, 0.15)',
                  color: '#E1916F',
                  border: '1px solid #E1916F'
                }}
              >
                {credential}
              </div>
            ))}
          </div>

          {/* Media Grid Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Video Block */}
            <div
              className="sm:col-span-2 h-64 rounded-2xl flex items-center justify-center text-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px dashed #E1916F'
              }}
            >
              <div>
                <div style={{ color: '#E1916F', fontSize: '2rem', marginBottom: '0.5rem' }}>▶</div>
                <div style={{ color: '#F1E4D8' }} className="text-sm font-medium">
                  Video coming soon
                </div>
              </div>
            </div>

            {/* Photo Block 1 */}
            <div
              className="h-64 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px dashed #E1916F'
              }}
            >
              <div style={{ color: '#F1E4D8' }} className="text-sm font-medium text-center">
                Photo
              </div>
            </div>

            {/* Photo Block 2 */}
            <div
              className="hidden sm:flex h-64 rounded-2xl items-center justify-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px dashed #E1916F'
              }}
            >
              <div style={{ color: '#F1E4D8' }} className="text-sm font-medium text-center">
                Photo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
