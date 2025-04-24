import mongoose from "mongoose";
import colors from 'colors'
import { exit } from 'node:process';


export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URL)
    const url = `${connection.host}:${connection.port}`
    console.log( colors.blue.bold(`MongoDB Connected in: ${url}`) )
  } catch (error) {
    console.log( colors.red.bold(`==ERROR== ${error.message}`) )
    exit(1)
  }
}