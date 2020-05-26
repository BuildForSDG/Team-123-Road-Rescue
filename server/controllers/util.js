const { validationResult } = require('express-validator');

const format = (req) => {
  const errorFormatter = ({ location, msg, param }) => `${location}[${param}]: ${msg}`;
  const result = validationResult(req).formatWith(errorFormatter);

  return result;
};

module.exports = {
  format
}