import { Router } from "express";
import lifoRoutes from "./lifo.routes";
import keyvalueRoutes from "./keyvalue.routes";

const router = Router();

router.use("/v1/lifo", lifoRoutes);
router.use("/v1/keyvalue", keyvalueRoutes);

export default router;
