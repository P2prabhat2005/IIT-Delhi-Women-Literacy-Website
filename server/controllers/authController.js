import { env } from '../config/env.js';
import * as authService from '../services/authService.js';
import { sendSuccess } from '../utils/responses.js';

function cookieOptions() {
  const isProduction = env.nodeEnv === 'production';
  return {
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    maxAge: env.auth.cookieMaxAgeMs,
    path: '/',
  };
}

export async function login(req, res) {
  const { username, password } = req.body || {};
  const { token, admin } = await authService.login(username, password);

  res.cookie(env.auth.cookieName, token, cookieOptions());
  sendSuccess(res, { admin });
}

export function logout(req, res) {
  res.clearCookie(env.auth.cookieName, { ...cookieOptions(), maxAge: undefined });
  sendSuccess(res, { loggedOut: true });
}

export function me(req, res) {
  sendSuccess(res, { admin: req.admin || null });
}
