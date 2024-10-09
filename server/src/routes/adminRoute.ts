import { Router } from "express";
import { adminLogin } from "../controllers/AdminController";


const router = Router()


router.post('/login', adminLogin)


export default router