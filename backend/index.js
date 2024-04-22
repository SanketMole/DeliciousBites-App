import express from "express";
import cors from "cors";
import { userRouter } from "../backend/routes/index.js";

const mainRouter = express.Router();
mainRouter.use("/user", userRouter);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
