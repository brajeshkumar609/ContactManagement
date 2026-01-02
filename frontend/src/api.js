const BASE = import.meta.env.VITE_API_URL ?? ''
const DEMO = import.meta.env.VITE_DEMO === 'true'

function buildUrl(path) {
  // Use absolute base if provided (e.g., production), otherwise use relative path to leverage dev proxy
  return BASE ? `${BASE}${path}` : path
}

// Simple localStorage-backed mock database for demo mode
const DEMO_KEY = 'contacts_demo_v1'
function demoLoad() {
  try {
    const raw = localStorage.getItem(DEMO_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    console.error('demoLoad error', e)
    return []
  }
}
function demoSave(list) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(list))
}

export async function getContacts() {
  if (DEMO) {
    // simulate network latency
    await new Promise(r => setTimeout(r, 120))
    const items = demoLoad()
    // sort by createdAt desc
    return items.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  try {
    const res = await fetch(buildUrl('/api/contacts'))
    if (!res.ok) return []
    return await res.json()
  } catch (err) {
    console.error('getContacts error', err)
    return []
  }
}

export async function addContact(data) {
  if (DEMO) {
    await new Promise(r => setTimeout(r, 120))
    const list = demoLoad()
    const entry = { ...data, _id: String(Date.now()) + Math.random().toString(36).slice(2,8), createdAt: new Date().toISOString() }
    list.unshift(entry)
    demoSave(list)
    return entry
  }

  try {
    const res = await fetch(buildUrl('/api/contacts'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      try {
        const err = await res.json()
        return { error: err.error || res.statusText }
      } catch (e) {
        return { error: res.statusText }
      }
    }
    return await res.json()
  } catch (err) {
    console.error('addContact network error', err)
    // Common fetch network error message in browsers is 'Failed to fetch'
    if (err && err.message && err.message.toLowerCase().includes('failed')) {
      return { error: 'Network error: cannot reach backend at ' + BASE }
    }
    return { error: err.message || 'Network error' }
  }
}

export async function deleteContact(id) {
  if (DEMO) {
    await new Promise(r => setTimeout(r, 120))
    const list = demoLoad().filter(c => c._id !== id)
    demoSave(list)
    return true
  }

  try {
    const res = await fetch(buildUrl(`/api/contacts/${id}`), { method: 'DELETE' })
    return res.ok
  } catch (err) {
    console.error('deleteContact network error', err)
    return false
  }
}
