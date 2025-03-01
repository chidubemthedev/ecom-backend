import { Router } from "express";
import { login, register } from "./authController.js";
import { validateData } from "@src/middlewares/validationMiddleware.js";
import { createUserSchema, loginUserSchema } from "@db/users.schema.js";

const router = Router();

router.post("/register", validateData({ body: createUserSchema }), register);

router.post("/login", validateData({ body: loginUserSchema }), login);

export const authRoutes = router;
