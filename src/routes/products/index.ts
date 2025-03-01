import {
  createProductSchema,
  paramsProductSchema,
  updateProductSchema,
} from "@db/products.schema.js";
import { validateData } from "@src/middlewares/validationMiddleware.js";
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./productController.js";
import { verifySeller, verifyToken } from "@src/middlewares/authMiddleware.js";

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
  verifyToken,
  verifySeller,
  validateData({ body: updateProductSchema, params: paramsProductSchema }),
  updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  verifySeller,
  validateData({ params: paramsProductSchema }),
  deleteProduct
);

export const productRoutes = router;
