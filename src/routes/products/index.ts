import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res.send("Products");
});

router.post("/", (req, res, next) => {
  res.send("New Products");
});

export default router;
