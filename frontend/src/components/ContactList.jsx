import React, { useMemo, useState } from 'react'

export default function ContactList({ contacts, loading, onDelete, phoneMode = false, onSelect, selectedId }) {
  const [q, setQ] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    let out = contacts.filter(c => {
      if (!s) return true
      return (c.name || '').toLowerCase().includes(s) || (c.email || '').toLowerCase().includes(s) || (c.phone || '').toLowerCase().includes(s)
    })

    if (sortBy === 'newest') out = out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    else if (sortBy === 'oldest') out = out.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    else if (sortBy === 'name-asc') out = out.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    else if (sortBy === 'name-desc') out = out.sort((a, b) => (b.name || '').localeCompare(a.name || ''))

    return out
  }, [contacts, q, sortBy])

  if (loading) return <div>Loading...</div>
  if (!contacts.length) return <div className="text-muted">No contacts yet.</div>

  return (
    <div>
      <div className="d-flex mb-2">
        <input className="form-control me-2" placeholder="Search name, email or phone" value={q} onChange={e => setQ(e.target.value)} />
        <select className="form-select w-auto" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name-asc">Name ↑</option>
          <option value="name-desc">Name ↓</option>
        </select>
      </div>

      <div className={"table-responsive " + (phoneMode ? 'phone-list' : '')}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c._id} className={selectedId === c._id ? 'table-primary' : ''} onClick={() => onSelect && onSelect(c)}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.message}</td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); onDelete(c._id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
