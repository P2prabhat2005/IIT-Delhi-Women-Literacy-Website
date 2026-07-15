import { useEffect, useState } from 'react';
import { fetchMediaAsset, removeMediaAsset, uploadMediaAsset } from '../utils/editableMediaStorage.js';
import EditableImageSlot from './EditableImageSlot.jsx';

const OWNER_TYPE = 'site-image';

/**
 * Thin persistence wrapper around `EditableImageSlot`. The slot's own UI and
 * behaviour are untouched — this component only loads/saves the image URL
 * through the backend media API instead of leaving uploads ephemeral, using
 * `ownerId` as a stable key (e.g. a slugified title) for the photograph.
 */
export default function PersistentImageSlot({ image: fallbackImage, ownerId, ...slotProps }) {
  // `undefined` = still loading (show the bundled default photo, if any);
  // `null` once loaded = no backend override, keep showing the default;
  // a string = an admin-uploaded photo takes precedence over the default.
  const [overrideUrl, setOverrideUrl] = useState(undefined);

  useEffect(() => {
    let cancelled = false;
    setOverrideUrl(undefined);

    fetchMediaAsset(OWNER_TYPE, ownerId, 'image').then((asset) => {
      if (!cancelled) setOverrideUrl(asset?.url || null);
    });

    return () => {
      cancelled = true;
    };
  }, [ownerId]);

  const handleChange = async (file) => {
    if (!file) {
      setOverrideUrl(null);
      await removeMediaAsset(OWNER_TYPE, ownerId, 'image');
      return;
    }

    const result = await uploadMediaAsset(OWNER_TYPE, ownerId, file, 'image');
    if (result.ok) {
      setOverrideUrl(result.entry.url);
    }
  };

  const resolvedImage = overrideUrl || fallbackImage || null;

  return <EditableImageSlot {...slotProps} image={resolvedImage} onChange={handleChange} />;
}
