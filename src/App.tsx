import { useEffect, useState } from 'react'
import MonthlyTrack from './features/monthlytrack/MonthlyTrack'
import NewHero from './components/NewHero'
import NewNavbar from './components/NewNavbar'
import { AuthProvider, Login, ProtectedApp, RegisterPage, useAuth } from './auth'
import { FiBarChart2, FiCalendar, FiLogOut, FiUser } from 'react-icons/fi'

type TrackerRecord = {
  date: string
  food: string
  sleep: string
  stress: string
  training: string
  submitted_by?: string
}

type TrackerCategory = {
  key: keyof Omit<TrackerRecord, 'date'>
  icon: string
  title: string
  question: string
  options: string[]
}

const categories: TrackerCategory[] = [
  { key: 'food', icon: '🍽️', title: 'Food / Portion Control', question: 'How was your portion control today?', options: ['Good', 'Partly', 'Poor'] },
  { key: 'sleep', icon: '😴', title: 'Sleep', question: 'How many hours did you sleep?', options: ['5h', '6h', '7h', '8h', '9h+'] },
  { key: 'stress', icon: '😰', title: 'Stress', question: 'How was your stress today?', options: ['Low', 'Medium', 'High'] },
  { key: 'training', icon: '🏋️', title: 'Training', question: 'Did you complete your workout?', options: ['Completed', 'Not completed', 'Rest day'] },
]

