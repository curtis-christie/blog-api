export function sendSuccess(res, statusCode, data, message = null) {
  return res.status(statusCode).json({
    success: true,
    ...(message && { message }),
    data,
  });
}
