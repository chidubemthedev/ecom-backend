import express, { json, urlencoded } from "express";
import router from "./routes/products";

const port = 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.use("/products", router);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
