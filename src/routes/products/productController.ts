import { Request, Response } from "express";
import { db } from "@db/index";
import { productsTable } from "@db/products.schema";
import { eq } from "drizzle-orm";

interface CreateProductRequest {
  name: string;
  description: string;
  image: string;
  price: number;
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, image, price }: CreateProductRequest = req.body;

  if (!name || !description || !image || typeof price !== "number") {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const [product] = await db
      .insert(productsTable)
      .values({
        name,
        description,
        image,
        price,
      })
      .returning();

    res.status(201).json(product);
  } catch (error: any) {
    // Check if it's a PostgreSQL error
    if (error?.code) {
      switch (error.code) {
        case "23505": // Unique constraint violation
          return res.status(409).json({ error: "Product already exists" });
        case "23502": // NOT NULL violation
          return res.status(400).json({ error: "Missing required fields" });
        case "22P02": // Invalid text representation (e.g., incorrect data type)
          return res.status(400).json({ error: "Invalid data format" });
        default:
          return res
            .status(500)
            .json({ error: "Database error", details: error.detail });
      }
    }
    // Generic error response
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    await db.select().from(productsTable).execute();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await db.select().from(productsTable).execute();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
