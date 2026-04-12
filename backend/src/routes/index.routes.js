import { Router } from "express";
import healthRoutes from "./health.routes.js";
import postsRouter from "./posts.routes.js";
import authRouter from "./auth.routes.js";
import commentRouter from "./comments.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/health", healthRoutes);
router.use("/posts", postsRouter);
router.use("/comments", commentRouter);

export default router;
