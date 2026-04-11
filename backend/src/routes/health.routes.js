import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/", (req, res) => {
  res.status(200).json({
    message: "Health route hit.",
  });
});

export default healthRoutes;
