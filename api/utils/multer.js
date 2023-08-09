import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
  destination: (req, file, cb) => {
    cb(null, "public");
  },
});

//middleware
export const userPhotoMulter = multer({ storage }).array("users", 10);

export default storage;
