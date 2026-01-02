import { connect } from './_db.js';

export default async function handler(req, res) {
  try {
    await connect();
    return res.status(200).json({ ok: true, env: process.env.NODE_ENV || 'development' });
  } catch (err) {
    console.error('health check db error', err);
    return res.status(500).json({ ok: false, error: err && err.message ? err.message : String(err) });
  }
}
