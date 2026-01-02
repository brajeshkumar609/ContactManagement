import React from 'react'

export default function ContactDetails({ contact, onClose, onDelete }) {
  if (!contact) return null
  const formatted = contact.createdAt ? new Date(contact.createdAt).toLocaleString() : ''

  return (
    <div className="card details-pane">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 className="card-title mb-0">{contact.name}</h5>
            <small className="text-muted">{formatted}</small>
          </div>
          <div>
            <button className="btn btn-sm btn-outline-secondary me-2" onClick={onClose}>Close</button>
            <button className="btn btn-sm btn-danger" onClick={async () => { if (onDelete) await onDelete(contact._id) }}>Delete</button>
          </div>
        </div>

        <dl className="row mt-3">
          <dt className="col-4">Email</dt>
          <dd className="col-8">{contact.email || '-'}</dd>

          <dt className="col-4">Phone</dt>
          <dd className="col-8">{contact.phone}</dd>

          <dt className="col-4">Message</dt>
          <dd className="col-8">{contact.message || '-'}</dd>
        </dl>
      </div>
    </div>
  )
}
