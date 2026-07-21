import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import { buildUniqueFileName } from '../utils/fileNaming.js';

// Map owner types to Cloudinary folder structure
const FOLDER_MAPPING = {
  'team-member': 'project-bharti/team',
  'resource': 'project-bharti/resources', 
  'hero-capability-documents': 'project-bharti/hero',
  'site-image': 'project-bharti/activities',
  'activity': 'project-bharti/activities',
  'state': 'project-bharti/states',
};

function getCloudinaryFolder(ownerType) {
  return FOLDER_MAPPING[ownerType] || 'project-bharti/misc';
}

function getResourceType(mimeType) {
  if (mimeType?.startsWith('image/')) return 'image';
  if (mimeType?.startsWith('video/')) return 'video';
  return 'raw'; // For PDFs and other documents
}

export async function uploadToCloudinary(file, ownerType, ownerId, assetType) {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured');
  }

  const folder = getCloudinaryFolder(ownerType);
  const resourceType = getResourceType(file.mimetype);
  
  // Create a unique public_id that includes owner context
  const uniqueFileName = buildUniqueFileName(file.originalname);
  const publicId = `${folder}/${ownerType}-${ownerId}-${assetType}-${uniqueFileName}`.replace(/\.[^/.]+$/, '');

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      public_id: publicId,
      resource_type: resourceType,
      folder: folder,
      use_filename: false,
      unique_filename: false,
      overwrite: false,
    });

    return {
      publicId: result.public_id,
      secureUrl: result.secure_url,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: result.bytes || file.size,
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
  }
}

export async function deleteFromCloudinary(publicId) {
  if (!isCloudinaryConfigured() || !publicId) {
    return false;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete failed:', error);
    return false;
  }
}