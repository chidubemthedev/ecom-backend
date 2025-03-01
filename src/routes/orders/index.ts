import { insertOrderWithItemsSchema } from "@db/orders.schema.js";
import { verifyToken } from "@src/middlewares/authMiddleware.js";
import { validateData } from "@src/middlewares/validationMiddleware.js";
import { Router } from "express";
import { createOrder } from "./orderController";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData({ body: insertOrderWithItemsSchema }),
  createOrder
);

export const orderRoutes = router;
