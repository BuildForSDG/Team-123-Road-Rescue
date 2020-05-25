
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import router from './routes';

const path = require('path');

// Set up express server
const app = express();
app.use(express.json());
app.use(compression());
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Links express server to parcel bundled files
app.use(express.static('dist'));


// initializes the passport configuration.
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
require('./authenticationConfig/authentication')(passport);


// Routes all request to landing page to index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist/index.html'));
});

app.use(router);
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
