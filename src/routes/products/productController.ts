import { Request, Response } from "express";

export const getProducts = (req: Request, res: Response) => {
  res.send("Products");
};

export const getProductById = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(`Products by id: ${id}`);
};

export const createProduct = (req: Request, res: Response) => {
  res.send("Add new Product");
};

export const updateProduct = (req: Request, res: Response) => {
  res.send("update Product");
};

export const deleteProduct = (req: Request, res: Response) => {
  res.send("delete Product");
};
