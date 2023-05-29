import { Router } from "express";
import {userSignup,userLogin} from "../controllers/authController.js"
import {languages, getMentorDetails, getLangDetails} from '../controllers/projectController.js'
import requireAuth from '../middleware/authMiddleware.js'
import {multerSetup} from '../multer/multer.js'
const {upload} = multerSetup()
const router = Router()

// USER SIGNUP
router.get("/languages",languages)
router.post("/signup",upload.single('profilePicture'),userSignup)
// router.get("/login",userSign)
router.post("/login",userLogin)
router.get('/mentordetails/:value',getMentorDetails)
router.get('/languagedetails/:data',getLangDetails)


export default router