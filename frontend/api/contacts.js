import { connect, mongoose } from './_db.js';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  phone: { type: String, required: true, trim: true },
  message: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default async function handler(req, res) {
  const origin = process.env.CORS_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    await connect();

    if (req.method === 'GET') {
      const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100);
      return res.status(200).json(contacts);
    }

    if (req.method === 'POST') {
      const { name, email, phone, message } = req.body || {};
      if (!name || !phone) return res.status(400).json({ error: 'name and phone are required' });
      const doc = await Contact.create({ name, email, phone, message });
      return res.status(201).json(doc);
    }

    res.setHeader('Allow', 'GET,POST,OPTIONS');
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error('API error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
