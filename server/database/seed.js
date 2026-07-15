import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runMigrations } from './migrate.js';
import { getDb } from '../config/db.js';

/**
 * Mirrors the default content shipped in `src/data/resources.js` so the
 * backend starts with the same six sections and starter resources the
 * frontend previously hardcoded. Icon rendering stays a frontend concern —
 * only the stable `icon_key` string is persisted here.
 */
const SEED_SECTIONS = [
  {
    id: 'downloadable-pdfs',
    title: 'Downloadable PDFs',
    description: 'Practical handouts and reference guides for facilitators, trainers, and field partners.',
    iconKey: 'FileText',
    accent: 'bg-red-50 text-red-900 border-red-100',
    items: [
      {
        title: 'Women Entrepreneurs Financial Basics',
        description: 'A concise guide covering savings, budgeting, and safe financial habits.',
        meta: 'PDF • 3 pages',
        kind: 'pdf',
        tags: ['financial literacy', 'guide', 'women entrepreneurs'],
      },
      {
        title: 'Digital Safety for Small Business Owners',
        description: 'A quick reference for responsible use of phones, payments, and online tools.',
        meta: 'PDF • 2 pages',
        kind: 'pdf',
        tags: ['digital literacy', 'safety', 'mobile'],
      },
    ],
  },
  {
    id: 'videos',
    title: 'Videos',
    description: 'Short explainers and demonstrations designed for community learning and outreach.',
    iconKey: 'CirclePlay',
    accent: 'bg-amber-50 text-amber-900 border-amber-100',
    items: [
      {
        title: 'How to Start a Simple Budget',
        description: 'A simple video lesson for women-led micro-enterprises to organise everyday cash flow.',
        meta: 'Video • 6 min',
        kind: 'video',
        tags: ['financial literacy', 'budgeting', 'video'],
      },
      {
        title: 'Digital Payments in Daily Business',
        description: 'A practical walkthrough on using UPI and secure payment habits in the field.',
        meta: 'Video • 8 min',
        kind: 'video',
        tags: ['digital literacy', 'payments', 'video'],
      },
    ],
  },
  {
    id: 'government-schemes',
    title: 'Government Schemes',
    description: 'Relevant public schemes that can support entrepreneurship, access to credit, and digital inclusion.',
    iconKey: 'ShieldCheck',
    accent: 'bg-emerald-50 text-emerald-900 border-emerald-100',
    items: [
      {
        title: 'PM Vishwakarma Yojana',
        description: 'Supports artisans and micro-entrepreneurs with skill development and financial assistance.',
        meta: 'Portal • Government of India',
        kind: 'scheme',
        tags: ['scheme', 'enterprise support', 'livelihood'],
      },
      {
        title: 'Pradhan Mantri Jan Dhan Yojana',
        description: 'Broadens access to banking services and financial inclusion for underserved communities.',
        meta: 'Portal • Government of India',
        kind: 'scheme',
        tags: ['scheme', 'banking', 'inclusion'],
      },
    ],
  },
  {
    id: 'training-material',
    title: 'Training Material',
    description: 'Curriculum-ready material for workshops, facilitator notes, and field sessions.',
    iconKey: 'BookOpenCheck',
    accent: 'bg-sky-50 text-sky-900 border-sky-100',
    items: [
      {
        title: 'Facilitator Guide for Financial Literacy',
        description: 'Workshop notes designed for trainers leading interactive sessions in community settings.',
        meta: 'Training module',
        kind: 'pdf',
        tags: ['training', 'facilitator', 'workshop'],
      },
      {
        title: 'Digital Literacy Session Plan',
        description: 'An adaptable lesson plan for teaching basic smartphone and digital payment usage.',
        meta: 'Training module',
        kind: 'pdf',
        tags: ['training', 'digital literacy', 'session plan'],
      },
    ],
  },
  {
    id: 'financial-literacy',
    title: 'Financial Literacy Resources',
    description: 'Tools and references for budgeting, savings, banking, and everyday money decisions.',
    iconKey: 'Landmark',
    accent: 'bg-violet-50 text-violet-900 border-violet-100',
    items: [
      {
        title: 'Savings and Budgeting Checklist',
        description: 'A simple checklist to help women entrepreneurs track income, expenses, and savings.',
        meta: 'Checklist',
        kind: 'pdf',
        tags: ['budgeting', 'savings', 'checklist'],
      },
      {
        title: 'Understanding Credit and Loans',
        description: 'An overview of loan basics, repayment planning, and responsible borrowing.',
        meta: 'Reference',
        kind: 'pdf',
        tags: ['credit', 'loans', 'financial literacy'],
      },
    ],
  },
  {
    id: 'digital-literacy',
    title: 'Digital Literacy Resources',
    description: 'Resources for navigating smartphones, digital payments, and online services with confidence.',
    iconKey: 'Smartphone',
    accent: 'bg-cyan-50 text-cyan-900 border-cyan-100',
    items: [
      {
        title: 'Safe Use of Digital Payments',
        description: 'A short practical guide to secure transactions, PIN safety, and fraud awareness.',
        meta: 'Guide',
        kind: 'pdf',
        tags: ['payments', 'safety', 'digital literacy'],
      },
      {
        title: 'Digital Skills for Everyday Business',
        description: 'A resource that introduces basic online tools for customer communication and record keeping.',
        meta: 'Reference',
        kind: 'pdf',
        tags: ['digital skills', 'business', 'online tools'],
      },
    ],
  },
];

function upsertTag(db, name) {
  db.prepare('INSERT OR IGNORE INTO tags (name) VALUES (?)').run(name);
  const row = db.prepare('SELECT id FROM tags WHERE name = ?').get(name);
  return row.id;
}

export function seedDatabase({ force = false } = {}) {
  const db = runMigrations();

  const existing = db.prepare('SELECT COUNT(*) AS count FROM sections').get();
  if (existing.count > 0 && !force) {
    return { seeded: false, reason: 'already-seeded' };
  }

  const insertSection = db.prepare(
    `INSERT OR REPLACE INTO sections (id, title, description, icon_key, accent, order_index)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const insertResource = db.prepare(
    `INSERT OR REPLACE INTO resources
       (id, section_id, kind, title, description, category, meta, order_index, is_custom)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
  );
  const insertResourceTag = db.prepare(
    'INSERT OR IGNORE INTO resource_tags (resource_id, tag_id) VALUES (?, ?)',
  );

  SEED_SECTIONS.forEach((section, sectionIndex) => {
    insertSection.run(section.id, section.title, section.description, section.iconKey, section.accent, sectionIndex);

    section.items.forEach((item, itemIndex) => {
      const resourceId = `${section.id}::seed::${item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}`;

      insertResource.run(
        resourceId,
        section.id,
        item.kind,
        item.title,
        item.description,
        section.id,
        item.meta,
        itemIndex,
      );

      item.tags.forEach((tagName) => {
        const tagId = upsertTag(db, tagName);
        insertResourceTag.run(resourceId, tagId);
      });
    });
  });

  return { seeded: true, sections: SEED_SECTIONS.length };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const force = process.argv.includes('--force');
  const result = seedDatabase({ force });
  console.log(result.seeded ? `Seeded ${result.sections} sections.` : `Skipped seeding (${result.reason}).`);
}

export { SEED_SECTIONS };
