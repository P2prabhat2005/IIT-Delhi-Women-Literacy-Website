/**
 * Static team directory matching the former seed data.
 */

import apporvaPhoto from '../assets/images/team/apporva.png';
import akritiChandraPhoto from '../assets/images/team/akriti-chandra.png';
import harshiGuptaPhoto from '../assets/images/team/harshi-gupta.png';
import pranjaliSoniPhoto from '../assets/images/team/pranjali-soni.webp';
import profGouravDwivediPhoto from '../assets/images/team/prof-gourav-dwivedi.png';
import profSeemaSharmaPhoto from '../assets/images/team/prof-seema-sharma.png';
import purariKumarPhoto from '../assets/images/team/purari-kumar.png';
import shaliniShuklaPhoto from '../assets/images/team/shalini-shukla.png';
import shashankKumarPhoto from '../assets/images/team/shashank-kumar.png';
import uditMaheshwariPhoto from '../assets/images/team/udit-maheshwari.png';

const teamCategories = [
  {
    id: 'project-leadership',
    title: 'Project Leadership',
    slug: 'project-leadership',
    description: 'Faculty leadership at IIT Delhi providing academic direction for Project Bharti’s research and outreach mandate.',
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
    title: 'Research & Implementation Team',
    slug: 'development-team',
    description:
      'Researchers and associates supporting research design, field documentation, technology, and programme implementation under Project Bharti.',
    displayOrder: 1,
    isActive: true,
    memberGroups: [
      {
        id: 'doctoral-scholars',
        title: 'Doctoral Scholars',
        memberIds: ['purari-kumar', 'apporva', 'udit-maheshwari', 'akriti-chandra'],
      },
      {
        id: 'research-associates',
        title: 'Research Associates',
        memberIds: ['shashank-kumar', 'pranjali-soni', 'harshi-gupta', 'shalini-shukla'],
      },
    ],
    members: [
      {
        id: 'purari-kumar',
        fullName: 'Purari Kumar',
        designation: 'Doctoral Scholar',
        photo: { url: purariKumarPhoto },
        isActive: true,
        displayOrder: 0,
        categoryId: 'development-team',
      },
      {
        id: 'apporva',
        fullName: 'Apoorva',
        designation: 'Doctoral Scholar',
        photo: { url: apporvaPhoto },
        isActive: true,
        displayOrder: 1,
        categoryId: 'development-team',
      },
      {
        id: 'udit-maheshwari',
        fullName: 'Udit Maheshwari',
        designation: 'Doctoral Scholar',
        photo: { url: uditMaheshwariPhoto },
        isActive: true,
        displayOrder: 2,
        categoryId: 'development-team',
      },
      {
        id: 'akriti-chandra',
        fullName: 'Akriti Chandra',
        designation: 'Doctoral Scholar',
        photo: { url: shaliniShuklaPhoto },
        isActive: true,
        displayOrder: 3,
        categoryId: 'development-team',
      },
      {
        id: 'shashank-kumar',
        fullName: 'Shashank Kumar',
        designation: 'Project Employee',
        photo: { url: shashankKumarPhoto },
        isActive: true,
        displayOrder: 4,
        categoryId: 'development-team',
      },
      {
        id: 'pranjali-soni',
        fullName: 'Pranjali Soni',
        designation: 'Project Employee',
        photo: { url: pranjaliSoniPhoto },
        isActive: true,
        displayOrder: 5,
        categoryId: 'development-team',
      },
      {
        id: 'harshi-gupta',
        fullName: 'Harshi Gupta',
        designation: 'Project Employee',
        photo: { url: harshiGuptaPhoto },
        isActive: true,
        displayOrder: 6,
        categoryId: 'development-team',
      },
      {
        id: 'shalini-shukla',
        fullName: 'Shalini Shukla',
        designation: 'Project Employee',
        photo: { url: akritiChandraPhoto },
        isActive: true,
        displayOrder: 7,
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
