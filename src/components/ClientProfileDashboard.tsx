import { useMemo } from 'react'
import { FiActivity, FiArrowRight, FiCalendar, FiCheck, FiLogOut, FiSettings, FiTrendingUp, FiUser } from 'react-icons/fi'
import { DashboardData, useAuth } from '../auth'

type ClientProfileDashboardProps = {
  data: DashboardData | null
  roomId?: number
}

const formatDate = (value: string) => new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function ClientProfileDashboard({ data, roomId }: ClientProfileDashboardProps) {
  const { user, logout } = useAuth()
  const profile = data?.profile
  const suffix = roomId ? `?clientId=${roomId}` : ''
  const daily = data?.daily ?? []
  const monthly = data?.monthly ?? []
  const completed = daily.filter((entry) => entry.training === 'Completed').length
  const loggedThisWeek = daily.filter((entry) => {
    const date = new Date(`${entry.date}T00:00:00`).getTime()
    return date >= Date.now() - 6 * 24 * 60 * 60 * 1000
  }).length
  const trend = useMemo(() => monthly.slice(0, 6).reverse(), [monthly])
  const maxWeight = Math.max(...trend.map((entry) => Number(entry.weight) || 0), 1)
  const displayName = profile?.name || user?.email?.split('@')[0] || 'Client'

  return (
    <main className="client-dashboard">
      <header className="client-dashboard-header">
        <div className="client-brand"><span className="client-brand-mark">MF</span><span>ManuFit</span></div>
        <div className="client-header-actions">
          <button type="button" className="client-icon-button" aria-label="Settings"><FiSettings size={18} /></button>
          <button type="button" className="client-avatar" aria-label="Sign out" onClick={() => { logout(); window.location.assign('/') }}>
            {displayName.slice(0, 1).toUpperCase()}
          </button>
        </div>
      </header>

      <section className="client-welcome">
        <div>
          <p className="client-eyebrow"><FiActivity size={14} /> YOUR TRAINING ROOM</p>
          <h1>Welcome back, {displayName}.</h1>
          <p>{profile?.goal || 'Keep building a healthier, stronger routine.'}</p>
        </div>
        <button type="button" className="client-signout" onClick={() => { logout(); window.location.assign('/') }}><FiLogOut size={15} /> Sign out</button>
      </section>

      <section className="client-stat-grid" aria-label="Weekly progress">
        <article className="client-stat-card client-stat-card-highlight"><span>Logged this week</span><strong>{loggedThisWeek}</strong><small>of 7 days</small></article>
        <article className="client-stat-card"><span>Workouts complete</span><strong>{completed}</strong><small>all time</small></article>
        <article className="client-stat-card"><span>Progress entries</span><strong>{monthly.length}</strong><small>measurements</small></article>
      </section>

      <div className="client-dashboard-grid">
        <section className="client-panel client-progress-panel">
          <div className="client-panel-heading"><div><p className="client-eyebrow"><FiTrendingUp size={14} /> PROGRESS</p><h2>Your progress</h2></div><span>{monthly.length ? `${monthly.length} entries` : 'Getting started'}</span></div>
          {trend.length ? <div className="client-chart" aria-label="Recent progress chart">{trend.map((entry) => <div className="client-chart-column" key={entry.date}><div className="client-chart-bar" style={{ height: `${Math.max(12, (Number(entry.weight) / maxWeight) * 100)}%` }} title={`${entry.weight} ${entry.date}`} /><span>{formatDate(entry.date)}</span></div>)}</div> : <div className="client-empty-state"><FiTrendingUp size={25} /><p>Your measurements will turn into a progress story here.</p></div>}
          <a className="client-action-link" href={`/monthlytrack${suffix}`}>Open progress tracker <FiArrowRight size={16} /></a>
        </section>

        <section className="client-panel client-streak-panel">
          <div className="client-panel-heading"><div><p className="client-eyebrow"><FiCheck size={14} /> CONSISTENCY</p><h2>Keep your streak</h2></div></div>
          <div className="client-streak-number">{loggedThisWeek}<span>days</span></div>
          <div className="client-week-dots" aria-label={`${loggedThisWeek} days logged this week`}>{Array.from({ length: 7 }, (_, index) => <span key={index} className={index < loggedThisWeek ? 'filled' : ''} />)}</div>
          <p className="client-muted">A small check-in today keeps the habit moving.</p>
        </section>

        <section className="client-panel client-quick-panel">
          <div className="client-panel-heading"><div><p className="client-eyebrow"><FiCalendar size={14} /> QUICK ACTIONS</p><h2>Stay on track</h2></div></div>
          <a className="client-quick-action" href={`/dailytrack/form${suffix}`}><span><FiCheck size={18} /><b>Daily check-in</b><small>Log food, sleep, stress and training</small></span><FiArrowRight size={17} /></a>
          <a className="client-quick-action" href={`/dailytrack${suffix}`}><span><FiCalendar size={18} /><b>View daily history</b><small>{daily.length} saved check-ins</small></span><FiArrowRight size={17} /></a>
          <a className="client-quick-action" href={`/monthlytrack${suffix}`}><span><FiUser size={18} /><b>Update measurements</b><small>Keep your progress current</small></span><FiArrowRight size={17} /></a>
        </section>
      </div>
    </main>
  )
}