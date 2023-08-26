import mongoose from "mongoose";

//mongoconnection
export const mongoDBConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB database is connected`.bgYellow.gray);
  } catch (error) {
    console.log(error);
  }
};
