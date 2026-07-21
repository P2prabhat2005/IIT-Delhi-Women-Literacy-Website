import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

let isConfigured = false;

export function configureCloudinary() {
  if (isConfigured) return;

  const { cloudName, apiKey, apiSecret } = env.cloudinary;

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('⚠️  Cloudinary not configured - missing environment variables');
    console.warn('   Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to enable cloud storage');
    return;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  isConfigured = true;
  console.log('✅ Cloudinary configured successfully');
}

export function isCloudinaryConfigured() {
  return isConfigured;
}

export { cloudinary };
export default cloudinary;