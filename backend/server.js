require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middlewares
app.use(helmet());
app.use(express.json({ limit: '10kb' })); // limit body size
app.use(mongoSanitize()); // prevent NoSQL injection
app.use(xss()); // basic XSS protection

// Rate limiter: apply to all requests (tunable)
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

// CORS: allow specific origin in production via env
if (process.env.CORS_ORIGIN) {
  app.use(cors({ origin: process.env.CORS_ORIGIN }));
} else {
  app.use(cors()); // fallback (dev)
}

app.use('/api/contacts', contactsRouter);

app.get('/', (req, res) => res.send('Contact Management API'));

// Generic error handler that hides stack in production
app.use((err, req, res, next) => {
  console.error(err);
  if (process.env.NODE_ENV === 'production') return res.status(500).json({ error: 'Server error' });
  return res.status(500).json({ error: err.message || 'Server error' });
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/contacts';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});
