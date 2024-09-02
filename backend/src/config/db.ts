import mongoose from 'mongoose'
import { env } from './envConfig'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI!)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to mongo: ${error}`)
  }
}

export default connectDB
