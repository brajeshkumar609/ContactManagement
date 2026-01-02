const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const mongoose = require('mongoose');

// GET /api/contacts - list contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/contacts - create contact
router.post('/', async (req, res) => {
  try {
    // Log incoming request for debugging (avoid logging sensitive data in prod)
    console.log('POST /api/contacts from', req.ip, 'body=', {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    })

    const { name, email, phone, message } = req.body;

    // Basic validation and sanitization
    if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
    if (!phone || !phone.trim()) return res.status(400).json({ error: 'Phone is required' });
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });

    const contact = new Contact({ name: name.trim(), email: email ? email.trim() : '', phone: phone.trim(), message: message ? String(message).trim() : '' });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/contacts/:id - delete contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });

    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });

    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
