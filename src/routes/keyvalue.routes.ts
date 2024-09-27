// src/routes/user.routes.ts
import { Router } from "express";
import KeyValueController from "../controllers/keyvalue.controller";

const router = Router();

router.post("/add", KeyValueController.add);
router.get("/get", KeyValueController.get);
router.delete("/delete", KeyValueController.delete);

export default router;
