import multer from 'multer';
import { env } from '../config/env.js';
import { ApiError } from '../utils/errors.js';

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: env.isProduction ? 'Route not found' : `No route matches ${req.method} ${req.originalUrl}`,
    },
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'Origin is not allowed.' },
    });
  }

  if (err?.type === 'entity.too.large' || err?.status === 413) {
    return res.status(413).json({
      success: false,
      error: { code: 'PAYLOAD_TOO_LARGE', message: 'Request body is too large.' },
    });
  }

  if (err instanceof SyntaxError && err?.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: { code: 'BAD_REQUEST', message: 'Request body must be valid JSON.' },
    });
  }

  if (err instanceof multer.MulterError) {
    const code = err.code === 'LIMIT_FILE_SIZE' ? 'FILE_TOO_LARGE' : 'UPLOAD_ERROR';
    const message = code === 'FILE_TOO_LARGE' ? 'Uploaded file is too large.' : 'Uploaded file type is not allowed.';
    return res.status(400).json({ success: false, error: { code, message } });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      error: {
        code: err.code,
        message: err.status >= 500 && env.isProduction ? 'Something went wrong on the server.' : err.message,
        details: !env.isProduction ? err.details || undefined : undefined,
      },
    });
  }

  if (!env.isProduction) {
    console.error('Unhandled server error:', err);
  }

  return res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong on the server.' },
  });
}
