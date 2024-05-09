const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


const upload = multer({ storage: storage });
const uploadImage = upload.single('image');
const passImageString = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }
  next();
};
module.exports = { uploadImage, passImageString };