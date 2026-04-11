import { Router } from "express";
import healthRoutes from "./health.routes.js";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/health", healthRoutes);
router.use("/posts", postsRouter);

export default router;
