import { getSiteImage } from '../data/siteImages.js';
import EditableImageSlot from './EditableImageSlot.jsx';

/**
 * Resolves a static site image by ownerId, falling back to a bundled default.
 */
export default function PersistentImageSlot({ image: fallbackImage, ownerId, ...slotProps }) {
  const resolvedImage = getSiteImage(ownerId) || fallbackImage || null;
  return <EditableImageSlot {...slotProps} image={resolvedImage} />;
}
