const express = require('express');
const router  = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Step 1: Redirect user to Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2: Google redirects back here
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    // Sign a JWT with the user's MongoDB _id
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send token to React frontend via URL param
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

module.exports = router;