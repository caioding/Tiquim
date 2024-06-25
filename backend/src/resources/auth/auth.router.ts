import { Router } from "express";
import auth_controller from "./auth.controller";
import { is_auth } from "../../middlewares/isAdmin";

const router = Router();

router.post("/signup", auth_controller.signup);
router.post("/login", auth_controller.login);
router.post("/logout", is_auth, auth_controller.logout);

export default router;
