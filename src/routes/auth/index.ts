import { Router } from "express";
import { login, register } from "./authController";
import { validateData } from "@src/middlewares/validationMiddleware";
import { createUserSchema } from "@db/users.schema";

const router = Router();

router.post("/register", validateData({ body: createUserSchema }), register);

router.post("/login", login);

export default router;
