import { Router } from "express";
import { addMessage, getMessage } from "../controllers/messageController.js";
const router = Router()

router.post("/",addMessage)
router.get("/:chatId",getMessage)

export default router
