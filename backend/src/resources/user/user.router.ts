import { Router } from "express";
import user_controller from "./user.controller";
import { is_admin } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", user_controller.index);
router.post("/", user_controller.create);
router.get("/:id", user_controller.read);
router.put("/:id", is_admin, user_controller.update);
router.delete("/:id", is_admin, user_controller.remove);

export default router;
