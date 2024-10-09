import { Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import { AuthService } from "../services/AuthService";
import jwt from 'jsonwebtoken'
import { IAdmin } from "../interfaces/IAdmin";

const SECRET_KEY = process.env.JWT_SECRET || 'my_secret'

export const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const { first_name,last_name, email, password, user_type } = req.body;
  console.log(req.body)
  if (!first_name || !last_name || !email || !password || !user_type) {
    res.status(400).send({ error: "All fields are required" });
    return;
  }
  const adminService = AuthService.getInstance();
  const admin: IAdmin = await adminService.getAdmin(email, password);
 
});
