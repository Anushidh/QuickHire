import mongoose, { Schema, Document } from "mongoose";
import { IAdmin } from "../interfaces/IAdmin";

const adminSchema: Schema<IAdmin> = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;
