import express from "express";
import zod, { Schema } from "zod";
import { User } from "../models/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controllers/config.js";
import authMiddleware from "../controllers/authMiddleware.js";

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
      UserId,
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

  try {
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

      // Extracting firstName and lastName from the user object
      const { firstName, lastName } = user;

      return res.json({
        msg: "Here is your token",
        token,
        firstName,
        lastName,
        UserId: user._id,
      });
    } else {
      res.json({
        msg: "User Not Logged in",
      });
    }
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ msg: "Internal server error" });
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

UserRouter.get("/user-info", authMiddleware, async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];
    // Verify and decode the token to get the user ID
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.UserId;

    // Retrieve the user details from the database
    const user = await User.findById(userId, {
      userName: 1,
      firstName: 1,
      lastName: 1,
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Return the user info
    res.json({
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default UserRouter;
