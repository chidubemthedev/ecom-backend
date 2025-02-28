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
    //remove password from response
    const userData = { ...user, password: undefined };
    res.status(201).json({ message: "User registered!", user: userData });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user) {
    res.status(401).json({ error: "Authentication failed!" });
    return;
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    res.status(401).json({ error: "Authentication failed!" });
    return;
  }

  //   const token = jwt.sign({ email: user.email }, "secret", {
  //     expiresIn: "1h",
  //   });

  //   res.status(200).json({ message: "Login successful!", token, user });

  res.sendStatus(200);
};
