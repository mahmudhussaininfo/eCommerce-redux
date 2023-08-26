import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { mongoDBConnect } from "./config/db.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoute from "./routes/UserRoutes.js";
import roleRoute from "./routes/RoleRoute.js";
import tagRoute from "./routes/TagRoute.js";
import permissionRoute from "./routes/Permission.js";
import authRoute from "./routes/AuthRoute.js";
import catagoryRoute from "./routes/CatagoryRoute.js";
import brandRoute from "./routes/BrandRoute.js";

dotenv.config();

//initial
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//enviroment vars
const PORT = process.env.PORT || 9090;

//static folder
app.use(express.static("public"));

//routing
app.use("/api/v1/mamu", userRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/permission", permissionRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/catagory", catagoryRoute);
app.use("/api/v1/brand", brandRoute);

//error handler
app.use(errorHandler);

//listen
app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`server is running on ${PORT}`.bgCyan.green);
});
