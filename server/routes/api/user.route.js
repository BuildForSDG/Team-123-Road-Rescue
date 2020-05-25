/* eslint-disable max-len */
import { Router } from 'express';
import UserController from '../../controllers/user.controller';

const { check } = require('express-validator');

const passport = require('passport');

const router = Router();

/**
 * @route POST /customers
 * @group User - Operations about customer
 * @param {string} email.query.required - email - eg: user@domain.com
 * @param {string} password.query.required - password - eg: shhstehjep
 * @param {string} name.query.required - email - eg: thankgod ukachukwu
 * @returns {Customer.model} 200 - Return a Object of Customer with auth credencials
 * @returns {error.model}  400 - Return a error object { "code": "USR_02", "message": "The field example is empty.","field": "example","status": "500"}
 */
router.post(
  '/users',
  [check('email').isEmail(),
    check('password')
      .not()
      .isEmpty(),
    check('mob_phone')
      .not()
      .isEmpty(),
    check('name')
      .not()
      .isEmpty()],

  UserController.create
);

router.post(
  '/users/login',
  passport.authenticate('login'),
  [
    // Check validity
    check('email', 'Invalid email').isEmail(),
    check('password')
      .not()
      .isEmpty()
  ],
  UserController.login
);

router.post(
  '/users/crashreport',
  passport.authenticate('jwt'),
  [
    // Check validity
    check('location')
      .not()
      .isEmpty(),
    check('message')
      .not()
      .isEmpty()
  ],
  UserController.crashReport
);


router.post(
  '/users/crashreportanon',
  [
    // Check validity
    check('location')
      .not()
      .isEmpty(),
    check('message')
      .not()
      .isEmpty()
  ],
  UserController.crashReportAnon
);

router.post(
  '/users/contactus',
  [
    // Check validity
    check('email', 'Invalid email').isEmail(),
    check('message')
      .not()
      .isEmpty()
  ],
  UserController.contactUs
);

router.post(
  '/users/postMessage',
  passport.authenticate('jwt'),
  [
    check('message')
      .not()
      .isEmpty()
  ],
  UserController.postMessages
);

router.put(
  '/users/postMessage',
  passport.authenticate('jwt'),
  [
    check('message_id')
      .not()
      .isEmpty(),
    check('message')
      .not()
      .isEmpty()
  ],
  UserController.updateMessages
);

router.get('/user/message', passport.authenticate('jwt'), UserController.getUserMessages);
router.get('/user', passport.authenticate('jwt'), UserController.geUserProfile);

router.put(
  '/users',
  passport.authenticate('jwt'),
  [check('email').isEmail(),
    check('password')
      .not()
      .isEmpty(),
    check('mob_phone')
      .not()
      .isEmpty(),
    check('name')
      .not()
      .isEmpty(),
    check('address')
      .not()
      .isEmpty()],

  UserController.updateUser
);
export default router;
