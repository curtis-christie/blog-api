import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Up and running." });
});
app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

export default app;
