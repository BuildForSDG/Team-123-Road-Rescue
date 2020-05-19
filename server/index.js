const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('dist'));


app.use('/api/check', (req, res) => {

  return res.send("healthy");

});

app.use('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'dist/index.html')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) return;
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
