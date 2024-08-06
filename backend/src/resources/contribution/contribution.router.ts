import { Router } from "express";
import contributionController from "./contribution.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", contributionController.index);
router.get("/:campaignId", contributionController.readPercentage);
router.get("/supporters/:campaignId", contributionController.readTotalSupporters);
router.post("/", isAuth, contributionController.create);
router.get("/:id", isAuth, contributionController.read);

export default router;
