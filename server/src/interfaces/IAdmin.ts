import { Document, ObjectId } from "mongoose";

export interface IAdmin extends Document {
  _id: ObjectId
  first_name: string
  last_name: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}