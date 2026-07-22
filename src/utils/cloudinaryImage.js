const CLOUDINARY_HOST = 'res.cloudinary.com';
const DEFAULT_WIDTHS = [320, 480, 640, 768, 960, 1200, 1600];
const DEFAULT_FALLBACK_WIDTH = 1200;
const DEFAULT_SIZES = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

function isTransformSegment(segment) {
  return /^(?:a_|ar_|b_|bo_|c_|co_|d_|dpr_|e_|f_|fl_|g_|h_|l_|o_|q_|r_|t_|u_|w_|x_|y_|z_)/.test(segment);
}

function getUploadInsertionIndex(segments, uploadIndex) {
  const nextIndex = uploadIndex + 1;
  const nextSegment = segments[nextIndex];

  if (nextSegment && isTransformSegment(nextSegment)) {
    return nextIndex + 1;
  }

  return nextIndex;
}

export function isCloudinaryImageUrl(url) {
  if (!url || typeof url !== 'string') return false;

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === CLOUDINARY_HOST && parsedUrl.pathname.split('/').includes('upload');
  } catch {
    return false;
  }
}

export function getCloudinaryImageUrl(url, { width } = {}) {
  if (!isCloudinaryImageUrl(url)) return url;

  const parsedUrl = new URL(url);
  const segments = parsedUrl.pathname.split('/');
  const uploadIndex = segments.indexOf('upload');
  const insertionIndex = getUploadInsertionIndex(segments, uploadIndex);
  const transforms = ['f_auto', 'q_auto'];

  if (width) {
    transforms.push(`w_${width}`, 'c_limit');
  }

  const nextSegments = [...segments];
  nextSegments.splice(insertionIndex, 0, transforms.join(','));
  parsedUrl.pathname = nextSegments.join('/');

  return parsedUrl.toString();
}

export function getOptimizedImageProps(
  url,
  {
    fallbackWidth = DEFAULT_FALLBACK_WIDTH,
    sizes = DEFAULT_SIZES,
    widths = DEFAULT_WIDTHS,
  } = {},
) {
  if (!isCloudinaryImageUrl(url)) {
    return { src: url, srcSet: undefined, sizes: undefined };
  }

  return {
    src: getCloudinaryImageUrl(url, { width: fallbackWidth }),
    srcSet: widths.map((width) => `${getCloudinaryImageUrl(url, { width })} ${width}w`).join(', '),
    sizes,
  };
}
