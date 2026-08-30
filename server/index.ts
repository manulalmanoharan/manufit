import 'dotenv/config'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import Database from 'better-sqlite3'
import jwt from 'jsonwebtoken'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const db = new Database(path.join(path.dirname(fileURLToPath(import.meta.url)), 'manufit.db'))
const JWT_SECRET = process.env.JWT_SECRET ?? 'replace-this-secret-in-production'
const PORT = Number(process.env.API_PORT ?? 8787)
const DEV_EMAIL = (process.env.DEV_EMAIL ?? 'manulalmanoharan@gmail.com').toLowerCase()
const DEV_PASSWORD = process.env.DEV_PASSWORD ?? '123'

type Role = 'trainer' | 'client'
type AuthRequest = Request & { user?: { id: number; email: string; role: Role; clientId: number | null } }

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = new Set([
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      undefined,
    ])

    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '2mb' }))

db.exec(`
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER UNIQUE NOT NULL, name TEXT NOT NULL, goal TEXT DEFAULT '', phone TEXT DEFAULT '', FOREIGN KEY(client_id) REFERENCES users(id) ON DELETE CASCADE);
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL COLLATE NOCASE, password_hash TEXT NOT NULL, role TEXT NOT NULL CHECK(role IN ('trainer', 'client')), client_id INTEGER, temp_password INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE IF NOT EXISTS daily_tracking (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER NOT NULL, date TEXT NOT NULL, food TEXT NOT NULL, sleep TEXT NOT NULL, stress TEXT NOT NULL, training TEXT NOT NULL, submitted_by TEXT NOT NULL DEFAULT 'Client', UNIQUE(client_id, date), FOREIGN KEY(client_id) REFERENCES users(id) ON DELETE CASCADE);
  CREATE TABLE IF NOT EXISTS monthly_tracking (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER NOT NULL, date TEXT NOT NULL, weight REAL NOT NULL, weight_unit TEXT NOT NULL, waist REAL NOT NULL, waist_unit TEXT NOT NULL, chest REAL, hips REAL, arms REAL, thighs REAL, photos TEXT NOT NULL DEFAULT '[]', UNIQUE(client_id, date), FOREIGN KEY(client_id) REFERENCES users(id) ON DELETE CASCADE);
  CREATE TABLE IF NOT EXISTS slots (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER NOT NULL, starts_at TEXT NOT NULL, title TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'upcoming', FOREIGN KEY(client_id) REFERENCES users(id) ON DELETE CASCADE);
  CREATE TABLE IF NOT EXISTS progress_reports (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(client_id) REFERENCES users(id) ON DELETE CASCADE);
`)

const trainerEmail = (process.env.TRAINER_EMAIL ?? 'trainer@manufit.local').toLowerCase()
const trainerPassword = process.env.TRAINER_PASSWORD ?? 'ChangeMe123!'
if (!db.prepare('SELECT id FROM users WHERE role = ?').get('trainer')) {
  const result = db.prepare('INSERT INTO users (email, password_hash, role, client_id) VALUES (?, ?, ?, NULL)').run(trainerEmail, bcrypt.hashSync(trainerPassword, 12), 'trainer')
  console.log(`Trainer seeded: ${trainerEmail} / ${trainerPassword} (change via environment before production)`)
  void result
}

if (!db.prepare('SELECT id FROM users WHERE email = ?').get(DEV_EMAIL)) {
  const result = db.prepare('INSERT INTO users (email, password_hash, role, client_id, temp_password) VALUES (?, ?, ?, NULL, 0)').run(DEV_EMAIL, bcrypt.hashSync(DEV_PASSWORD, 12), 'client')
  db.prepare('UPDATE users SET client_id = id WHERE id = ?').run(result.lastInsertRowid)
  db.prepare('INSERT INTO profiles (client_id, name, goal, phone) VALUES (?, ?, ?, ?)').run(result.lastInsertRowid, 'Dev Client', 'Development access', '0000000000')
  console.log(`Development user seeded: ${DEV_EMAIL} / ${DEV_PASSWORD}`)
  void result
}

function signUser(user: { id: number; email: string; role: Role; client_id: number | null }) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role, clientId: user.client_id }, JWT_SECRET, { expiresIn: '7d' })
}

function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Authentication required' })
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: number; email: string; role: Role; clientId: number | null }
    req.user = { id: payload.sub, email: payload.email, role: payload.role, clientId: payload.clientId }
    return next()
  } catch { return res.status(401).json({ error: 'Session expired' }) }
}

function requireTrainer(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'trainer') return res.status(403).json({ error: 'Trainer access required' })
  return next()
}

function scopedClientId(req: AuthRequest, requestedId?: string) {
  if (req.user?.role === 'trainer') return Number(requestedId)
  return req.user?.clientId ?? 0
}

app.post('/api/auth/login', (req, res) => {
  const email = String(req.body.email ?? '').trim().toLowerCase()
  const password = String(req.body.password ?? '')
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any
  if (!user || !bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'Invalid email or password' })
  return res.json({ token: signUser(user), user: { id: user.id, email: user.email, role: user.role, clientId: user.client_id, mustChangePassword: Boolean(user.temp_password) } })
})

