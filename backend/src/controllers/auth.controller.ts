import type { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { generateOtp } from "../utils/generateOtp.js";
import { generateToken } from "../utils/generateToken.js";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env['EMAIL_USER'],
    pass: process.env['EMAIL_PASS'],
  },
});

export const requestOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.oTP.create({
      data: { email, code: hashedOtp, expiresAt },
    });

    await transporter.sendMail({
      from: process.env['EMAIL_USER'],
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
      console.error("OTP Error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, name, dob } = req.body;

    const record = await prisma.oTP.findFirst({
      where: { email },
      orderBy: { expiresAt: "desc" },
    });

    if (!record) {
      res.status(400).json({ error: "No OTP found" });
      return;
    }
    if (record.expiresAt < new Date()) {
      res.status(400).json({ error: "OTP expired" });
      return;
    }

    const isMatch = await bcrypt.compare(otp, record.code);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid OTP" });
      return;
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || "Anonymous",
          dob: dob ? new Date(dob) : null,
          authProvider: "email",
        },
      });
    }

    const token = generateToken(user.id);
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "OTP verification failed" });
  }
};
