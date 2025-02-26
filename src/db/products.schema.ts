import {
  doublePrecision,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

export type Product = typeof productsTable.$inferSelect;

export const createProductSchema = createInsertSchema(productsTable);
export const updateProductSchema = createUpdateSchema(productsTable);
export const paramsProductSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a numeric string")
    .transform(Number),
});
