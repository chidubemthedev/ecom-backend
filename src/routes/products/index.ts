import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./productController";
import { validateData } from "@src/middlewares/validationMiddleware";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { productsTable } from "@db/products.schema";

// export const createProductSchema = z.object({
//   name: z.string(),
//   description: z.string().optional(),
//   image: z.string().optional(),
//   price: z.number(),
// });

const createProductSchema = createInsertSchema(productsTable);

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", validateData(createProductSchema), createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
