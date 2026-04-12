import { verifyAccessToken } from "../utils/jwt.js";
import { AppError } from "../utils/appError.js";

export function requireAuth(req, res, next) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new AppError("Authentication Failed.", 401);
    }

    const payload = verifyAccessToken(token);

    req.user = payload;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", 401));
  }
}
