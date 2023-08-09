const multer = require('multer');
const multerConfig = require('./multerConfig');

const upload = multer({
    storage: multerConfig,
});

module.exports = upload;