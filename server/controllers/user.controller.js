/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');
const passport = require('passport');
const {
  Users, CrashReport, ContactUs, UserMessages
} = require('../database/models');
const {
  format, destructUser, destructCrash, generateJwt, errorController, returnValidation,
  returnError400, returnToken, returnError401, returnMsgStatus, twentyfour
} = require('./controllerUtil');

const secret = require('../authenticationConfig/jwtConfig');


/**
*
* endpoints
* asterisks means required
*
* post /users email*,password*, name*, mob_phone*, address, state
* post /users/login email*, password*
* post post/users/crashreport   name, number_victims, location*, user_id, image,
* video, message* (user must be authenticated)
* post /users/crashreportanon name, number_victims, location*, user_id, image,
* video, message* (not authenticated)
* post /users/contactus  name, email, message*
* post /users/postMessage   user_id, message* (authenticated)
* put /users/postMessage  update message  messaged_id* message
* get /user/message   all users messages jwt
* get /user userprofile jwt
* put /users update user email*,password*, name*, mob_phone*, address*, state*
* @class UserController
*/
class UserController {
  /**
   * create a User record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof UserController
   */

  // eslint-disable-next-line consistent-return
  // eslint-disable-next-line no-unused-vars
  static async create(req, res, _next) {
    const result = format(req);
    if (!result.isEmpty()) {
      return returnValidation(res, req, result, errorController('USR_1001', result.array(), 'email', 422));
    }


    const {
      // eslint-disable-next-line camelcase
      email, name, password, mob_phone, address, state
    } = req.query;

    const userx = await Users.findOne({
      where: {
        // eslint-disable-next-line object-shorthand
        email: email
      }
    });

    if (userx) {
      return res.status(400).json({
        error: errorController('USR_1002', 'The email already exists.', 'email', 400)
      });
    }

    Users.create({
      email,
      password,
      name,
      mob_phone,
      address,
      state
    })
      .then((user) => res.status(200).json({
        user: destructUser(user),

        accessToken: `Bearer ${returnToken(user)}`,
        expiresIn: twentyfour
      }))
    // eslint-disable-next-line no-unused-vars
      .catch((err) => res.status(400).json({
        error: errorController('USR_1003', err.message, 'register', 400)
      }));
  }

  /**
   * log in a user
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, and access token
   * @memberof UserController
   */
  static async login(req, res, next) {
    passport.authenticate(
      'login',
      { session: false },

      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line consistent-return
      async (err, user) => {
        try {
          if (err || !user) {
            return returnError401(res, errorController('USR_1004', 'error occuured', 'email/password login', 401));
          }
          // eslint-disable-next-line consistent-return
          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);
            return generateJwt(user, res, 'USR_1005', 'Error occurred', 'jwt signing', 400);
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }


  /**
   * Recieve Crash Report
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status report
   * @memberof UserController
   */
  static async crashReport(req, res, next) {
    // eslint-disable-next-line consistent-return
    passport.authenticate('jwt', async (err, user) => {
      const result = format(req);
      if (!result.isEmpty()) {
        return returnValidation(res, result, errorController('USR_1005', result.array(), 'message, location', 422));
      }
      if (err || !user) {
        returnError400(res, errorController('USR_1006', 'Error occurred', 'jwt login', 400));
      }
      // eslint-disable-next-line consistent-return
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const {
          // eslint-disable-next-line camelcase
          name, number_victims, location, image, video, message
        } = req.query;
          // eslint-disable-next-line camelcase
        const { user_id } = user;

        CrashReport.create({
          name, number_victims, location, user_id, image, video, message
        })
          .then((report) => res.status(200).json({

            crashReport: destructCrash(report),

            user: destructUser(user),

            accessToken: `Bearer ${returnToken(user)}`,
            expiresIn: twentyfour
          }))
        // eslint-disable-next-line no-unused-vars
          .catch((_err) => res.status(400).json({
            error: errorController('USR_1007', _err.message, 'crash report', 400)
          }));
      });
    })(req, res, next);
  }

  /**
   * Recieve Crash Report
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status report
   * @memberof UserController
   */
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line consistent-return
  static async crashReportAnon(req, res) {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line consistent-return

    const result = format(req);
    if (!result.isEmpty()) {
      return returnValidation(res, result, errorController('USR_1001', result.array(), result.array(), 422));
    }


    const {
      // eslint-disable-next-line camelcase
      name, number_victims, location, image, video, message
    } = req.query;
    // eslint-disable-next-line camelcase


    CrashReport.create({
      name, number_victims, location, image, video, message
    })
      .then((report) => res.status(200).json({

        crashReport: destructCrash(report)
      }))
      // eslint-disable-next-line no-unused-vars
      .catch((_err) => res.status(400).json({
        error: errorController('USR_1008', _err.message, 'rash', 400)
      }));
  }


  /**
   * Recieve Crash Report
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status report
   * @memberof UserController
   */
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line consistent-return
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line consistent-return
  static async contactUs(req, res) {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line consistent-return

    const result = format(req);
    if (!result.isEmpty()) {
      return returnValidation(res, result, errorController('USR_1009', result.array(), 'email, location', 422));
    }


    const {
      // eslint-disable-next-line camelcase
      name, email, message
    } = req.query;
    // eslint-disable-next-line camelcase
    let userx;
    // eslint-disable-next-line camelcase
    let user_id;
    if (email) {
      userx = await Users.findOne({
        where: {
        // eslint-disable-next-line object-shorthand
          email: email
        }
      });
    }

    let usermassage = {

      name, email, message

    };
    // eslint-disable-next-line camelcase

    if (userx) {
      // eslint-disable-next-line camelcase
      user_id = userx.user_id;
      usermassage = {

        name, email, message, user_id

      };
    }


    ContactUs.create(usermassage)
      .then((msg) => res.status(200).json({

        contactUs: {
          name: msg.name,
          email: msg.email,
          message: msg.message

        }
      }))
      // eslint-disable-next-line no-unused-vars
      .catch((_err) => res.status(400).json({
        error: errorController('USR_1010', _err.message, 'contactus', 400)
      }));
  }

