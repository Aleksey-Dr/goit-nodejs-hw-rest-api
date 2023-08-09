const Jimp = require('jimp');

const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const path = require('path');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    const avatarURL = path.join('avatars', filename);

    Jimp.read(tempUpload, (error, avatar) => {
        if (error) throw error;
        avatar.resize(250, 250).write(resultUpload);
    });
    
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};