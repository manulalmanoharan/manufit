import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Transformations from './components/sections/Transformations'
import Programs from './components/sections/Programs'
import Testimonials from './components/sections/Testimonials'
import WhyChoose from './components/sections/WhyChoose'
import Gallery from './components/sections/Gallery'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import CTA from './components/sections/CTA'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollToTop from './components/ScrollToTop'
import ThemeToggle from './components/ThemeToggle'
import MonthlyTrack from './features/monthlytrack/MonthlyTrack'

type TrackerRecord = {
  date: string
  food: string
  sleep: string
  stress: string
  training: string
}

type TrackerCategory = {
  key: keyof Omit<TrackerRecord, 'date'>
  icon: string
  title: string
  question: string
  options: string[]
}

const STORAGE_KEY = 'daily-tracker-records'

const categories: TrackerCategory[] = [
  {
    key: 'food',
    icon: '🍽️',
    title: 'Food / Portion Control',
    question: 'How was your portion control today?',
    options: ['Good', 'Partly', 'Poor'],
  },
  {
    key: 'sleep',
    icon: '😴',
    title: 'Sleep',
    question: 'How many hours did you sleep?',
    options: ['5h', '6h', '7h', '8h', '9h+'],
  },
  {
    key: 'stress',
    icon: '😰',
    title: 'Stress',
    question: 'How was your stress today?',
    options: ['Low', 'Medium', 'High'],
  },
  {
    key: 'training',
    icon: '🏋️',
    title: 'Training',
    question: 'Did you complete your workout?',
    options: ['Completed', 'Not completed', 'Rest day'],
  },
]

const getToday = () => new Date().toISOString().slice(0, 10)

const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function DailyTrack() {
  const [selections, setSelections] = useState<Omit<TrackerRecord, 'date'>>({
    food: '',
    sleep: '',
    stress: '',
    training: '',
  })
  const [records, setRecords] = useState<TrackerRecord[]>([])
  const [saved, setSaved] = useState(false)
  const [editingDate, setEditingDate] = useState<string | null>(null)
  const [saveMessage, setSaveMessage] = useState('Today\'s check-in is saved.')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    try {
      setRecords(JSON.parse(stored) as TrackerRecord[])
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const selectOption = (key: keyof typeof selections, value: string) => {
    setSelections((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  const saveToday = () => {
    if (Object.values(selections).some((value) => !value)) return

    const recordDate = editingDate ?? getToday()
    const nextRecord = { date: recordDate, ...selections }
    const nextRecords = [...records.filter((record) => record.date !== recordDate), nextRecord]
      .sort((first, second) => second.date.localeCompare(first.date))

    setRecords(nextRecords)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords))
    setSaved(true)
    setSaveMessage(editingDate ? 'Entry updated.' : 'Today\'s check-in is saved.')
    setEditingDate(null)
  }

  const editRecord = (record: TrackerRecord) => {
    setSelections({
      food: record.food,
      sleep: record.sleep,
      stress: record.stress,
      training: record.training,
    })
    setEditingDate(record.date)
    setSaved(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasSelections = Object.values(selections).every(Boolean)

  return (
    <main className="tracker-page">
      <div className="tracker-shell">
        <header className="tracker-header">
          <div className="eyebrow"><span className="eyebrow-dot" /> DAILY CHECK-IN</div>
          <h1>Keep a pulse on your day.</h1>
          <p>A few honest taps today can make tomorrow feel a little clearer.</p>
          <div className="today-chip">{formatDate(getToday())}</div>
        </header>

        <section className="tracker-form" aria-label="Daily tracker form">
          {categories.map((category, index) => (
            <article className="tracker-section" key={category.key}>
              <div className="section-number">0{index + 1}</div>
              <div className="section-content">
                <div className="section-title"><span className="section-icon" aria-hidden="true">{category.icon}</span><h2>{category.title}</h2></div>
                <p className="question">{category.question}</p>
                <div className={`option-grid option-grid-${category.options.length}`} role="group" aria-label={category.question}>
                  {category.options.map((option) => (
                    <button
                      className={`option-button ${selections[category.key] === option ? 'selected' : ''}`}
                      key={option}
                      onClick={() => selectOption(category.key, option)}
                      type="button"
                      aria-pressed={selections[category.key] === option}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
          <button className="save-button" disabled={!hasSelections} onClick={saveToday} type="button">
            <span>{saved ? 'SAVED' : editingDate ? 'UPDATE ENTRY' : 'SAVE TODAY'}</span><span aria-hidden="true">→</span>
          </button>
          <p className={`save-message ${saved ? 'visible' : ''}`} role="status">{saveMessage} You can update it anytime.</p>
        </section>

        <section className="history-section" aria-labelledby="history-title">
          <div className="history-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> YOUR LOG</div><h2 id="history-title">Daily history</h2></div><span className="record-count">{records.length} {records.length === 1 ? 'day' : 'days'}</span></div>
          {records.length === 0 ? <p className="empty-history">Your saved check-ins will appear here.</p> : (
            <div className="history-table-wrap"><table><thead><tr><th>Date</th><th>Food</th><th>Sleep</th><th>Stress</th><th>Training</th><th>Action</th></tr></thead><tbody>
              {records.map((record) => <tr key={record.date}><td>{formatDate(record.date)}</td><td>{record.food}</td><td>{record.sleep}</td><td>{record.stress}</td><td>{record.training}</td><td><button className="edit-button" onClick={() => editRecord(record)} type="button">Edit</button></td></tr>)}
            </tbody></table></div>
          )}
        </section>
      </div>
    </main>
  )
}

function Home() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <Navbar />
      <ThemeToggle isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <Hero />
      <About />
      <Services />
      <Transformations />
      <Programs />
      <Testimonials />
      <WhyChoose />
      <Gallery />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  )
}

function App() {
  if (window.location.pathname === '/dailytrack') return <DailyTrack />
  if (window.location.pathname === '/monthlytrack') return <MonthlyTrack />
  return <Home />
}

export default App
