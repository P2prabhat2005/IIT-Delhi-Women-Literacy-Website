/**
 * Intrinsic pixel sizes for case-study photographs.
 * Used only for width/height attributes to reduce CLS; display size is controlled by CSS.
 */
import beenaCover from '../assets/images/case-studies/beena-cover.jpg';
import bimlaCover from '../assets/images/case-studies/bimla-cover.jpg';
import deepikaCover from '../assets/images/case-studies/deepika-cover.jpg';
import happyCover from '../assets/images/case-studies/happy-cover.jpg';
import lalitaCover from '../assets/images/case-studies/lalita-devi-cover.jpg';
import lalitaDetail from '../assets/images/case-studies/lalita-devi-detail.jpg';
import manishaCover from '../assets/images/case-studies/manisha-cover.jpg';
import manishaDetail from '../assets/images/case-studies/manisha-detail.jpg';
import poojaCover from '../assets/images/case-studies/pooja-cover.jpg';
import poojaDetail from '../assets/images/case-studies/pooja-detail.jpg';
import poonamCover from '../assets/images/case-studies/poonam-cover.jpg';
import shilpaCover from '../assets/images/case-studies/shilpa-cover.jpg';
import sumanCover from '../assets/images/case-studies/suman-cover.jpg';
import sumanHamirpurCover from '../assets/images/case-studies/suman-hamirpur-cover.jpg';

const CASE_STUDY_IMAGE_SIZES = new Map([
  [beenaCover, { width: 720, height: 1255 }],
  [bimlaCover, { width: 720, height: 1600 }],
  [deepikaCover, { width: 960, height: 1280 }],
  [happyCover, { width: 1200, height: 1600 }],
  [lalitaCover, { width: 807, height: 1064 }],
  [lalitaDetail, { width: 921, height: 736 }],
  [manishaCover, { width: 507, height: 857 }],
  [manishaDetail, { width: 800, height: 600 }],
  [poojaCover, { width: 714, height: 951 }],
  [poojaDetail, { width: 960, height: 873 }],
  [poonamCover, { width: 869, height: 1230 }],
  [shilpaCover, { width: 738, height: 1600 }],
  [sumanCover, { width: 549, height: 640 }],
  [sumanHamirpurCover, { width: 899, height: 1599 }],
]);

export function getCaseStudyImageSize(src) {
  if (!src) return null;
  return CASE_STUDY_IMAGE_SIZES.get(src) ?? null;
}
