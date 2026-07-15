export class ApiError extends Error {
  constructor(status, message, code = 'ERROR', details = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }

  static badRequest(message, details) {
    return new ApiError(400, message, 'BAD_REQUEST', details);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message, 'NOT_FOUND');
  }

  static conflict(message) {
    return new ApiError(409, message, 'CONFLICT');
  }

  static unauthorized(message = 'Authentication required') {
    return new ApiError(401, message, 'UNAUTHORIZED');
  }

  static forbidden(message = 'You do not have permission to perform this action') {
    return new ApiError(403, message, 'FORBIDDEN');
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message, 'INTERNAL_ERROR');
  }
}
