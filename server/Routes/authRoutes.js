import { Router } from "express";
import {userSignup,userLogin} from "../controllers/authController.js"
import {languages, getMentorDetails, getLangDetails , uploadDetails,getMentorsToVerify,
getAMentor, approveMentor , rejectMentor} from '../controllers/projectController.js'
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
router.post('/upload-details',upload.array('pdfFiles', 10), uploadDetails)
router.get('/verify-mentors',getMentorsToVerify)
router.get('/mentor-profile/:mentorId',getAMentor)
router.post('/apporve-mentors',approveMentor)
router.post('/reject-mentors',rejectMentor)








export default router