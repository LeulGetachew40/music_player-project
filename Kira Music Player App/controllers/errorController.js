function sendErrorDevelopment(err, response) {
  return response.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
}
function sendErrorProduction(err, response) {
  if (err.isOperational) {
    return response.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return response.status(500).json({
      status: "fail",
      message: "Something went very wrong",
    });
  }
}

function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    sendErrorDevelopment(err, res);
  } else if (process.env.ENVIRONMENT === "PRODUCTION") {
    sendErrorProduction(err, res);
  }
}

module.exports = globalErrorHandler;
