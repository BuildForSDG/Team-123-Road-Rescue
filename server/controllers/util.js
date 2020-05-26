const { validationResult } = require('express-validator');

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


module.exports = {
  format,
  destructUser,
  destructCrash
};
