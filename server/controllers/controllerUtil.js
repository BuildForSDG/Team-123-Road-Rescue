const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = require('../authenticationConfig/jwtConfig');


const format = (req) => {
  const errorFormatter = ({ location, msg, param }) => `${location}[${param}]: ${msg}`;
  const result = validationResult(req).formatWith(errorFormatter);

  return result;
};
const destructUser = (user) => ({
  user_id: user.user_id,
  name: user.name,
  email: user.email,
  address: user.address,
  mob_phone: user.mob_phone,
  state: user.state
});

const destructCrash = (report) => ({
  name: report.name,
  number_victims: report.number_victims,
  location: report.location,
  user_id: report.user_id,
  image: report.image,
  video: report.video,
  message: report.message
});
const destructMessages = (msg) => ({
  message_id: msg.message_id,
  user_id: msg.user_id,
  message: msg.message
});

const errorController = (code, message, field, status) => ({
  code,
  message,
  field,
  status
});


const generateJwt = (user, res, code, message, field, status) => {
  // We don't want to store the sensitive information such as the
  // user password in the token so we pick only the email and id
  const payload = {
    email: user.email
  };

  // eslint-disable-next-line consistent-return
  jwt.sign(payload, `${secret}`, { expiresIn: '24h' }, (errr, token) => {
    if (errr) {
      return res.status(400).json({
        error: {
          code,
          message: message,  // eslint-disable-line
          field,
          status
        }
      });
    }

    return res.status(200).json({
      user: destructUser(user),
      accessToken: `Bearer ${token}`,
      expiresIn: '24h'
    });
  });
};

const returnValidation = (res, _errorController) => res.status(422).json({
  error: _errorController
});
const returnError400 = (res, errController) => res.status(400).json({
  error: errController
});

const returnError401 = (res, errController) => res.status(401).json({
  error: errController
});


const returnToken = (user) => jwt.sign({ email: user.email }, `${secret}`, { expiresIn: '24h' });

const returnMsgStatus = (msg, res, user) => res.status(200).json({

  messages: destructMessages(msg),

  user: destructUser(user),

  accessToken: `Bearer ${returnToken(user)}`,
  expiresIn: '24h'
});

const twentyfour = '24h';
module.exports = {
  format,
  destructUser,
  destructCrash,
  generateJwt,
  errorController,
  returnValidation,
  returnError400,
  returnToken,
  returnError401,
  returnMsgStatus,
  twentyfour
};
