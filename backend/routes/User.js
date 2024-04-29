import { Router } from "react";
import zod from "zod";
import jsonwebtoken from "jsonwebtoken";

const signupbody = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupbody.safeParse(req.body);

  if (!success) {
    return res.json({
      msg: "No Inputs Provided",
    });
  }


  const existingUser = await 
});
