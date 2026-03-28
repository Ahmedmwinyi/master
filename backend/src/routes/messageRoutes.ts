import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import { getMessages } from "../controller/messageContoller";

const router = Router();

router.get("/chat/:chatId", protectedRoute, getMessages);

export default router;