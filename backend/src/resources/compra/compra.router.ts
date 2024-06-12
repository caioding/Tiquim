import { Router } from "express";
import compraController from "./compra.controller";
import { isAuth } from "../../middlewares/isAdmin";

const router = Router();

router.get("/", isAuth, compraController.index);
router.post("/finish/", isAuth, compraController.finish);
router.post("/:produtoID", isAuth, compraController.create);
router.get("/:compraID", isAuth, compraController.read);
router.put("/:compraID", isAuth, compraController.update);
router.delete("/:compraID", isAuth, compraController.remove);

export default router;
