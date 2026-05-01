// controllers/matchController.js

const User = require('../models/User');

// Returns one entry per (user, skillTheyTeach), regardless of whether the
// current user listed that skill under skillsToLearn. This makes the page a
// browse/search experience: anyone teaching anything is discoverable.
const getSkillMatches = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id },
      role: { $ne: 'admin' },
      'skillsToTeach.0': { $exists: true },
    }).select('-password');

    const matches = users.flatMap((user) =>
      user.skillsToTeach.map((teachSkill) => ({
        user,
        teachSkill,
        learnSkill: teachSkill,
      }))
    );

    res.json(matches);
  } catch (err) {
    console.error('Error fetching matches:', err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getSkillMatches };
