import express from "express";
import cors from "cors";
import { router } from "../backend/routes/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Process is running on ${process.env.PORT}`);
});
