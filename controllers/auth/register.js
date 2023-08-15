const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require("../../models/user");
const { HttpError, ctrlWrapper, transport } = require("../../helpers");

const { BASE_URL } = process.env;

const verificationCode = nanoid();

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });

  const verifyEmail = {
    from: 'abra5cadabra@meta.ua',
    to: email,
    subject: 'Verify email',
    html: `<div>
              <a
                target="_blank"
                href="${BASE_URL}/api/users/verify/${verificationCode}"
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

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
    });
};

module.exports = {
  register: ctrlWrapper(register),
};