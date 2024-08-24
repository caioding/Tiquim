//v1Router.ts
import { Router } from "express";
import languageRouter from "../resources/language/language.router";
import userRouter from "../resources/user/user.router";
import authRouter from "../resources/auth/auth.router";
import campaignRouter from "../resources/campaign/campaign.router"
import paymentMethodRouter from "../resources/paymentMethod/paymentMethod.router"
import contributionRouter from "../resources/contribution/contribution.router"
import rewardRouter from "../resources/reward/reward.router"
import commentRouter from "../resources/comment/comment.router"
import addressRouter from "../resources/address/address.router"

const router = Router();

router.use("/language",
languageRouter);

router.use("/user", // #swagger.tags = ['User']
userRouter);

router.use("/auth", // #swagger.tags = ['Auth']
authRouter);

router.use("/campaign", // #swagger.tags = ['Campaign']
campaignRouter);

router.use("/paymentMethod", // #swagger.tags = ['PaymentMethod']
paymentMethodRouter);

router.use("/contribution", // #swagger.tags = ['Contributions']
contributionRouter);

router.use("/reward", // #swagger.tags = ['Reward']
rewardRouter);

router.use("/comment", // #swagger.tags = ['Comment']
commentRouter);
    
router.use("/address", // #swagger.tage = ['Address']
addressRouter);

export default router;