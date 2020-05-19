const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static('dist'));

app.use('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'dist/index.html')));

//app.use('/', (req, res) => res.redirect(path.resolve(__dirname, '..', 'dist/index.html')));

app.get('/api/test', (req, res)=>{
  return res.status(200).json({"test":"test"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) return;
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
