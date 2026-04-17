import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "./prismaClient.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    // 4. Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
