import { insertOrderWithItemsSchema } from "@db/orders.schema.js";
import { verifyToken } from "@src/middlewares/authMiddleware.js";
import { validateData } from "@src/middlewares/validationMiddleware.js";
import { Router } from "express";
import { createOrder, getAllOrders } from "./orderController.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData({ body: insertOrderWithItemsSchema }),
  createOrder
);

router.get("/", verifyToken, getAllOrders);

export const orderRoutes = router;
