const express = require('express');

const { changeSubscription, current, login, logout, register, resendVerifyEmail, updateAvatar, verifyEmail } = require('../../controllers/auth');

const { authenticate, validateBody, upload } = require('../../middlewares');
const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post('/register', validateBody(schemas.registerSchema), register);
// verify
router.get('/verify/:verificationCode', verifyEmail);
// replay verify
router.post('/verify', validateBody(schemas.emailSchema), resendVerifyEmail);
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