const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, transport } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(404, 'Not Found');
    }

    if (user.verify) {
        throw HttpError(400, 'Verification has already been passed');
    }

    const verifyEmail = {
    from: 'abra5cadabra@meta.ua',
    to: email,
    subject: 'Verify email',
    html: `<div>
              <a
                target="_blank"
                href="${BASE_URL}/api/users/verify/${user.verificationCode}"
                style="
                  box-sizing: border-box;
                  display: block;
                  width: 160px;
                  height: 50px;
                  padding: 12px;
                  margin: auto;
                  text-decoration: none;
                  background-color: #13AA52;
                  border: solid 1px #212121;
                  border-radius: 4px;
                  text-align: center;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  font-size: 18px;
                  color: #ffffff;"
              >
                Verify Email
              </a>
            </div>`,
    };
    
    await transport
    .sendMail(verifyEmail)
    .then(() => console.log('Email send success'))
    .catch(error => console.log(error.message));

    res.status(200).json({
        message: 'Verification email sent',
    });
};

module.exports = {
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};