import { Router } from "express";
import language_controller from "./language.controller";
import validate_body from "../../middlewares/validateBody";
import { languageSchema } from "./language.schemas";

const router = Router();
router.post("/", validate_body(languageSchema), language_controller.change_language);

export default router;