  /**
   * All user messages
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status report
   * @memberof UserController
   */
  static async getUserMessages(req, res, next) {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line consistent-return
    passport.authenticate('jwt', async (err, user) => {
      const result = format(req);
      if (!result.isEmpty()) {
        return returnValidation(res, result, errorController('USR_1011', result.array(), 'message, location', 422));
      }
      if (err || !user) {
        returnError400(res, errorController('USR_1012', 'Error occurred', 'jwt login', 400));
      }
      // eslint-disable-next-line consistent-return
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        // eslint-disable-next-line camelcase
        const { user_id } = user;

        UserMessages.findAll({ where: { user_id } })

          .then((msgs) => res.status(200).json({

            messages: {
              rows: msgs
            },

            user: destructUser(user),

            accessToken: `Bearer ${returnToken(user)}`,
            expiresIn: twentyfour
          }))
        // eslint-disable-next-line no-unused-vars
          .catch((_err) => res.status(400).json({
            error: errorController('USR_1013', _err.message, 'messages crash', 400)
          }));
      });
    })(req, res, next);
  }

  /**
   * Post user messages
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status report
   * @memberof UserController
   */
  static async postMessages(req, res, next) {
    // eslint-disable-next-line consistent-return
    passport.authenticate('jwt', async (err, user) => {
      const result = format(req);
      if (!result.isEmpty()) {
        return returnValidation(res, result, errorController('USR_1014', result.array(), 'message, location', 422));
      }
      if (err || !user) {
        return returnError400(res, errorController('USR_1015', 'Error occurred', 'jwt login', 400));
      }
      // eslint-disable-next-line consistent-return
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        // eslint-disable-next-line camelcase
        const { user_id } = user;
        const { message } = req.query;

        UserMessages.create({ user_id, message })

          .then((msg) => returnMsgStatus(msg, res, user))
        // eslint-disable-next-line no-unused-vars
          .catch((_err) => res.status(400).json({
            error: errorController('USR_1016', _err.message, 'messages', 400)
          }));
      });
    })(req, res, next);
  }


  /**
   * All user messages
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status report
   * @memberof UserController
   */
  static async updateMessages(req, res, next) {
    // eslint-disable-next-line consistent-return
    passport.authenticate('jwt', async (err, user) => {
      const result = await format(req);

      if (!result.isEmpty()) {
        return returnValidation(res, req, result, errorController('USR_1017', result.array(), 'message, location', 422));
      }
      if (err || !user) {
        returnError400(res, errorController('USR_1018', 'Error occurred', 'jwt login', 400));
      }
      // eslint-disable-next-line consistent-return
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id

        // eslint-disable-next-line camelcase
        const { message, message_id } = req.query;

        UserMessages.update({ message },
          { returning: true, where: { message_id } })

          .then((msg) => returnMsgStatus(msg, res, user))
        // eslint-disable-next-line no-unused-vars
          .catch((_err) => res.status(400).json({
            error: errorController('USR_1019', _err.message, 'message crash', 400)
          }));
      });
    })(req, res, next);
  }

  /**
   * Get user profile
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, and access token
   * @memberof UserController
   */
  static async geUserProfile(req, res, next) {
    passport.authenticate(
      'jwt',
      { session: false },

      async (err, user) => {
        try {
          if (err || !user) {
            return returnError401(res, errorController('USR_1020', err.message, 'email/password login', 401));
          }
          // eslint-disable-next-line consistent-return
          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

            return generateJwt(user, res, 'USR_1021', 'Error occurred', 'jwt signing', 400);
            // eslint-disable-next-line consistent-return
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }

  /**
   * update user
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, and access token
   * @memberof UserController
   */
  static async updateUser(req, res, next) {
    passport.authenticate(
      'jwt',
      { session: false },

      async (err, user) => {
        try {
          if (err || !user) {
            return returnError401(res, errorController('USR_1022', err.message, 'email/password login', 401));
          }
          // eslint-disable-next-line consistent-return
          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

            const {
              // eslint-disable-next-line camelcase
              email, name, password, mob_phone, address, state
            } = req.query;
            // eslint-disable-next-line camelcase
            const { user_id } = user;
            Users.update({
              email,
              password,
              name,
              mob_phone,
              address,
              state
            }, { where: { user_id }, returning: true, plain: true })
              .then((userx) => {
                const payload = { email: user.email };

                const token = jwt.sign(payload, `${secret}`, { expiresIn: twentyfour });

                return res.status(200).json({

                  user: {
                    user_id: userx.user_id,
                    name: userx.name,
                    email: userx.email,
                    address: userx.address,
                    mob_phone: userx.mob_phone,
                    state: userx.state
                  },

                  accessToken: `Bearer ${token}`,
                  expiresIn: twentyfour
                });
              })
              // eslint-disable-next-line no-unused-vars
              .catch((_err) => res.status(400).json({
                error: errorController('USR_1023', err.message, 'crash report', 400)
              }));
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
}


module.exports = UserController;
