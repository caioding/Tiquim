import { Router } from "express";
import languageRouter from "../resources/language/language.router";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";
import campaignRouter from "../resources/campaign/campaign.router"
import paymentMethodRouter from "../resources/paymentMethod/paymentMethod.router"

const router = Router();

router.use("/language",
languageRouter);

router.use("/user", // #swagger.tags = ['User']
userRouter);

router.use("/auth", // #swagger.tags = ['Auth']
authRouter);

router.use("/campaign", // #swagger.tags = ['Campaign']
campaignRouter);

router.use("/paymentMethod", // #swagger.tags = ['PaymentMethod'])
paymentMethodRouter);

export default router;