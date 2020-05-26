/* eslint-disable consistent-return */

import {
  Users, CrashReport, ContactUs, UserMessages
} from '../database/models';
import { format, destructUser, destructCrash } from './util';

const passport = require('passport');
const jwt = require('jsonwebtoken');
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
      return res.status(422).json({
        error: {
          code: 'USR_1001',
            message: result.array(),  // eslint-disable-line
          field: 'email',
          status: 422
        }
      });
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
        error: {
          code: 'USR_1002',
            message: `The email already exists.`,  // eslint-disable-line
          field: 'email',
          status: 400
        }
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
      .then((user) => {
        const payload = { email: user.email };

        const token = jwt.sign(payload, `${secret}`, { expiresIn: '24h' });

        return res.status(200).json({
          user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            address: user.address,
            mob_phone: user.mob_phone,
            state: user.state
          },

          accessToken: `Bearer ${token}`,
          expiresIn: '24h'
        });
      })
    // eslint-disable-next-line no-unused-vars
      .catch((_err) => res.status(400).json({
        error: {
          code: 'USR_1003',
            message: _err.message,  // eslint-disable-line
          field: 'register',
          status: 400
        }
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
            return res.status(401).json({
              error: {
                code: 'USR_1004',
                message: `Error occurred`,  // eslint-disable-line
                field: 'email/password login,  ',
                status: 401
              }
            });
          }
          // eslint-disable-next-line consistent-return
          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

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
                    code: 'USR_1005',
                    message: `Error occurred`,  // eslint-disable-line
                    field: 'jwt signing',
                    status: 400
                  }
                });
              }

              return res.status(200).json({
                user: destructUser(user),
                accessToken: `Bearer ${token}`,
                expiresIn: '24h'
              });
            });
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
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line consistent-return


    // eslint-disable-next-line consistent-return
    passport.authenticate('jwt', async (err, user) => {
      const result = format(req);
      if (!result.isEmpty()) {
        return res.status(422).json({
          error: {
            code: 'USR_1001',
              message: result.array(),  // eslint-disable-line
            field: 'message, location',
            status: 422
          }
        });
      }
      if (err || !user) {
        return res.status(400).json({
          error: {
            code: 'USR_1006',
              message: `Error occurred`,  // eslint-disable-line
            field: 'jwt login,  ',
            status: 400
          }
        });
      }
      // eslint-disable-next-line consistent-return
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id

        const {
          // eslint-disable-next-line camelcase
          name, number_victims, location, image, video, message
        } = req.query;
          // eslint-disable-next-line camelcase
        const { user_id } = user;

        CrashReport.create({
          name, number_victims, location, user_id, image, video, message
        })
          .then((report) => {
            const payload = { email: user.email };

            const token = jwt.sign(payload, `${secret}`, { expiresIn: '24h' });

            return res.status(200).json({

              crashReport: destructCrash(report),

              user: destructUser(user),

              accessToken: `Bearer ${token}`,
              expiresIn: '24h'
            });
          })
        // eslint-disable-next-line no-unused-vars
          .catch((_err) => res.status(400).json({
            error: {
              code: 'USR_1007',
                message: _err.message,  // eslint-disable-line
              field: 'crash report',
              status: 400
            }
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
      return res.status(422).json({
        error: {
          code: 'USR_1001',
          message: result.array(),  // eslint-disable-line
          field: 'message, location',
          status: 422
        }
      });
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
        error: {
          code: 'USR_1008',
          message: _err.message,  // eslint-disable-line
          field: 'crash report',
          status: 400
        }
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
      return res.status(422).json({
        error: {
          code: 'USR_1009',
          message: result.array(),  // eslint-disable-line
          field: 'email, location',
          status: 422
        }
      });
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
        error: {
          code: 'USR_1010',
          message: _err.message,  // eslint-disable-line
          field: 'contactus',
          status: 400
        }
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


    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line consistent-return
    passport.authenticate('jwt', async (err, user) => {
      const result = format(req);
      if (!result.isEmpty()) {
        return res.status(422).json({
          error: {
            code: 'USR_1011',
              message: result.array(),  // eslint-disable-line
            field: 'message, location',
            status: 422
          }
        });
      }
      if (err || !user) {
        return res.status(400).json({
          error: {
            code: 'USR_1012',
              message: `Error occurred`,  // eslint-disable-line
            field: 'jwt login,  ',
            status: 400
          }
        });
      }
      // eslint-disable-next-line consistent-return
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id

        // eslint-disable-next-line camelcase
        const { user_id } = user;

        UserMessages.findAll({ where: { user_id } })

          .then((msgs) => {
            const payload = { email: user.email };

            const token = jwt.sign(payload, `${secret}`, { expiresIn: '24h' });

            return res.status(200).json({

              messages: {
                rows: msgs
              },

              user: destructUser(user),

              accessToken: `Bearer ${token}`,
              expiresIn: '24h'
            });
          })
        // eslint-disable-next-line no-unused-vars
          .catch((_err) => res.status(400).json({
            error: {
              code: 'USR_1013',
                message: _err.message,  // eslint-disable-line
              field: 'messages crash',
              status: 400
            }
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
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line consistent-return


    // eslint-disable-next-line consistent-return
    passport.authenticate('jwt', async (err, user) => {
      const result = format(req);
      if (!result.isEmpty()) {
        return res.status(422).json({
          error: {
            code: 'USR_1014',
              message: result.array(),  // eslint-disable-line
            field: 'message, location',
            status: 422
          }
        });
      }
      if (err || !user) {
        return res.status(400).json({
          error: {
            code: 'USR_1015',
              message: `Error occurred`,  // eslint-disable-line
            field: 'jwt login,  ',
            status: 400
          }
        });
      }
      // eslint-disable-next-line consistent-return
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id

        // eslint-disable-next-line camelcase
        const { user_id } = user;
        const { message } = req.query;

        UserMessages.create({ user_id, message })

          .then((msg) => {
            const payload = { email: user.email };

            const token = jwt.sign(payload, `${secret}`, { expiresIn: '24h' });

            return res.status(200).json({

              messages: {
                message_id: msg.message_id,
                user_id: msg.user_id,
                message: msg.message

              },

              user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                address: user.address,
                mob_phone: user.mob_phone,
                state: user.state
              },

              accessToken: `Bearer ${token}`,
              expiresIn: '24h'
            });
          })
        // eslint-disable-next-line no-unused-vars
          .catch((_err) => res.status(400).json({
            error: {
              code: 'USR_1016',
                message: _err.message,  // eslint-disable-line
              field: 'messages crash',
              status: 400
            }
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
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line consistent-return


    // eslint-disable-next-line consistent-return
    passport.authenticate('jwt', async (err, user) => {
      try {
        const result = await format(req);

        if (!result.isEmpty()) {
          return res.status(422).json({
            error: {
              code: 'USR_1017',
              message: result.array(),  // eslint-disable-line
              field: 'message, location',
              status: 422
            }
          });
        }
        if (err || !user) {
          return res.status(400).json({
            error: {
              code: 'USR_1018',
              message: `Error occurred`,  // eslint-disable-line
              field: 'jwt login,  ',
              status: 400
            }
          });
        }
        // eslint-disable-next-line consistent-return
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          // We don't want to store the sensitive information such as the
          // user password in the token so we pick only the email and id

          // eslint-disable-next-line camelcase
          const { message, message_id } = req.query;

          UserMessages.update({ message },
            { where: { message_id } })

            .then((msg) => {
              const payload = { email: user.email };

              const token = jwt.sign(payload, `${secret}`, { expiresIn: '24h' });

              return res.status(200).json({

                messages: {
                  message_id: msg.message_id,
                  user_id: msg.user_id,
                  message: msg.message

                },

                user: {
                  user_id: user.user_id,
                  name: user.name,
                  email: user.email,
                  address: user.address,
                  mob_phone: user.mob_phone,
                  state: user.state
                },

                accessToken: `Bearer ${token}`,
                expiresIn: '24h'
              });
            })
            // eslint-disable-next-line no-unused-vars
            .catch((_err) => res.status(400).json({
              error: {
                code: 'USR_1019',
                message: _err.message,  // eslint-disable-line
                field: 'messages crash',
                status: 400
              }
            }));
        });
      } catch (error) {
        return next(error);
      }
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

      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line consistent-return
      async (err, user) => {
        try {
          if (err || !user) {
            return res.status(401).json({
              error: {
                code: 'USR_1020',
                message: `Error occurred`,  // eslint-disable-line
                field: 'email/password login,  ',
                status: 401
              }
            });
          }
          // eslint-disable-next-line consistent-return
          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);

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
                    code: 'USR_1021',
                    message: `Error occurred`,  // eslint-disable-line
                    field: 'jwt signing',
                    status: 400
                  }
                });
              }

              return res.status(200).json({
                user: {
                  user_id: user.user_id,
                  name: user.name,
                  email: user.email,
                  address: user.address,
                  mob_phone: user.mob_phone,
                  state: user.state
                },
                accessToken: `Bearer ${token}`,
                expiresIn: '24h'
              });
            });
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

      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line consistent-return
      async (err, user) => {
        try {
          if (err || !user) {
            return res.status(401).json({
              error: {
                code: 'USR_1022',
                message: `Error occurred`,  // eslint-disable-line
                field: 'email/password login,  ',
                status: 401
              }
            });
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

                const token = jwt.sign(payload, `${secret}`, { expiresIn: '24h' });

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
                  expiresIn: '24h'
                });
              })
              // eslint-disable-next-line no-unused-vars
              .catch((_err) => res.status(400).json({
                error: {
                  code: 'USR_1023',
                  message: _err.message,  // eslint-disable-line
                  field: 'crash report',
                  status: 400
                }
              }));
          });
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
}


export default UserController;
