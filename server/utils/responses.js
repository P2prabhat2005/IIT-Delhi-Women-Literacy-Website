export function sendSuccess(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function sendCreated(res, data) {
  return sendSuccess(res, data, 201);
}
