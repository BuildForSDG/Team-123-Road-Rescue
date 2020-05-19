const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

//app.use('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'dist/index.html')));

app.use('/', (req, res) => res.redirect(path.resolve(__dirname, '..', 'public/index.html')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) return;
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
