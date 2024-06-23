import { Router } from "express";
import languageRouter from "../resources/language/language.router";
import usuarioRouter from "../resources/usuario/usuario.router";
import authRouter from "../resources/auth/auth.router";

const router = Router();

router.use("/language", // #swagger.tags = ['Language']
languageRouter);
router.use("/usuario", // #swagger.tags = ['Usuario']
usuarioRouter);
router.use("/auth", // #swagger.tags = ['Auth']
authRouter);

export default router;
