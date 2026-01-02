import React, { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import ContactDetails from './components/ContactDetails'
import { getContacts, addContact as apiAdd, deleteContact as apiDelete } from './api'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  // view: 'both' | 'list' | 'form'
  const [view, setView] = useState('both')
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    setLoading(true)
    const items = await getContacts()
    setContacts(items)
    setLoading(false)
  }

  async function addContact(data) {
    const created = await apiAdd(data)
    console.log('addContact result: ', created)
    if (!created) {
      setMessage({ type: 'danger', text: 'Failed to submit' })
      return { error: 'Failed to submit' }
    }
    if (created.error) {
      setMessage({ type: 'danger', text: created.error })
      return created
    }

    setContacts(prev => [created, ...prev])
    setMessage({ type: 'success', text: 'Contact submitted' })
    setTimeout(() => setMessage(null), 2500)
    // switch to list to mimic phone behavior
    setView('list')
    setSelectedContact(created)
    return created
  }

  async function removeContact(id) {
    const ok = await apiDelete(id)
    if (ok) {
      setContacts(prev => prev.filter(c => c._id !== id))
      if (selectedContact && selectedContact._id === id) setSelectedContact(null)
    }
    return ok
  }

  function selectContact(contact) {
    setSelectedContact(contact)
  }

  function closeDetail() {
    setSelectedContact(null)
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 className="mb-0">Contact Management</h1>
          <small className="text-muted">Submit and browse contacts — simple MERN demo</small>
        </div>
        <div className="btn-group" role="group" aria-label="view toggles">
          <button type="button" className={`btn btn-outline-primary ${view === 'form' ? 'active' : ''}`} onClick={() => setView('form')}>New</button>
          <button type="button" className={`btn btn-outline-primary ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>Contacts</button>
          <button type="button" className={`btn btn-outline-primary ${view === 'both' ? 'active' : ''}`} onClick={() => setView('both')}>Both</button>
        </div>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      {view === 'list' && (
        <div className="row">
          <div className="col-12 position-relative">
            <ContactList contacts={contacts} loading={loading} onDelete={removeContact} phoneMode={true} onSelect={selectContact} selectedId={selectedContact ? selectedContact._id : null} />
            {selectedContact && (
              <div className="details-overlay">
                <ContactDetails contact={selectedContact} onClose={closeDetail} onDelete={async (id) => { const ok = await removeContact(id); if (ok) closeDetail(); }} />
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'form' && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <ContactForm onAdd={addContact} />
          </div>
        </div>
      )}

      {view === 'both' && (
        <div className="row">
          <div className="col-md-5">
            <ContactForm onAdd={addContact} />
          </div>
          <div className="col-md-7">
            <h4>Submitted Contacts</h4>
            <div className="d-flex">
              <div className="flex-grow-1">
                <ContactList contacts={contacts} loading={loading} onDelete={removeContact} onSelect={selectContact} selectedId={selectedContact ? selectedContact._id : null} />
              </div>
              <div className="ms-3 d-none d-md-block" style={{ width: '300px' }}>
                {selectedContact ? (
                  <ContactDetails contact={selectedContact} onClose={closeDetail} onDelete={async (id) => { const ok = await removeContact(id); if (ok) closeDetail(); }} />
                ) : (
                  <div className="card p-3 text-muted">Select a contact to see details</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
