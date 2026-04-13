import { Router } from "express";
import { protectedRoute } from "../middleware/auth";
import { getChats, getOrCreateChat } from "../controller/chatController";

const router = Router();

router.use(protectedRoute);

router.get("/", getChats);
router.post("/with/:participantId", getOrCreateChat);

export default router;