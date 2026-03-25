import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Mongo connected succesfully!");
  } catch (error) {
    console.error("Mongo connection error: ", error);

    process.exit(1);
  }
};
