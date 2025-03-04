import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../..";
import jwt from "jsonwebtoken";

const generateToken = (userEmail: string) => {
  return jwt.sign({ email: userEmail }, process.env.TOKEN_SECRET ?? "", {
    expiresIn: "24h",
  });
};

export const getUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.send({
    users,
  });
};

export const addNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, username, firstName, lastName } = req.body;
    console.log(req.body);
    if (!email || !password || !username) {
      res
        .status(400)
        .json({ message: "Email, username, and password are required" });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    console.log(email, password, username, hashedPassword);
    const existingUser = await prisma.user.findUnique({ where: { email } });
    console.log(existingUser);
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }
    if (existingUsername) {
      res.status(400).json({ message: "Username is already in use" });
      return;
    }

    const token = generateToken(email);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      user: {
        ...userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({
      message: "Email and password are required",
    });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(400).send({
      message: "Invalid email or password",
    });
    return;
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res.status(400).send({
      message: "Invalid email or password",
    });
    return;
  }

  const token = generateToken(email);

  const { password: _, ...userWithoutPassword } = user;
  res.send({
    user: {
      ...userWithoutPassword,
      token,
    },
  });
};

export const getUser = async (_: Request, res: Response) => {
  const email = res.locals.email;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(404).send({
      message: "User not found",
    });
    return;
  }
  const userDetails = await prisma.user.findUnique({
    where: { email },
  });

  if (!userDetails) {
    res.status(404).send({
      message: "User details not found",
    });
    return;
  }

  const { password: hashedPassword, ...userWithoutPassword } = userDetails;
  res.send({
    user: userWithoutPassword,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const email = res.locals.email;
  const { firstName, lastName } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(404).send({
      message: "User not found",
    });
    return;
  }
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
    },
  });
  res.send({
    user: updatedUser,
  });
};
