import { Router } from "express";
import campaignController from "./campaign.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", campaignController.index);
router.post("/", isAuth, campaignController.create);
router.get("/:id", campaignController.read);
router.put("/:id", isAuth, campaignController.update);
router.delete("/:id", isAuth, campaignController.remove);

export default router;
