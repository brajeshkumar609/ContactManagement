import mongoose from 'mongoose';

// Cache connection across lambda invocations (Vercel serverless)
let cached = global._mongoCache;
if (!cached) cached = global._mongoCache = { conn: null, promise: null };

export async function connect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!process.env.MONGODB_URI) throw new Error('Please set MONGODB_URI environment variable');

  if (!cached.promise) {
    const opts = {
      // Options tuned for serverless
      bufferCommands: false
    };
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export { mongoose };
