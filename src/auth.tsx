import { createContext, FormEvent, ReactNode, useContext, useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export type User = { id: number; email: string; role: 'trainer' | 'client'; clientId: number | null; mustChangePassword?: boolean }
export type DashboardData = { profile: { name: string; goal: string; phone: string } | null; daily: any[]; monthly: any[]; slots: any[]; reports: any[] }
export const API = 'http://localhost:8787/api'

type ClientEntry = { id: number; email: string; name: string; goal: string; created_at?: string; clientId?: number | null }
type RangeKey = 'thisMonth' | 'last30' | 'custom'

type AuthContextValue = { user: User | null; loading: boolean; login: (email: string, password: string) => Promise<string | null>; logout: () => void; changePassword: (password: string) => Promise<string | null>; getDashboard: (clientId?: number) => Promise<DashboardData> }
const AuthContext = createContext<AuthContextValue | null>(null)

const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const getToday = () => new Date().toISOString().slice(0, 10)
const addDays = (dateString: string, days: number) => {
  const date = new Date(`${dateString}T00:00:00`)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}
const getRangeDays = (start: string, end: string) => {
  const dates: string[] = []
  const current = new Date(`${start}T00:00:00`)
  const finish = new Date(`${end}T00:00:00`)
  while (current <= finish) {
    dates.push(current.toISOString().slice(0, 10))
    current.setDate(current.getDate() + 1)
  }
  return dates
}
const computeDateRange = (key: RangeKey, customStart?: string, customEnd?: string) => {
  const today = getToday()
  if (key === 'last30') return { start: addDays(today, -29), end: today }
  if (key === 'thisMonth') {
    const current = new Date(`${today}T00:00:00`)
    return { start: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-01`, end: today }
  }
  return { start: customStart || today, end: customEnd || today }
}
const parseSleepHours = (value: string) => {
  const match = String(value).match(/\d+(?:\.\d+)?/)
  return match ? Number(match[0]) : 0
}
const parseStressScore = (value: string) => {
  const normalized = String(value).toLowerCase()
  if (normalized === 'low') return 1
  if (normalized === 'medium') return 2
  if (normalized === 'high') return 3
  return 0
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => { const saved = localStorage.getItem('manufit-user'); return saved ? JSON.parse(saved) as User : null })
  const [loading, setLoading] = useState(Boolean(user))
  useEffect(() => { if (!user) { setLoading(false); return }; fetch(`${API}/auth/me`, { headers: authHeaders() }).then((response) => { if (!response.ok) logout(); return response.json() }).catch(() => logout()).finally(() => setLoading(false)) }, [])
  function authHeaders() { return { Authorization: `Bearer ${localStorage.getItem('manufit-token') ?? ''}`, 'Content-Type': 'application/json' } }
  async function login(email: string, password: string) { const response = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }); const data = await response.json(); if (!response.ok) return data.error ?? 'Unable to sign in'; localStorage.setItem('manufit-token', data.token); localStorage.setItem('manufit-user', JSON.stringify(data.user)); setUser(data.user); return null }
  function logout() { localStorage.removeItem('manufit-token'); localStorage.removeItem('manufit-user'); setUser(null) }
  async function changePassword(password: string) { const response = await fetch(`${API}/auth/change-password`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ password }) }); const data = await response.json(); if (!response.ok) return data.error ?? 'Unable to update password'; const nextUser = { ...user, mustChangePassword: false } as User; localStorage.setItem('manufit-user', JSON.stringify(nextUser)); setUser(nextUser); return null }
  async function getDashboard(clientId?: number) { const query = clientId ? `?clientId=${clientId}` : ''; const response = await fetch(`${API}/dashboard${query}`, { headers: authHeaders() }); if (!response.ok) throw new Error((await response.json()).error); return response.json() as Promise<DashboardData> }
  return <AuthContext.Provider value={{ user, loading, login, logout, changePassword, getDashboard }}>{children}</AuthContext.Provider>
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used inside AuthProvider'); return context }

export function Login() {
  const { login } = useAuth(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setError('');
    const message = await login(email, password);
    if (message) {
      setError(message);
      setBusy(false);
      return;
    }
    window.location.assign('/dashboard');
  }
  return <main className="auth-page"><section className="auth-panel"><div className="auth-mark">MF<span>•</span></div><p className="eyebrow"><span className="eyebrow-dot" /> YOUR TRAINING ROOM</p><h1>Progress, made personal.</h1><p className="auth-intro">Sign in to continue your work with ManuFit.</p><form onSubmit={submit}><label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>{error && <p className="auth-error" role="alert">{error}</p>}<button className="auth-submit" disabled={busy}>{busy ? 'SIGNING IN...' : 'SIGN IN'} <span>→</span></button></form><p className="auth-note">Client accounts are created privately by your trainer.</p></section></main>
}

function PasswordChange() { const { changePassword, logout } = useAuth(); const [password, setPassword] = useState(''); const [error, setError] = useState(''); async function submit(event: FormEvent) { event.preventDefault(); const message = await changePassword(password); if (message) setError(message) }; return <div className="password-card"><p className="eyebrow"><span className="eyebrow-dot" /> FIRST LOGIN</p><h2>Choose your private password.</h2><p>Your temporary password worked. Set a new one before entering your training room.</p><form onSubmit={submit}><input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" required />{error && <p className="auth-error">{error}</p>}<button className="auth-submit">UPDATE PASSWORD <span>→</span></button></form><button className="text-button" onClick={logout}>Sign out</button></div> }

export function ProtectedApp() {
  const { user } = useAuth()
  if (user?.mustChangePassword) return <main className="dashboard-page"><PasswordChange /></main>
  if (user?.role === 'trainer' && (window.location.pathname === '/trainer/clients' || window.location.pathname === '/admin/clients')) return <TrainerClients />
  if (user?.role === 'trainer' && window.location.pathname.startsWith('/admin/clients/')) return <TrainerClientDetailPage />
  if (window.location.pathname === '/report') return <MonthlyReportView />
  return <Dashboard />
}

function Dashboard() {
  const { user, logout, getDashboard } = useAuth(); const roomId = Number(new URLSearchParams(window.location.search).get('clientId')) || undefined; const [data, setData] = useState<DashboardData | null>(null); const [error, setError] = useState(''); useEffect(() => { getDashboard(roomId).then(setData).catch((reason: Error) => setError(reason.message)) }, []); if (error) return <main className="dashboard-page"><p className="auth-error">{error}</p></main>; return <main className="dashboard-page"><header className="dashboard-header"><div><p className="eyebrow"><span className="eyebrow-dot" /> {user?.role === 'trainer' ? 'TRAINER CONSOLE' : 'YOUR TRAINING ROOM'}</p><h1>{user?.role === 'trainer' && !roomId ? 'The people behind the progress.' : `Welcome back${data?.profile?.name ? `, ${data.profile.name}` : ''}.`}</h1></div><button className="text-button" onClick={logout}>Sign out</button></header>{user?.role === 'trainer' && !roomId ? <TrainerHome /> : <ClientHome data={data} roomId={roomId} />}</main>
}
function ClientHome({ data, roomId }: { data: DashboardData | null; roomId?: number }) { const suffix = roomId ? `?clientId=${roomId}` : ''; return <div className="dashboard-grid"><section className="dashboard-card profile-card"><span className="card-kicker">PROFILE</span><h2>{data?.profile?.name ?? 'Your profile'}</h2><p>{data?.profile?.goal || 'Your goals will appear here.'}</p></section><section className="dashboard-card"><span className="card-kicker">DAILY TRACKER</span><strong>{data?.daily.length ?? 0}</strong><p>check-ins recorded</p><a href={`/dailytrack${suffix}`}>Open daily tracker →</a></section><section className="dashboard-card"><span className="card-kicker">MONTHLY PROGRESS</span><strong>{data?.monthly.length ?? 0}</strong><p>measurements recorded</p><a href={`/monthlytrack${suffix}`}>Open progress tracker →</a></section><section className="dashboard-card"><span className="card-kicker">UPCOMING SESSIONS</span><strong>{data?.slots.length ?? 0}</strong><p>sessions on the calendar</p></section><section className="dashboard-card report-card"><span className="card-kicker">PROGRESS REPORTS</span>{data?.reports.length ? data.reports.map((report) => <div key={report.id}><h3>{report.title}</h3><p>{report.body}</p></div>) : <p>Your trainer's reports will appear here.</p>}</section></div> }
function TrainerHome() { return <div className="dashboard-grid"><section className="dashboard-card profile-card"><span className="card-kicker">CLIENT DIRECTORY</span><h2>Client rooms</h2><p>Private profiles and progress, all in one place.</p><a href="/admin/clients">Open client directory →</a></section><section className="dashboard-card"><span className="card-kicker">QUICK ADD</span><p>Create a client account, then hand over their temporary password securely.</p><a href="/admin/clients">Add a client →</a></section></div> }

function TrainerClients() {
  const { logout } = useAuth();
  const [clients, setClients] = useState<ClientEntry[]>([]);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', goal: '' });
  const [message, setMessage] = useState('');
  const headers = { Authorization: `Bearer ${localStorage.getItem('manufit-token') ?? ''}`, 'Content-Type': 'application/json' };

  async function load() {
    const response = await fetch(`${API}/trainer/clients`, { headers });
    const payload = await response.json();
    setClients((payload.clients ?? []) as ClientEntry[])
  }

  useEffect(() => { load() }, [])

  async function add(event: FormEvent) {
    event.preventDefault();
    const response = await fetch(`${API}/trainer/clients`, { method: 'POST', headers, body: JSON.stringify(form) });
    const data = await response.json();
    setMessage(response.ok ? 'Client account created.' : data.error);
    if (response.ok) { setForm({ name: '', email: '', password: '', goal: '' }); load() }
  }

  async function reset(id: number) {
    const password = window.prompt('Set a temporary password (8+ characters):');
    if (!password) return;
    const response = await fetch(`${API}/trainer/clients/${id}/reset-password`, { method: 'POST', headers, body: JSON.stringify({ password }) });
    setMessage(response.ok ? 'Temporary password reset.' : (await response.json()).error);
    load();
  }

  const filteredClients = clients.filter((client) => `${client.name} ${client.email}`.toLowerCase().includes(query.toLowerCase()));

  return <main className="dashboard-page"><header className="dashboard-header"><div><p className="eyebrow"><span className="eyebrow-dot" /> CLIENT DIRECTORY</p><h1>Every room, thoughtfully held.</h1></div><div><button className="text-button" onClick={() => { window.location.href = '/' }}>Dashboard</button> <button className="text-button" onClick={logout}>Sign out</button></div></header><div className="directory-grid"><section className="dashboard-card"><span className="card-kicker">NEW CLIENT</span><form onSubmit={add} className="directory-form"><input placeholder="Client name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /><input type="email" placeholder="Client email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /><input type="password" placeholder="Temporary password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /><input placeholder="Goal" value={form.goal} onChange={(event) => setForm({ ...form, goal: event.target.value })} /><button type="submit" className="auth-submit">CREATE CLIENT <span>→</span></button>{message && <p className="auth-error">{message}</p>}</form></section><section className="dashboard-card"><span className="card-kicker">CLIENTS</span><div className="client-filter"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search clients" /></div><div className="directory-list">{filteredClients.length ? filteredClients.map((client) => <article key={client.id} className="client-row"><div><p className="card-kicker">CLIENT</p><h2>{client.name}</h2><p>{client.goal || 'No goal set yet.'}</p><small>{client.email}</small></div><div className="client-row-actions"><button type="button" className="client-view-button" onClick={() => { window.location.href = `/admin/clients/${client.id}` }}>View Client</button><button type="button" className="text-button" onClick={() => reset(client.id)}>Reset password</button></div></article>) : <p className="empty-history">No clients match your search.</p>}</div></section></div></main>
}

function TrainerClientDetailPage() {
  const { getDashboard } = useAuth();
  const clientId = Number(window.location.pathname.split('/').filter(Boolean).pop());
  const [client, setClient] = useState<ClientEntry | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [rangeKey, setRangeKey] = useState<RangeKey>('thisMonth');
  const [customStart, setCustomStart] = useState(getToday());
  const [customEnd, setCustomEnd] = useState(getToday());

  useEffect(() => {
    if (!clientId) return
    const headers = { Authorization: `Bearer ${localStorage.getItem('manufit-token') ?? ''}`, 'Content-Type': 'application/json' }
    fetch(`${API}/trainer/clients`, { headers })
      .then((response) => response.json())
      .then((payload) => setClient((payload.clients ?? []).find((entry: ClientEntry) => Number(entry.id) === clientId) ?? null))
      .catch(() => setClient(null))

    getDashboard(clientId)
      .then((data) => setDashboard(data))
      .catch(() => setDashboard(null))
  }, [clientId, getDashboard])

  const { start, end } = computeDateRange(rangeKey, customStart, customEnd)
  const filteredDaily = (dashboard?.daily ?? []).filter((record: any) => record.date >= start && record.date <= end)
  const filteredMonthly = (dashboard?.monthly ?? []).filter((record: any) => record.date >= start && record.date <= end)
  const totalRangeDays = getRangeDays(start, end).length
  const activeDays = new Set(filteredDaily.map((record: any) => record.date)).size
  const adherence = totalRangeDays ? Math.round((activeDays / totalRangeDays) * 100) : 0
  const completedWorkouts = filteredDaily.filter((record: any) => record.training === 'Completed').length
  const workoutRate = filteredDaily.length ? Math.round((completedWorkouts / filteredDaily.length) * 100) : 0
  const averageSleep = filteredDaily.length ? filteredDaily.reduce((sum: number, record: any) => sum + parseSleepHours(record.sleep), 0) / filteredDaily.length : 0
  const averageStress = filteredDaily.length ? filteredDaily.reduce((sum: number, record: any) => sum + parseStressScore(record.stress), 0) / filteredDaily.length : 0
  const chartData = [...filteredMonthly].reverse().map((entry: any) => ({ date: formatDate(entry.date).replace(/, \d{4}/, ''), weight: entry.weight, waist: entry.waist }))

  const openReport = () => {
    const params = new URLSearchParams({ clientId: String(clientId), start, end, name: client?.name ?? 'Client' })
    window.open(`/report?${params.toString()}`, '_blank', 'noopener,noreferrer')
  }

  if (!client || !dashboard) return <main className="dashboard-page"><p className="auth-error">Loading client profile…</p></main>

  return <main className="dashboard-page client-detail-page"><header className="dashboard-header client-detail-header"><div><p className="eyebrow"><span className="eyebrow-dot" /> CLIENT DETAIL</p><h1>{client.name}</h1><p className="client-summary">{dashboard.profile?.goal || 'No goal set yet.'}</p></div><div className="client-header-meta"><span>Joined {client.created_at ? formatDate(client.created_at.slice(0, 10)) : 'Recently'}</span><button type="button" className="client-view-button" onClick={openReport}>Generate Monthly Report</button></div></header><section className="client-detail-card"><div className="date-range-controls"><button type="button" className={rangeKey === 'thisMonth' ? 'range-pill active' : 'range-pill'} onClick={() => setRangeKey('thisMonth')}>This month</button><button type="button" className={rangeKey === 'last30' ? 'range-pill active' : 'range-pill'} onClick={() => setRangeKey('last30')}>Last 30 days</button><button type="button" className={rangeKey === 'custom' ? 'range-pill active' : 'range-pill'} onClick={() => setRangeKey('custom')}>Custom range</button></div>{rangeKey === 'custom' && <div className="custom-range-row"><label>Start<input type="date" value={customStart} onChange={(event) => setCustomStart(event.target.value)} /></label><label>End<input type="date" value={customEnd} onChange={(event) => setCustomEnd(event.target.value)} /></label></div>}<div className="summary-grid"><div className="summary-card"><span>Adherence</span><strong>{adherence}%</strong><small>{activeDays} logged days / {totalRangeDays} days</small></div><div className="summary-card"><span>Workout completion</span><strong>{workoutRate}%</strong><small>{completedWorkouts} completed</small></div><div className="summary-card"><span>Avg sleep</span><strong>{averageSleep.toFixed(1)}h</strong><small>Across {filteredDaily.length || 0} entries</small></div><div className="summary-card"><span>Avg stress</span><strong>{averageStress ? averageStress.toFixed(1) : '0.0'}</strong><small>1 = low • 3 = high</small></div></div></section><section className="client-detail-card"><div className="section-header"><h2>Daily history</h2><span>{filteredDaily.length} entries</span></div>{filteredDaily.length ? <div className="history-table-wrap"><table><thead><tr><th>Date</th><th>Food</th><th>Sleep</th><th>Stress</th><th>Training</th></tr></thead><tbody>{filteredDaily.map((record: any) => <tr key={record.date}><td>{formatDate(record.date)}</td><td>{record.food}</td><td>{record.sleep}</td><td>{record.stress}</td><td><span className={`training-badge ${record.training === 'Completed' ? 'success' : record.training === 'Not completed' ? 'danger' : 'neutral'}`}>{record.training}</span></td></tr>)}</tbody></table></div> : <p className="empty-history">No daily check-ins in the selected range.</p>}</section><section className="client-detail-card"><div className="section-header"><h2>Monthly tracking</h2><span>{filteredMonthly.length} entries</span></div>{filteredMonthly.length ? <><div className="chart-wrap chart-panel"><ResponsiveContainer width="100%" height={280}><LineChart data={chartData} margin={{ top: 10, right: 14, left: 0, bottom: 0 }}><CartesianGrid stroke="#ece7f2" strokeDasharray="3 3" /><XAxis dataKey="date" stroke="#8b8194" /><YAxis stroke="#8b8194" /><Tooltip /><Legend /><Line type="monotone" dataKey="weight" name="Weight" stroke="#e26f45" strokeWidth={3} dot={{ r: 4 }} /><Line type="monotone" dataKey="waist" name="Waist" stroke="#7656a8" strokeWidth={3} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div><div className="history-table-wrap"><table><thead><tr><th>Date</th><th>Weight</th><th>Waist</th><th>Measurements</th><th>Photos</th></tr></thead><tbody>{filteredMonthly.map((entry: any) => <tr key={entry.date}><td>{formatDate(entry.date)}</td><td>{entry.weight} {entry.weight_unit}</td><td>{entry.waist} {entry.waist_unit}</td><td>{[entry.chest, entry.hips, entry.arms, entry.thighs].filter((value) => value !== null && value !== undefined).length ? [entry.chest && `Chest ${entry.chest}`, entry.hips && `Hips ${entry.hips}`, entry.arms && `Arms ${entry.arms}`, entry.thighs && `Thighs ${entry.thighs}`].filter(Boolean).join(' · ') : '—'}</td><td>{entry.photos?.length ? <div className="thumbnail-list">{entry.photos.map((photo: any) => <img key={`${entry.date}-${photo.label}`} src={photo.file_ref} alt={`${photo.label} progress`} />)}</div> : '—'}</td></tr>)}</tbody></table></div></> : <p className="empty-history">No monthly measurements in the selected range.</p>}</section></main>
}

export function MonthlyReportView() {
  const params = new URLSearchParams(window.location.search)
  const selectedClientId = Number(params.get('clientId'))
  const startDate = params.get('start') || getToday()
  const endDate = params.get('end') || getToday()
  const [client, setClient] = useState<ClientEntry | null>(null)
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)

  useEffect(() => {
    if (!selectedClientId) return
    const headers = { Authorization: `Bearer ${localStorage.getItem('manufit-token') ?? ''}`, 'Content-Type': 'application/json' }
    fetch(`${API}/trainer/clients`, { headers })
      .then((response) => response.json())
      .then((payload) => setClient((payload.clients ?? []).find((entry: ClientEntry) => Number(entry.id) === selectedClientId) ?? null))
      .catch(() => setClient(null))
    fetch(`${API}/dashboard?clientId=${selectedClientId}`, { headers })
      .then((response) => response.json())
      .then((data) => setDashboard(data))
      .catch(() => setDashboard(null))
  }, [selectedClientId])

  const filteredDaily = (dashboard?.daily ?? []).filter((record: any) => record.date >= startDate && record.date <= endDate)
  const filteredMonthly = (dashboard?.monthly ?? []).filter((record: any) => record.date >= startDate && record.date <= endDate)
  const rangeDays = getRangeDays(startDate, endDate).length
  const activeDays = new Set(filteredDaily.map((record: any) => record.date)).size
  const adherence = rangeDays ? Math.round((activeDays / rangeDays) * 100) : 0
  const workoutRate = filteredDaily.length ? Math.round((filteredDaily.filter((record: any) => record.training === 'Completed').length / filteredDaily.length) * 100) : 0
  const averageSleep = filteredDaily.length ? (filteredDaily.reduce((sum: number, record: any) => sum + parseSleepHours(record.sleep), 0) / filteredDaily.length).toFixed(1) : '0.0'
  const averageStress = filteredDaily.length ? (filteredDaily.reduce((sum: number, record: any) => sum + parseStressScore(record.stress), 0) / filteredDaily.length).toFixed(1) : '0.0'

  return <main className="report-view"><div className="report-page"><header className="report-header"><div><p className="eyebrow"><span className="eyebrow-dot" /> MONTHLY PROGRESS REPORT</p><h1>{client?.name ?? 'Client'} Progress Summary</h1></div><button type="button" className="client-view-button" onClick={() => window.print()}>Print / Save PDF</button></header><div className="report-meta"><span>{formatDate(startDate)} – {formatDate(endDate)}</span><span>{dashboard?.profile?.goal || 'No goal set yet.'}</span></div><section className="report-grid"><div className="summary-card"><span>Adherence</span><strong>{adherence}%</strong></div><div className="summary-card"><span>Workout completion</span><strong>{workoutRate}%</strong></div><div className="summary-card"><span>Avg sleep</span><strong>{averageSleep}h</strong></div><div className="summary-card"><span>Avg stress</span><strong>{averageStress}</strong></div></section><section className="report-section"><h2>Daily check-ins</h2><table><thead><tr><th>Date</th><th>Food</th><th>Sleep</th><th>Stress</th><th>Training</th></tr></thead><tbody>{filteredDaily.length ? filteredDaily.map((record: any) => <tr key={record.date}><td>{formatDate(record.date)}</td><td>{record.food}</td><td>{record.sleep}</td><td>{record.stress}</td><td>{record.training}</td></tr>) : <tr><td colSpan={5}>No entries for this period.</td></tr>}</tbody></table></section><section className="report-section"><h2>Monthly measurements</h2><table><thead><tr><th>Date</th><th>Weight</th><th>Waist</th><th>Notes</th></tr></thead><tbody>{filteredMonthly.length ? filteredMonthly.map((entry: any) => <tr key={entry.date}><td>{formatDate(entry.date)}</td><td>{entry.weight} {entry.weight_unit}</td><td>{entry.waist} {entry.waist_unit}</td><td>{[entry.chest, entry.hips, entry.arms, entry.thighs].filter((value) => value !== null && value !== undefined).length ? [entry.chest && `Chest ${entry.chest}`, entry.hips && `Hips ${entry.hips}`, entry.arms && `Arms ${entry.arms}`, entry.thighs && `Thighs ${entry.thighs}`].filter(Boolean).join(' · ') : 'No extra measurements'}</td></tr>) : <tr><td colSpan={4}>No measurements logged for this period.</td></tr>}</tbody></table></section></div></main>
}
