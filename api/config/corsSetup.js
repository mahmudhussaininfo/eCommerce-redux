// allowed origin
const allowedOrigins = ["http://localhost:9090/"];

// cors options
export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  credential: true,
  optionsSuccessStatus: 200,
};
