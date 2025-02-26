import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db } from "@db/index";
import { usersTable } from "@db/users.schema";
import { eq } from "drizzle-orm";

export const register = async (req: Request, res: Response) => {
  const data = req.body;
  data.password = bcrypt.hashSync(data.password, 12);

  try {
    const emailFinder = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email));

    if (emailFinder.length) {
      res.status(409).json({ error: "Email already exists!" });
      return;
    }

    const [user] = await db.insert(usersTable).values(data).returning();
    res.status(201).json({ message: "User registered!", user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const login = (req: Request, res: Response) => {
  res.sendStatus(200);
};
