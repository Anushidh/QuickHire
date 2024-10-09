import { Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import { AdminService } from "../services/AdminService";
import jwt from 'jsonwebtoken'
import { IAdmin } from "../interfaces/IAdmin";


const SECRET_KEY = process.env.JWT_SECRET || 'my_secret'

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password) {
    res.status(400).send({ error: "Email and password are required" });
    return;
  }
  const adminService = AdminService.getInstance();
  const admin: IAdmin = await adminService.getAdmin(email, password);
  const token = jwt.sign({
    id: admin._id.toString(), email: admin.email, first_name: admin.first_name,
    last_name: admin.last_name
  }, SECRET_KEY, { expiresIn: '1h' })
  console.log("Generated token:", token)

  const { password: _, ...adminWithoutPassword } = admin;
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use secure in production
    sameSite: 'lax', // This is more permissive than 'strict'
    maxAge: 3600000 // 1 hour in milliseconds
  });

  console.log("Response headers:", res.getHeaders());
  res.status(200).json({ admin: adminWithoutPassword });

  console.log("Cookie set:", res.getHeader('Set-Cookie'));
});

