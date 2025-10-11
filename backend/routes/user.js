const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../models/User'); // Make sure this path is correct

// ✅ GET user profile (protected)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
