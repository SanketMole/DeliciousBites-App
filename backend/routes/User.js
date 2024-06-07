import express from "express";
import zod, { Schema } from "zod";
import { User } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import authMiddleware from "../authMiddleware.js";

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
      msg: "Successfully created ",
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//................................................................................................................................................

const signinSchema = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});
UserRouter.post("/signin", async (req, res) => {
  const validation = signinSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      msg: "Invalid input",
      errors: validation.error.issues,
    });
  }

  const { userName, password } = req.body;

  const user = await User.findOne({
    userName,
    password,
  });

  if (user) {
    const token = jwt.sign(
      {
        UserId: user._id,
      },
      JWT_SECRET
    );
    return res.json({
      msg: "Here is your token",
      token,
    });
  } else {
    res.json({
      msg: "User Not Lo in",
    });
  }
});

//...............................................................................................................................

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

UserRouter.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.UserId }, req.body);
  console.log(req.UserId);

  res.json({
    message: "Updated successfully",
  });
});

export default UserRouter;
