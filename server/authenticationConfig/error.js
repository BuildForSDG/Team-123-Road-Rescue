
'Use Strict';

/**
 * @typedef error
 * @property {string} code - error code like 'USR-01'
 * @property {string} message - error message
 * @property {string} field  - error field
 * @property {status} status  - error status like 400
 */

function Error(code, message, field, status) {
  this.code = code;
  this.message = message;
  this.email = field;
  this.status = status;
}

module.exports = Error;
