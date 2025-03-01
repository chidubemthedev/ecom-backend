import { db } from "@db/index.js";
import { orderItemsTable, ordersTable } from "@db/orders.schema.js";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized! Login to continue" });
    return;
  }
  const { order, items } = req.body;
  console.log(req.body);
  const userId = req.userId;

  try {
    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId: userId })
      .returning();

    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({
      message: "Order created successfully!",
      ...newOrder,
      items: newOrderItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid order data!", error: error });
  }
};
