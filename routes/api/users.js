const express = require('express');

const { changeSubscription, current, login, logout, register, updateAvatar } = require('../../controllers/auth');

const { authenticate, validateBody, upload } = require('../../middlewares');
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

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;