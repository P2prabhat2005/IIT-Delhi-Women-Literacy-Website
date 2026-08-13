/**
 * State gallery / media URLs for the Interactive India Map panels.
 * Kept separate from stateImpact.js so Home statistics do not pull this graph.
 */

import { delhiMedia } from './stateMedia/delhi.js';
import { haryanaMedia } from './stateMedia/haryana.js';
import { himachalPradeshMedia } from './stateMedia/himachalPradesh.js';
import { uttarakhandMedia } from './stateMedia/uttarakhand.js';
import { uttarPradeshMedia } from './stateMedia/uttarPradesh.js';

const MEDIA_GROUP_DEFS = [
  { key: 'gallery', label: 'Gallery', countLabel: 'Gallery' },
  { key: 'activities', label: 'Activities', countLabel: 'Activities' },
  { key: 'videos', label: 'Videos', countLabel: 'Videos' },
  { key: 'research', label: 'Research Documents', countLabel: 'Research' },
  { key: 'news', label: 'News', countLabel: 'News' },
];

const EMPTY_MEDIA_PLACEHOLDER =
  'Official content will be added as Project Bharti documentation is published.';

export const projectBhartiStateMediaById = {
  delhi: delhiMedia,
  haryana: haryanaMedia,
  'himachal-pradesh': himachalPradeshMedia,
  uttarakhand: uttarakhandMedia,
  'uttar-pradesh': uttarPradeshMedia,
};

/**
 * Build the same mediaGroups shape previously embedded on state profiles.
 */
export function getStateMediaGroups(stateId) {
  const media = projectBhartiStateMediaById[stateId] || {};

  return MEDIA_GROUP_DEFS.map((group) => ({
    key: group.key,
    label: group.label,
    countLabel: group.countLabel,
    items: media[group.key] || [],
    placeholder: EMPTY_MEDIA_PLACEHOLDER,
  }));
}
