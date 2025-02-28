import {
  createProductSchema,
  paramsProductSchema,
  updateProductSchema,
} from "@db/products.schema";
import { validateData } from "@src/middlewares/validationMiddleware";
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./productController";
import { verifySeller, verifyToken } from "@src/middlewares/authMiddleware";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  validateData({ params: paramsProductSchema }),
  getProductById
);

router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData({ body: createProductSchema }),
  createProduct
);

router.put(
  "/:id",
  validateData({ body: updateProductSchema, params: paramsProductSchema }),
  updateProduct
);

router.delete(
  "/:id",
  validateData({ params: paramsProductSchema }),
  deleteProduct
);

export default router;
