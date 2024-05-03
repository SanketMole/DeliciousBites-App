import express from "express";
import cors from "cors";
import { router } from "../backend/routes/index.js";
import dotenv from "dotenv";
import UserRouter from "./routes/User.js";

dotenv.config({ path: "../.env" });
console.log("fh");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", UserRouter);

console.log("fhrrrrrrrrrrr");

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
