import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + Math.round(Math.random() * 1000) + "-" + file.fieldname
    );
  },
});
export const brandLogo = multer({ storage }).single("logo");
export const catagoryPhoto = multer({ storage }).single("catPhoto");
export const productPhoto = multer({ storage }).array("productPhoto");
