import { Router } from "express";
import { login, register } from "./authController";
import { validateData } from "@src/middlewares/validationMiddleware";
import { createUserSchema, loginUserSchema } from "@db/users.schema";

const router = Router();

router.post("/register", validateData({ body: createUserSchema }), register);

router.post("/login", validateData({ body: loginUserSchema }), login);

export default router;
