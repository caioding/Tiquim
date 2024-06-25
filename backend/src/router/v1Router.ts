import { Router } from "express";
import languageRouter from "../resources/language/language.router";
import user_router from "../resources/user/user.router";
import auth_router from "../resources/auth/auth.router";

const router = Router();

router.use("/language", // #swagger.tags = ['Language']
languageRouter);
router.use("/user", // #swagger.tags = ['Usuario']
user_router);
router.use("/auth", // #swagger.tags = ['Auth']
auth_router);

export default router;
