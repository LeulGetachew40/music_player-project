function catchAsync(cbFunction) {
  return function (request, response, next) {
    cbFunction(request, response, next).catch((err) => next(err));
  };
}
module.exports = catchAsync;
