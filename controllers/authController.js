import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";
import dotenv from "dotenv"

export const signup = async (req, res) => {
    console.log("Signup");
  try {
    const { company_name, registration_number, Password, business_type } = req.body;

    console.log("prisma models:", prisma);
    console.log("company model:", prisma.company);

    const existingUser = await prisma.company.findUnique({
      where: { registration_number }
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await prisma.company.create({
      data: {
        registration_number,
        Password: hashedPassword,
        company_name,
        business_type
      }
    });

    res.status(201).json(user);

  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { registration_number, Password } = req.body;

    const user = await prisma.company.findUnique({
      where: { registration_number }
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { company_id: user.company_id, registration_number: user.registration_number },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        company_id: user.company_id,
        company_name: user.company_name,
        registration_number: user.registration_number
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};