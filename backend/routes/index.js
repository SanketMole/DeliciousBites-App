import express from "express";

const userRouter = Router();
const router = router();

router.use("/user", userRouter);

export { userRouter };
