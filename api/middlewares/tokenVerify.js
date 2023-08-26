import Jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const tokenVerify = (req, res, next) => {
  // const authHeader = req.headers.authorization || req.headers.Authorization;
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(404).json({
      message: "Unauthorized",
    });
  }

  //final verify token
  Jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(404).json({
          message: "invalid token",
        });
      }
      const me = await User.findOne({ email: decode.email })
        .select("-password")
        .populate("role");
      req.me = me;
      next();
    })
  );
};
