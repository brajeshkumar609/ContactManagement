require('dotenv').config();
const mongoose = require('mongoose');
const faker = require('faker');
const Contact = require('../models/Contact');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/contacts';

async function seed(count = 20) {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  const docs = [];
  for (let i = 0; i < count; i++) {
    docs.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      message: faker.lorem.sentence(),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30))
    });
  }

  const res = await Contact.insertMany(docs);
  console.log(`Inserted ${res.length} contacts`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
