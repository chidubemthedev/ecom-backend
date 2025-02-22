import { createProductSchema } from "@db/products.schema";
import { validateData } from "@src/middlewares/validationMiddleware";
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./productController";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", validateData(createProductSchema), createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
