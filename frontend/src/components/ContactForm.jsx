import React, { useState } from 'react'

const initial = { name: '', email: '', phone: '', message: '' }

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)

  function validate(values) {
    const e = {}
    if (!values.name.trim()) e.name = 'Name is required'
    if (!values.phone.trim()) e.phone = 'Phone is required'
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'Invalid email'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const eobj = validate(form)
    setErrors(eobj)
    if (Object.keys(eobj).length) return

    setSubmitting(true)
    setServerError(null)
    try {
      const result = await onAdd(form)
      if (result && result.error) {
        setServerError(result.error)
      } else {
        setForm(initial)
        setErrors({})
      }
    } finally {
      setSubmitting(false)
    }
  }

  const isInvalid = Object.keys(validate(form)).length > 0

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="mb-3">
        <label className="form-label">Name *</label>
        <input name="name" value={form.name} onChange={handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input name="email" value={form.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Phone *</label>
        <input name="phone" value={form.phone} onChange={handleChange} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} className="form-control"></textarea>
      </div>

      {serverError && <div className="alert alert-danger mt-2">{serverError}</div>}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={isInvalid || submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
      </div>
    </form>
  )
}
