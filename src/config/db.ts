import mongoose from "mongoose";
import colors from 'colors'
import { exit } from 'node:process';


export const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      throw new Error("Database URL (DB_URL) is not defined in environment variables");
    }
    const { connection } = await mongoose.connect(process.env.DB_URL);
    const url = `${connection.host}:${connection.port}`
    console.log( colors.blue.bold(`MongoDB Connected in: ${url}`) )
  } catch (error) {
    if (error instanceof Error) {
      console.log( colors.red.bold(`==ERROR== ${error.message}`) );
    } else {
      console.log( colors.red.bold(`==ERROR== An unknown error occurred`) );
    }
    exit(1)
  }
}