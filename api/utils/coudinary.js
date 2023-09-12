import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "dcli0sqrt",
  api_key: "889969636973233",
  api_secret: "-t-XcAw5uuAyCdq7O8TlYm1ApEM",
});

//upload logo
export const cloudUpload = async (req) => {
  const logo = await cloudinary.v2.uploader.upload(req.file.path);
  return logo;
};

//delete logo
export const cloudDelete = async (publicId) => {
  const logo = await cloudinary.v2.uploader.destroy(publicId);
};
