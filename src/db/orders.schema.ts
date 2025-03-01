import {
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { usersTable } from "./users.schema.js";
import { productsTable } from "./products.schema.js";
import { z } from "zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 255 }).notNull().default("new"),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const createOrderSchema = createInsertSchema(ordersTable).omit({
  userId: true,
  status: true,
  createdAt: true,
});

export const updateOrderSchema = createUpdateSchema(ordersTable);

export const createOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  orderId: true,
});

export const insertOrderWithItemsSchema = z.object({
  order: createOrderSchema,
  items: z.array(createOrderItemSchema),
});
