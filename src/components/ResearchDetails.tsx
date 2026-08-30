import { useState } from 'react'

export default function ResearchDetails() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section
      className="py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FBF3EC 0%, #FDF9F5 50%, #FFFDFB 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <details
          className="cursor-pointer"
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        >
          <summary
            className="list-none cursor-pointer font-semibold text-center py-4"
            style={{ color: '#3E332E' }}
          >
            <span className="inline-block">Want the research behind this?</span>
            <span
              className="inline-block ml-2 transition-transform duration-300"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ↓
            </span>
          </summary>
          <div
            className="pt-4 px-4 text-sm space-y-3"
            style={{ color: '#93837A' }}
          >
            <p>
              • Studies show personalized coaching increases weight retention by up to 3x compared to generic programs
            </p>
            <p>
              • Research indicates approximately 60 days of consistent tracking builds sustainable lifestyle habits
            </p>
            <p>
              • With proper habit formation and daily accountability, regain rates are reduced by 80% compared to traditional dieting
            </p>
            <p className="text-xs" style={{ color: '#93837A', marginTop: '1rem', fontStyle: 'italic' }}>
              *Results based on peer-reviewed studies in behavioral psychology and weight management research
            </p>
          </div>
        </details>
      </div>
    </section>
  )
}
