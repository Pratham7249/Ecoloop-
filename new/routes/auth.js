const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming a User model exists
const passport = require('passport'); // Assuming passport is used for authentication

// Define authentication routes
router.get('/login', (req, res) => {
    res.send('Login page');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', (req, res) => {
    res.send('Signup page');
});

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username });
        await User.register(newUser, password);
        res.redirect('/login');
    } catch (error) {
        res.redirect('/signup');
    }
});


module.exports = router;
