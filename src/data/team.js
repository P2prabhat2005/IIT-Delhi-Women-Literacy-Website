/**
 * Static team directory matching the former seed data.
 */

import profGouravDwivediPhoto from '../assets/images/team/prof-gourav-dwivedi.png';
import profSeemaSharmaPhoto from '../assets/images/team/prof-seema-sharma.png';

const teamCategories = [
  {
    id: 'project-leadership',
    title: 'Project Leadership',
    slug: 'project-leadership',
    description: 'Academic and implementation leadership guiding Project Bharti.',
    displayOrder: 0,
    isActive: true,
    members: [
      {
        id: 'prof-seema-sharma',
        fullName: 'Prof. Seema Sharma',
        designation: 'Project Lead',
        photo: { url: profSeemaSharmaPhoto },
        isActive: true,
        displayOrder: 0,
        categoryId: 'project-leadership',
      },
      {
        id: 'prof-gourav-dwivedi',
        fullName: 'Prof. Gourav Dwivedi',
        designation: 'Co-Project Lead',
        photo: { url: profGouravDwivediPhoto },
        isActive: true,
        displayOrder: 1,
        categoryId: 'project-leadership',
      },
    ],
  },
  {
    id: 'development-team',
    title: 'Development Team',
    slug: 'development-team',
    description:
      'A multidisciplinary team contributing to research, technology, documentation, and implementation of Project Bharti.',
    displayOrder: 1,
    isActive: true,
    members: [
      {
        id: 'research-scholar-placeholder-1',
        fullName: 'To be announced',
        designation: 'Research Scholar',
        photo: null,
        isActive: true,
        isPlaceholder: true,
        displayOrder: 0,
        categoryId: 'development-team',
      },
      {
        id: 'research-scholar-placeholder-2',
        fullName: 'To be announced',
        designation: 'Research Scholar',
        photo: null,
        isActive: true,
        isPlaceholder: true,
        displayOrder: 1,
        categoryId: 'development-team',
      },
      {
        id: 'purari-sharma',
        fullName: 'Purari Sharma',
        designation: 'Research Associate',
        photo: null,
        isActive: true,
        displayOrder: 2,
        categoryId: 'development-team',
      },
      {
        id: 'shashank-kumar',
        fullName: 'Shashank Kumar',
        designation: 'Research Associate',
        photo: null,
        isActive: true,
        displayOrder: 3,
        categoryId: 'development-team',
      },
    ],
  },
];

export function getTeamDirectory({ includeInactive = false } = {}) {
  return teamCategories
    .map((category) => ({
      ...category,
      members: includeInactive
        ? [...category.members].sort((a, b) => a.displayOrder - b.displayOrder)
        : category.members
            .filter((member) => member.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder),
    }))
    .filter((category) => includeInactive || category.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
