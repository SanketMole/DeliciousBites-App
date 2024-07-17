import { Router } from "express";

const router = Router();

router.get("/signupcc", (req, res) => {
  res.json({
    msg: "User endpoints",
  });
});

export { router };
