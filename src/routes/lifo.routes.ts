import { Router } from "express";
import LifoController from "../controllers/lifo.controller";

const router = Router();

router.post("/add", LifoController.add);
router.get("/get", LifoController.get);

export default router;
