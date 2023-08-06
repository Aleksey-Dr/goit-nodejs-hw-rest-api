const express = require('express');

const { changeSubscription, current, login, logout, register } = require('../../controllers/auth');

const { authenticate, validateBody } = require('../../middlewares');
const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post('/register', validateBody(schemas.registerSchema), register);
// signin
router.post('/login', validateBody(schemas.loginSchema), login);
// current
router.get('/current', authenticate, current);
// logout
router.post('/logout', authenticate, logout);
// change subscription
router.patch('/:userId/subscription', authenticate, validateBody(schemas.changeSubscriptionSchema), changeSubscription);

module.exports = router;