// Seed sample users into the SkillSwap database.
// Usage: from backend/, run `node scripts/seedUsers.js`
// Re-running is safe: existing emails are skipped (no duplicates).

if (!require('buffer').SlowBuffer) {
  require('buffer').SlowBuffer = require('buffer').Buffer;
}

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const SAMPLE_PASSWORD = 'Password123!';

const sampleUsers = [
  {
    name: 'Demo User',
    email: 'user@demo.com',
    skillsToTeach: ['JavaScript', 'CSS', 'Public Speaking'],
    skillsToLearn: ['Spanish', 'Photography'],
    socials: {},
  },
  {
    name: 'Aisha Khan',
    email: 'aisha@skillswap.demo',
    skillsToTeach: ['React', 'TypeScript', 'UI Design'],
    skillsToLearn: ['Rust', 'System Design'],
    socials: { linkedin: 'https://linkedin.com/in/aisha-khan' },
  },
  {
    name: 'Liam OConnor',
    email: 'liam@skillswap.demo',
    skillsToTeach: ['Guitar', 'Music Theory'],
    skillsToLearn: ['Spanish', 'Public Speaking'],
    socials: { twitter: 'https://twitter.com/liamoc' },
  },
  {
    name: 'Sofia Rossi',
    email: 'sofia@skillswap.demo',
    skillsToTeach: ['Italian', 'Cooking', 'Watercolor'],
    skillsToLearn: ['Photography', 'French'],
    socials: { facebook: 'https://facebook.com/sofia.rossi' },
  },
  {
    name: 'Daniel Park',
    email: 'daniel@skillswap.demo',
    skillsToTeach: ['Python', 'Data Science', 'SQL'],
    skillsToLearn: ['Public Speaking', 'Korean'],
    socials: { linkedin: 'https://linkedin.com/in/daniel-park' },
  },
  {
    name: 'Maya Patel',
    email: 'maya@skillswap.demo',
    skillsToTeach: ['Yoga', 'Meditation', 'Hindi'],
    skillsToLearn: ['Digital Marketing', 'Video Editing'],
    socials: {},
  },
  {
    name: 'Noah Schmidt',
    email: 'noah@skillswap.demo',
    skillsToTeach: ['German', 'Chess', 'Calculus'],
    skillsToLearn: ['Drawing', 'Cooking'],
    socials: { linkedin: 'https://linkedin.com/in/noah-schmidt' },
  },
  {
    name: 'Chen Wei',
    email: 'chen@skillswap.demo',
    skillsToTeach: ['Mandarin', 'Calligraphy', 'Tai Chi'],
    skillsToLearn: ['English Writing', 'JavaScript'],
    socials: { twitter: 'https://twitter.com/chenwei' },
  },
  {
    name: 'Fatima Hassan',
    email: 'fatima@skillswap.demo',
    skillsToTeach: ['Arabic', 'Calligraphy', 'Baking'],
    skillsToLearn: ['Web Development', 'SEO'],
    socials: {},
  },
  {
    name: 'Ethan Brooks',
    email: 'ethan@skillswap.demo',
    skillsToTeach: ['Photography', 'Adobe Lightroom'],
    skillsToLearn: ['Drone Piloting', 'Color Grading'],
    socials: { twitter: 'https://twitter.com/ethanbrooks' },
  },
  {
    name: 'Yuki Tanaka',
    email: 'yuki@skillswap.demo',
    skillsToTeach: ['Japanese', 'Origami', 'Sketching'],
    skillsToLearn: ['English Conversation', 'Pottery'],
    socials: { linkedin: 'https://linkedin.com/in/yuki-tanaka' },
  },
  {
    name: 'Olivia Martin',
    email: 'olivia@skillswap.demo',
    skillsToTeach: ['Creative Writing', 'Editing'],
    skillsToLearn: ['Screenwriting', 'French'],
    socials: { twitter: 'https://twitter.com/oliviam' },
  },
  {
    name: 'Rafael Gomez',
    email: 'rafael@skillswap.demo',
    skillsToTeach: ['Salsa Dancing', 'Spanish'],
    skillsToLearn: ['Music Production', 'Photography'],
    socials: { facebook: 'https://facebook.com/rafael.gomez' },
  },
];

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set. Did you create backend/.env?');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(SAMPLE_PASSWORD, salt);

  let inserted = 0;
  let skipped = 0;

  for (const u of sampleUsers) {
    const exists = await User.findOne({ email: u.email });
    if (exists) {
      skipped += 1;
      continue;
    }
    await User.create({
      ...u,
      password: hashed,
      role: 'user',
      profilePicture: '',
      status: 'active',
    });
    inserted += 1;
  }

  console.log(`Seed complete. Inserted: ${inserted}, skipped (already existed): ${skipped}.`);
  console.log(`All sample accounts share password: ${SAMPLE_PASSWORD}`);
  await mongoose.disconnect();
}

run().catch(async (err) => {
  console.error('Seed failed:', err);
  try { await mongoose.disconnect(); } catch {}
  process.exit(1);
});
