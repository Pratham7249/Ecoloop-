const express = require('express');
const exampleMiddleware = require('./middleware');

const app = express();

// Use middleware
app.use(exampleMiddleware);

// Define routes (example)
app.get('/', (req, res) => {
    res.send('Welcome to the application!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
