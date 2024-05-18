class AppError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`[0] === "4" ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
