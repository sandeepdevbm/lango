import { Router } from "express";
import {userSignup,userLogin} from "../controllers/authController.js"

const router = Router()

// USER SIGNUP
router.post("/signup",userSignup)
router.post("/login",userLogin)


export default router