import { Building2, Handshake, Mail, MapPin, Phone, UsersRound } from 'lucide-react';

export const contactInfoCards = [
  {
    title: 'Email',
    value: 'contact@projectbharti.org',
    detail: 'Primary contact for collaboration and general enquiries.',
    Icon: Mail,
  },
  {
    title: 'Phone',
    value: '+91 XXXXX XXXXX',
    detail: 'Available for project coordination by phone.',
    Icon: Phone,
  },
  {
    title: 'Office Address',
    value: `Department of Management Studies (DMS)
Indian Institute of Technology Delhi
IV Floor, Vishwakarma Bhavan
Shaheed Jeet Singh Marg
Hauz Khas
New Delhi – 110016
India`,
    detail: 'Administrative coordination and institutional engagement.',
    Icon: MapPin,
    isAddress: true,
  },
  {
    title: 'Research Collaboration',
    value: '[Official research email — to be confirmed by Project Bharti]',
    detail: 'Connect with the Project Bharti team for academic collaboration, research partnerships, institutional engagement, and project-related enquiries.',
    Icon: Handshake,
  },
];

export const contactFaqItems = [
  {
    question: 'How can I volunteer with Project Bharti?',
    answer:
      'Volunteers can connect with the team for field support, outreach, workshop facilitation, and awareness activities that align with project goals.',
  },
  {
    question: 'How can institutions partner with the project?',
    answer:
      'Institutions can discuss academic collaboration, field engagement, training design, research support, and community partnerships through the contact channel.',
  },
  {
    question: 'Can I request training material or resources?',
    answer:
      'Resource requests can be shared through the contact form and will be reviewed by the Project Bharti Team as materials are developed.',
  },
  {
    question: 'How can I contribute or support the project?',
    answer:
      'Support can be expressed through collaboration, outreach, institutional partnership, volunteer participation, and community engagement.',
  },
  {
    question: 'How will I know when new resources are released?',
    answer:
      'Updates will be shared through the official project channels and the resources section as the project content expands.',
  },
];

export const contactHighlights = [
  {
    title: 'NGOs',
    description: 'Connect for community outreach and implementation support.',
    Icon: UsersRound,
  },
  {
    title: 'Volunteers',
    description: 'Join the project as a support partner for field work and awareness activities.',
    Icon: Building2,
  },
  {
    title: 'Institutions',
    description: 'Discuss research partnerships, capacity building, and programme design.',
    Icon: Building2,
  },
];
