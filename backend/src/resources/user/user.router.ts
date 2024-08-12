import { Router } from "express";
import userController from "./user.controller";
import { isAdmin, isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", userController.index);
router.post("/", userController.create);
router.get("/:id", userController.read);
router.put("/:id", isAuth, userController.update);
router.delete("/:id", isAdmin, userController.remove);

export default router;
