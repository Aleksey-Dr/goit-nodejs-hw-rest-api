const { changeSubscription } = require('./changeSubscription');
const { current } = require('./current');
const { login } = require('./login');
const { logout } = require('./logout');
const { register } = require('./register');
const { resendVerifyEmail } = require('./resendVerifyEmail');
const { updateAvatar } = require('./updateAvatar');
const { verifyEmail } = require('./verifyEmail');

module.exports = {
    changeSubscription,
    current,
    login,
    logout,
    register,
    resendVerifyEmail,
    updateAvatar,
    verifyEmail,
};