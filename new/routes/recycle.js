const express = require('express');
const router = express.Router();

// GET /dashboard route
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Plant Disease Detection Dashboard', user: req.user }); // Render the dashboard view with user
});

// GET /recycle route
router.get('/', (req, res) => {
    res.render('recycle', { title: 'Recycling Initiative', user: req.user }); // Render the recycle view with user
});

// Export the router
module.exports = router;
