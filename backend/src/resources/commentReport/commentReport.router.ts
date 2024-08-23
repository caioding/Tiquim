import { Router } from "express";
import commentReportController from "./commentReport.controller";
import { isAdmin, isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/:campaignId", isAdmin, commentReportController.index);
router.post("/", isAuth, commentReportController.create);
router.delete("/one/:commentReportId", isAdmin, commentReportController.remove);
router.delete("/all/:commentId", isAdmin, commentReportController.removeAll);

export default router;