const getToday = () => new Date().toISOString().slice(0, 10)
const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function DailyTrack({ view = 'list' }: { view?: 'list' | 'form' }) {
  const { getDashboard } = useAuth()
  const roomId = new URLSearchParams(window.location.search).get('clientId')
  const [selections, setSelections] = useState<Omit<TrackerRecord, 'date'>>({ food: '', sleep: '', stress: '', training: '' })
  const [records, setRecords] = useState<TrackerRecord[]>([])
  const [saved, setSaved] = useState(false)
  const [editingDate, setEditingDate] = useState<string | null>(null)
  const [saveMessage, setSaveMessage] = useState('Today\'s check-in is saved.')
  const [selectedDate, setSelectedDate] = useState(getToday())
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const PAGE_SIZE = 10

  useEffect(() => {
    getDashboard(roomId ? Number(roomId) : undefined).then((dashboard) => setRecords(dashboard.daily as TrackerRecord[])).catch(() => setRecords([]))
  }, [])

  useEffect(() => { setCurrentPage(1) }, [records.length])
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE))
    if (currentPage > totalPages) setCurrentPage(totalPages)
  }, [currentPage, records.length])
  useEffect(() => {
    const existing = records.find((record) => record.date === selectedDate)
    if (existing) {
      setSelections({ food: existing.food, sleep: existing.sleep, stress: existing.stress, training: existing.training })
      setEditingDate(existing.date)
      setSaved(false)
    } else {
      setSelections({ food: '', sleep: '', stress: '', training: '' })
      setEditingDate(null)
      setSaved(false)
    }
  }, [selectedDate, records])

  const selectOption = (key: keyof typeof selections, value: string) => {
    setSelections((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  const resetForm = () => {
    setSelections({ food: '', sleep: '', stress: '', training: '' })
    setEditingDate(null)
    setSaved(false)
    setSaveMessage('Today\'s check-in is saved.')
  }

  const openSuccessModal = (message: string) => {
    setSaveMessage(message)
    setSelections({ food: '', sleep: '', stress: '', training: '' })
    setEditingDate(null)
    setSaved(true)
    setModalOpen(true)
  }

  const saveToday = () => {
    if (Object.values(selections).some((value) => !value)) return

    const recordDate = selectedDate
    const nextRecord = { date: recordDate, ...selections }
    const nextRecords = [...records.filter((record) => record.date !== recordDate), nextRecord].sort((first, second) => second.date.localeCompare(first.date))

    fetch(`http://localhost:8787/api/daily/${recordDate}`, { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem('manufit-token') ?? ''}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ ...selections, clientId: roomId ? Number(roomId) : undefined }) }).then((response) => {
      if (!response.ok) throw new Error('save failed')
      setRecords(nextRecords)
      setSaved(true)
      setEditingDate(null)
      setSelections({ food: '', sleep: '', stress: '', training: '' })
      openSuccessModal(editingDate ? 'Entry updated successfully.' : 'Today\'s check-in saved successfully.')
    }).catch(() => {
      setSaveMessage('Unable to save this check-in.')
      setModalOpen(true)
    })
  }

  const editRecord = (record: TrackerRecord) => {
    setSelections({ food: record.food, sleep: record.sleep, stress: record.stress, training: record.training })
    setEditingDate(record.date)
    setSaved(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const hasSelections = Object.values(selections).every(Boolean)
  const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE))
  const pageRecords = records.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const showForm = view === 'form'

  return (
    <main className="tracker-page">
      <div className="tracker-shell">
        {showForm && (
          <section className="tracker-form" aria-label="Daily tracker form">
            <div className="daily-date-picker-wrap">
              <label className="daily-date-picker"><span>Select date</span><input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value || getToday())} /></label>
            </div>
            {categories.map((category, index) => (
              <article className="tracker-section" key={category.key}>
                <div className="section-number">0{index + 1}</div>
                <div className="section-content">
                  <div className="section-title"><span className="section-icon" aria-hidden="true">{category.icon}</span><h2>{category.title}</h2></div>
                  <p className="question">{category.question}</p>
                  <div className={`option-grid option-grid-${category.options.length}`} role="group" aria-label={category.question}>
                    {category.options.map((option) => (
                      <button className={`option-button ${selections[category.key] === option ? 'selected' : ''}`} key={option} onClick={() => selectOption(category.key, option)} type="button" aria-pressed={selections[category.key] === option}>{option}</button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            <div className="daily-action-row">
              <button className="save-button" disabled={!hasSelections} onClick={saveToday} type="button"><span>{saved ? 'SAVED' : editingDate ? 'UPDATE ENTRY' : 'SAVE TODAY'}</span><span aria-hidden="true">→</span></button>
              <button className="clear-button" type="button" onClick={resetForm}>Clear</button>
            </div>
            <p className={`save-message ${saved ? 'visible' : ''}`} role="status">{saveMessage} You can update it anytime.</p>
          </section>
        )}

        {modalOpen && (
          <div className="tracker-modal-backdrop" onClick={() => { setModalOpen(false); setSaved(false) }}>
            <div className="tracker-modal" onClick={(event) => event.stopPropagation()}>
              <div className="tracker-modal-icon">✓</div>
              <h3>Success</h3>
              <p>{saveMessage}</p>
              <button type="button" className="tracker-modal-button" onClick={() => { setModalOpen(false); setSaved(false) }}>OK</button>
            </div>
          </div>
        )}

        {!showForm && (
          <section className="history-section" aria-labelledby="history-title">
            <div className="history-heading"><div><h2 id="history-title">Daily history</h2></div><span className="record-count">{records.length} {records.length === 1 ? 'day' : 'days'}</span></div>
            {records.length === 0 ? <p className="empty-history">Your saved check-ins will appear here.</p> : (
              <>
                <div className="history-table-wrap"><table><thead><tr><th>Submitted by</th><th>Date</th><th>Food</th><th>Sleep</th><th>Stress</th><th>Training</th><th>Action</th></tr></thead><tbody>
                  {pageRecords.map((record) => {
                    const trainingStatus = record.training === 'Completed' ? 'success' : record.training === 'Not completed' ? 'danger' : 'neutral'
                    const submittedBy = record.submitted_by || 'Client'
                    return (
                      <tr key={record.date}>
                        <td>{submittedBy}</td>
                        <td>{formatDate(record.date)}</td>
                        <td>{record.food}</td>
                        <td>{record.sleep}</td>
                        <td>{record.stress}</td>
                        <td><span className={`training-badge ${trainingStatus}`}>{record.training === 'Completed' ? 'Completed' : record.training === 'Not completed' ? 'Not completed' : record.training}</span></td>
                        <td><button className="edit-button" onClick={() => editRecord(record)} type="button">Edit</button></td>
                      </tr>
                    )
                  })}
                </tbody></table></div>

                {records.length > PAGE_SIZE && (
                  <div className="history-pagination" aria-label="Daily track pagination">
                    <button type="button" className="pager-button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>Previous</button>
                    <span className="pager-status">Page {currentPage} of {totalPages}</span>
                    <button type="button" className="pager-button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>Next</button>
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

function HomePage() { return <><NewNavbar /><NewHero /></> }

function DashboardShell({ initialTab, initialDailyView }: { initialTab?: 'daily' | 'monthly'; initialDailyView?: 'list' | 'form' }) {
  const { logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>(initialTab ?? 'daily')
  const [dailyView, setDailyView] = useState<'list' | 'form'>(initialDailyView ?? 'list')

  useEffect(() => { if (initialTab) setActiveTab(initialTab); if (initialDailyView) setDailyView(initialDailyView) }, [initialTab, initialDailyView])

  const menuItems = [
    { key: 'daily', label: 'Daily Tracker', icon: <FiCalendar size={18} /> },
    { key: 'monthly', label: 'Monthly Tracker', icon: <FiBarChart2 size={18} /> },
  ] as const

  return (
    <div className="dashboard-admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><div className="admin-brand-mark">MF</div><div><div className="admin-brand-name">ManuFit</div><div className="admin-brand-subtitle">Client dashboard</div></div></div>
        <nav className="admin-menu" aria-label="Dashboard navigation">
          {menuItems.map((item) => (
            <div key={item.key} className="admin-menu-group">
              <button type="button" className={`admin-menu-item ${activeTab === item.key ? 'active' : ''}`} onClick={() => {
                setActiveTab(item.key)
                if (item.key === 'daily') { setDailyView('list'); window.history.pushState({}, '', '/dailytrack') }
                else { window.history.pushState({}, '', '/monthlytrack') }
              }}><span className="admin-menu-icon">{item.icon}</span>{item.label}</button>
              {item.key === 'daily' && activeTab === 'daily' && (
                <div className="admin-submenu">
                  <button type="button" className={`admin-submenu-item ${dailyView === 'list' ? 'active' : ''}`} onClick={() => { setDailyView('list'); window.history.pushState({}, '', '/dailytrack') }}>Daily Track List</button>
                  <button type="button" className={`admin-submenu-item ${dailyView === 'form' ? 'active' : ''}`} onClick={() => { setDailyView('form'); window.history.pushState({}, '', '/dailytrack/form') }}>Daily Track Form</button>
                </div>
              )}
            </div>
          ))}
        </nav>
        <button type="button" className="admin-logout" onClick={() => { logout(); window.location.assign('/') }}><FiLogOut size={16} />Sign out</button>
      </aside>
      <main className="admin-content">
        <header className="admin-topbar"><div className="admin-user-pill" aria-label="User profile"><span className="admin-user-icon"><FiUser size={16} /></span></div></header>
        <div className="admin-panel">{activeTab === 'daily' ? <DailyTrack view={dailyView} /> : <MonthlyTrack />}</div>
      </main>
    </div>
  )
}

function AppRoutes() {
  const { user, loading } = useAuth()
  const currentPath = window.location.pathname

  if (loading) return <main className="auth-page"><p className="auth-loading">Opening your training room...</p></main>
  if (!user) {
    if (currentPath === '/login') return <Login />
    if (currentPath === '/register') return <RegisterPage />
    if (currentPath === '/dailytrack' || currentPath === '/monthlytrack' || currentPath === '/report') return <Login />
    return <HomePage />
  }

  if (currentPath === '/register') return <DashboardShell />
  if (currentPath === '/' || currentPath === '/dashboard') return <DashboardShell />
  if (currentPath === '/profile') return <ProtectedApp />
  if (currentPath === '/dailytrack' || currentPath === '/dailytrack/list') return <DashboardShell initialTab="daily" initialDailyView="list" />
  if (currentPath === '/dailytrack/form') return <DashboardShell initialTab="daily" initialDailyView="form" />
  if (currentPath === '/monthlytrack') return <DashboardShell initialTab="monthly" />
  if (currentPath === '/admin/clients') return <ProtectedApp />
  if (currentPath.startsWith('/admin/clients/')) return <ProtectedApp />
  if (currentPath === '/report') return <ProtectedApp />
  return <ProtectedApp />
}

function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>
}

export default App
