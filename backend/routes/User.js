import express from "express";
import zod from "zod";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const UserRouter = express.Router();
console.log("fjfnkj");
const signupSchema = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

UserRouter.post("/signup", async (req, res) => {
  try {
    const validation = signupSchema.safeParse(req.body);
    console.log(validation);

    if (!validation.success) {
      return res.status(400).json({
        msg: "Invalid input",
        errors: validation.error.issues,
      });
    }

    const { userName, firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.json({
        msg: "User Already Exists",
      });
    }

    const UserSignup = await User.create({
      userName,
      firstName,
      lastName,
      password,
    });

    const UserId = UserSignup._id;
    console.log(UserId);

    const token = jwt.sign(
      {
        UserId,
      },
      JWT_SECRET
    );

    res.json({
      msg: UserSignup,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

console.log("dfndkj");

export default UserRouter;
