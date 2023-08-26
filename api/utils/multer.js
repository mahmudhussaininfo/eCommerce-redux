import multer from "multer";

const storage = multer.memoryStorage();
const brandLogo = multer({ storage }).single("logo");

export default brandLogo;
