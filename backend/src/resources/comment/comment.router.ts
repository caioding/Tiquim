import { Router } from "express";
import commentController from "./comment.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/:campaignId", commentController.index);
router.post("/", isAuth, commentController.create);

export default router;
