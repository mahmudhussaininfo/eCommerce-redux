import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 1000) + "-" + file.fieldname
    );
  },
});
const brandLogo = multer({ storage }).single("logo");

export default brandLogo;
