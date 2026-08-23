import { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type MonthlyRecord = {
  client_id: string
  date: string
  weight: number
  weight_unit: 'kg' | 'lb'
  waist: number
  waist_unit: 'cm' | 'in'
  chest: number | null
  hips: number | null
  arms: number | null
  thighs: number | null
  photos: { label: string; file_ref: string }[]
}

const MONTHLY_STORAGE_KEY = 'monthly-tracker-records'
const getToday = () => new Date().toISOString().slice(0, 10)

const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const emptyMonthlyForm = {
  date: getToday(), weight: '', weightUnit: 'kg' as 'kg' | 'lb', waist: '', waistUnit: 'cm' as 'cm' | 'in',
  chest: '', hips: '', arms: '', thighs: '', photos: [] as { label: string; file_ref: string }[],
}

const toNumberOrNull = (value: string) => value === '' ? null : Number(value)

type MonthlyForm = typeof emptyMonthlyForm

function MonthlyTrack() {
  const [form, setForm] = useState<MonthlyForm>(emptyMonthlyForm)
  const [records, setRecords] = useState<MonthlyRecord[]>([])
  const [saved, setSaved] = useState(false)
  const [editingDate, setEditingDate] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(MONTHLY_STORAGE_KEY)
    if (!stored) return
    try { setRecords(JSON.parse(stored) as MonthlyRecord[]) } catch { localStorage.removeItem(MONTHLY_STORAGE_KEY) }
  }, [])

  const updateForm = (field: keyof MonthlyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setSaved(false)
  }

  const loadDate = (date: string) => {
    const existing = records.find((record) => record.date === date)
    if (existing) {
      setForm({ date, weight: String(existing.weight), weightUnit: existing.weight_unit, waist: String(existing.waist), waistUnit: existing.waist_unit, chest: existing.chest === null ? '' : String(existing.chest), hips: existing.hips === null ? '' : String(existing.hips), arms: existing.arms === null ? '' : String(existing.arms), thighs: existing.thighs === null ? '' : String(existing.thighs), photos: existing.photos })
      setEditingDate(date)
    } else {
      setForm((current) => ({ ...emptyMonthlyForm, date, photos: current.photos }))
      setEditingDate(null)
    }
    setSaved(false)
  }

  const saveEntry = () => {
    if (!form.weight || !form.waist) return
    const date = editingDate ?? form.date
    const entry: MonthlyRecord = { client_id: 'default-client', date, weight: Number(form.weight), weight_unit: form.weightUnit, waist: Number(form.waist), waist_unit: form.waistUnit, chest: toNumberOrNull(form.chest), hips: toNumberOrNull(form.hips), arms: toNumberOrNull(form.arms), thighs: toNumberOrNull(form.thighs), photos: form.photos }
    const nextRecords = [...records.filter((record) => record.date !== date), entry].sort((a, b) => a.date.localeCompare(b.date))
    setRecords(nextRecords)
    localStorage.setItem(MONTHLY_STORAGE_KEY, JSON.stringify(nextRecords))
    setSaved(true)
    setEditingDate(null)
  }

  const addPhoto = (label: string, file: File | undefined) => {
    if (!file) return
    const photo = { label, file_ref: URL.createObjectURL(file) }
    setForm((current) => ({ ...current, photos: [...current.photos.filter((item) => item.label !== label), photo].slice(0, 3) }))
  }

  const chartData = records.map((record) => ({ date: formatDate(record.date).replace(/, \d{4}/, ''), weight: record.weight, waist: record.waist }))
  const firstWeight = records[0]?.weight

  return (
    <main className="tracker-page monthly-page"><div className="tracker-shell">
      <header className="tracker-header"><div className="eyebrow"><span className="eyebrow-dot" /> MONTHLY PROGRESS</div><h1>Measure the change.</h1><p>Small, consistent check-ins make your progress visible.</p><div className="today-chip">{formatDate(form.date)}</div></header>
      <section className="tracker-form monthly-form" aria-label="Monthly progress entry">
        <div className="monthly-grid">
          <label>Date<input type="date" value={form.date} onChange={(event) => loadDate(event.target.value)} /></label>
          <label>Body weight<div className="input-with-toggle"><input type="number" min="0" step="0.1" value={form.weight} onChange={(event) => updateForm('weight', event.target.value)} placeholder="0.0" /><select value={form.weightUnit} onChange={(event) => updateForm('weightUnit', event.target.value)}><option>kg</option><option>lb</option></select></div></label>
          <label>Waist measurement<div className="input-with-toggle"><input type="number" min="0" step="0.1" value={form.waist} onChange={(event) => updateForm('waist', event.target.value)} placeholder="0.0" /><select value={form.waistUnit} onChange={(event) => updateForm('waistUnit', event.target.value)}><option>cm</option><option>in</option></select></div></label>
        </div>
        <h2 className="monthly-subheading">Additional measurements <span>optional</span></h2>
        <div className="monthly-grid four"><label>Chest<input type="number" min="0" step="0.1" value={form.chest} onChange={(event) => updateForm('chest', event.target.value)} /></label><label>Hips<input type="number" min="0" step="0.1" value={form.hips} onChange={(event) => updateForm('hips', event.target.value)} /></label><label>Arms<input type="number" min="0" step="0.1" value={form.arms} onChange={(event) => updateForm('arms', event.target.value)} /></label><label>Thighs<input type="number" min="0" step="0.1" value={form.thighs} onChange={(event) => updateForm('thighs', event.target.value)} /></label></div>
        <h2 className="monthly-subheading">Progress photos <span>optional, up to 3</span></h2>
        <div className="photo-grid">{['Front', 'Side', 'Back'].map((label) => <label className="photo-upload" key={label}>{form.photos.find((photo) => photo.label === label) ? <img src={form.photos.find((photo) => photo.label === label)?.file_ref} alt={`${label} progress`} /> : <span>+ Add {label}</span>}<input type="file" accept="image/*" onChange={(event) => addPhoto(label, event.target.files?.[0])} /></label>)}</div>
        <button className="save-button" disabled={!form.weight || !form.waist} onClick={saveEntry} type="button"><span>{saved ? 'SAVED' : editingDate ? 'UPDATE ENTRY' : 'SAVE ENTRY'}</span><span aria-hidden="true">→</span></button>
        <p className={`save-message ${saved ? 'visible' : ''}`} role="status">{editingDate ? 'Entry updated.' : 'Monthly entry saved.'}</p>
      </section>
      <section className="history-section" aria-labelledby="monthly-history-title"><div className="history-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> PROGRESS LOG</div><h2 id="monthly-history-title">Progress history</h2></div><span className="record-count">{records.length} {records.length === 1 ? 'entry' : 'entries'}</span></div>
        {records.length === 0 ? <p className="empty-history">Your monthly measurements will appear here.</p> : <div className="history-table-wrap"><table><thead><tr><th>Date</th><th>Weight</th><th>Change</th><th>Waist</th><th>Photos</th><th>Action</th></tr></thead><tbody>{records.map((record, index) => { const previous = records[index - 1]?.weight; const lastChange = previous === undefined ? null : record.weight - previous; const totalChange = firstWeight === undefined ? null : record.weight - firstWeight; return <tr key={record.date}><td>{formatDate(record.date)}</td><td>{record.weight} {record.weight_unit}</td><td>{lastChange === null ? 'N/A' : `${lastChange > 0 ? '+' : ''}${lastChange.toFixed(1)} ${record.weight_unit} since last`}<br />{totalChange === null ? '' : `${totalChange > 0 ? '+' : ''}${totalChange.toFixed(1)} ${record.weight_unit} total`}</td><td>{record.waist} {record.waist_unit}</td><td><div className="thumbnail-list">{record.photos.map((photo) => <img key={photo.label} src={photo.file_ref} alt={`${photo.label} progress thumbnail`} />)}</div></td><td><button className="edit-button" onClick={() => loadDate(record.date)} type="button">Edit</button></td></tr>})}</tbody></table></div>}
      </section>
      <section className="chart-section" aria-labelledby="trend-title"><div className="history-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> YOUR TREND</div><h2 id="trend-title">Measurement trend</h2></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={300}><LineChart data={chartData} margin={{ top: 10, right: 15, left: 0, bottom: 5 }}><CartesianGrid stroke="#ece7f2" strokeDasharray="3 3" /><XAxis dataKey="date" stroke="#8b8194" /><YAxis stroke="#8b8194" /><Tooltip /><Legend /><Line type="monotone" dataKey="weight" name="Weight" stroke="#e26f45" strokeWidth={3} dot={{ r: 4 }} /><Line type="monotone" dataKey="waist" name="Waist" stroke="#7656a8" strokeWidth={3} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div></section>
    </div></main>
  )
}

export default MonthlyTrack
