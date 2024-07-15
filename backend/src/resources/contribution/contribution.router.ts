import { Router } from "express";
import contributionController from "./contribution.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", isAuth, contributionController.index);
router.post("/", isAuth, contributionController.create);
router.get("/:id", isAuth, contributionController.read);

export default router;
