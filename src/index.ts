import express, { json, urlencoded } from "express";
import { authRoutes } from "./routes/auth/index.js";
import { productRoutes } from "./routes/products/index.js";

const port = 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
