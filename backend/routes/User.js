import express from "express";
import zod from "zod";

const UserRouter = express.Router();

const signupSchema = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

UserRouter.post("/signupcc", (req, res) => {
  try {
    const validation = signupSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        msg: "Invalid input",
        errors: validation.error.issues,
      });
    }

    console.log("Validation successful", validation.data);
    res.json({ msg: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default UserRouter;
