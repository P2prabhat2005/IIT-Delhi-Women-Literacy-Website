import multer from 'multer';
import { ApiError } from '../utils/errors.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: `No route matches ${req.method} ${req.originalUrl}` },
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const code = err.code === 'LIMIT_FILE_SIZE' ? 'FILE_TOO_LARGE' : 'UPLOAD_ERROR';
    return res.status(400).json({ success: false, error: { code, message: err.message } });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      error: { code: err.code, message: err.message, details: err.details || undefined },
    });
  }

  console.error('Unhandled server error:', err);
  return res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong on the server.' },
  });
}
