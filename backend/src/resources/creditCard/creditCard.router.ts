import { Router } from "express";
import creditCardController from "./creditCard.controller";

const router = Router();

router.post("/", creditCardController.create);
router.get("/", creditCardController.read);
router.put("/:id", creditCardController.update);
router.delete("/:id", creditCardController.remove);

export default router;
