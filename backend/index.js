import express from "./";
import mainRouter from "./routes/index.js";
const app = express();
app.use("/api/v1", mainRouter);
app.use(cors());
