import { Router } from "express";
import languageRouter from "../resources/language/language.router";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";

const router = Router();

router.use("/language", // #swagger.tags = ['Language']
languageRouter);

router.use("/user", // #swagger.tags = ['Usuario']
userRouter);

router.use("/auth", // #swagger.tags = ['Auth']
authRouter);

export default router;