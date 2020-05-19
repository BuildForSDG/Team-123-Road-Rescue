const express = require('express');
const path = require('path');

// Set up express server
const app = express();
app.use(express.json());

// Links express server to parcel bundled files
app.use(express.static('dist'));

// Routes all request to landing page to index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
});

// Test route
app.get('/api/test', (req, res) => res.status(200).json({ test: 'test' }));

// Port for local and Heroku
const PORT = process.env.PORT || 3000;

// Prevent Jest Open handle when running test by bridging NOD_ENV
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, (err) => {
    if (err) return;
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;