app.get('/api/auth/me', requireAuth, (req: AuthRequest, res) => res.json({ user: req.user }))
app.post('/api/auth/change-password', requireAuth, (req: AuthRequest, res) => {
  const password = String(req.body.password ?? '')
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })
  db.prepare('UPDATE users SET password_hash = ?, temp_password = 0 WHERE id = ?').run(bcrypt.hashSync(password, 12), req.user!.id)
  return res.json({ ok: true })
})

app.get('/api/trainer/clients', requireAuth, requireTrainer, (_req, res) => res.json({ clients: db.prepare(`SELECT u.id, u.email, u.client_id as clientId, p.name, p.goal, u.temp_password as mustChangePassword FROM users u LEFT JOIN profiles p ON p.client_id = u.id WHERE u.role = 'client' ORDER BY p.name, u.email`).all() }))
app.post('/api/trainer/clients', requireAuth, requireTrainer, (req, res) => {
  const email = String(req.body.email ?? '').trim().toLowerCase()
  const password = String(req.body.password ?? '')
  const name = String(req.body.name ?? '').trim()
  if (!email || password.length < 8 || !name) return res.status(400).json({ error: 'Name, email, and an 8+ character temporary password are required' })
  try {
    const result = db.transaction(() => {
      const user = db.prepare('INSERT INTO users (email, password_hash, role, temp_password) VALUES (?, ?, ?, 1)').run(email, bcrypt.hashSync(password, 12), 'client')
      db.prepare('UPDATE users SET client_id = id WHERE id = ?').run(user.lastInsertRowid)
      db.prepare('INSERT INTO profiles (client_id, name, goal) VALUES (?, ?, ?)').run(user.lastInsertRowid, name, String(req.body.goal ?? ''))
      return user.lastInsertRowid
    })()
    return res.status(201).json({ id: result })
  } catch { return res.status(409).json({ error: 'That email is already in use' }) }
})
app.post('/api/trainer/clients/:id/reset-password', requireAuth, requireTrainer, (req, res) => {
  const password = String(req.body.password ?? '')
  if (password.length < 8) return res.status(400).json({ error: 'Temporary password must be at least 8 characters' })
  db.prepare('UPDATE users SET password_hash = ?, temp_password = 1 WHERE id = ? AND role = ?').run(bcrypt.hashSync(password, 12), Number(req.params.id), 'client')
  return res.json({ ok: true })
})

app.get('/api/dashboard', requireAuth, (req: AuthRequest, res) => {
  const clientId = scopedClientId(req, req.query.clientId as string | undefined)
  if (!clientId) return res.status(400).json({ error: 'A client room is required' })
  const profile = db.prepare('SELECT * FROM profiles WHERE client_id = ?').get(clientId)
  const daily = db.prepare('SELECT * FROM daily_tracking WHERE client_id = ? ORDER BY date DESC').all(clientId)
  const monthly = db.prepare('SELECT * FROM monthly_tracking WHERE client_id = ? ORDER BY date DESC').all(clientId).map((record: any) => ({ ...record, photos: JSON.parse(record.photos) }))
  const slots = db.prepare('SELECT * FROM slots WHERE client_id = ? ORDER BY starts_at').all(clientId)
  const reports = db.prepare('SELECT * FROM progress_reports WHERE client_id = ? ORDER BY created_at DESC').all(clientId)
  return res.json({ profile, daily, monthly, slots, reports })
})

app.put('/api/daily/:date', requireAuth, (req: AuthRequest, res) => {
  const clientId = scopedClientId(req, req.body.clientId)
  if (!clientId) return res.status(400).json({ error: 'Client room is required' })
  const submittedBy = req.user?.email ?? 'Client'
  const values = [clientId, req.params.date, String(req.body.food), String(req.body.sleep), String(req.body.stress), String(req.body.training), submittedBy]
  db.prepare(`INSERT INTO daily_tracking (client_id, date, food, sleep, stress, training, submitted_by) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(client_id, date) DO UPDATE SET food=excluded.food, sleep=excluded.sleep, stress=excluded.stress, training=excluded.training, submitted_by=excluded.submitted_by`).run(...values)
  return res.json({ ok: true })
})

app.put('/api/monthly/:date', requireAuth, (req: AuthRequest, res) => {
  const clientId = scopedClientId(req, req.body.clientId)
  if (!clientId) return res.status(400).json({ error: 'Client room is required' })
  const record = req.body
  db.prepare(`INSERT INTO monthly_tracking (client_id,date,weight,weight_unit,waist,waist_unit,chest,hips,arms,thighs,photos) VALUES (?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(client_id,date) DO UPDATE SET weight=excluded.weight,weight_unit=excluded.weight_unit,waist=excluded.waist,waist_unit=excluded.waist_unit,chest=excluded.chest,hips=excluded.hips,arms=excluded.arms,thighs=excluded.thighs,photos=excluded.photos`).run(clientId, req.params.date, record.weight, record.weightUnit, record.waist, record.waistUnit, record.chest ?? null, record.hips ?? null, record.arms ?? null, record.thighs ?? null, JSON.stringify(record.photos ?? []))
  return res.json({ ok: true })
})

app.listen(PORT, () => console.log(`ManuFit API listening on http://localhost:${PORT}`))
