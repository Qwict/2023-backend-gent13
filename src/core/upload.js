// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('@koa/multer');

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(null, Error('only image is allowed'));
  }
};

const maxSize = 5 * 1000 * 1000;
const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
  limits: {
    fileSize: maxSize,
  },
});

module.exports = upload;