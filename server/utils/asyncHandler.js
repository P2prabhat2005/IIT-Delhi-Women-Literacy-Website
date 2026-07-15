/**
 * Wraps an async Express handler so rejected promises are forwarded to the
 * centralized error middleware instead of crashing the process.
 */
export function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
