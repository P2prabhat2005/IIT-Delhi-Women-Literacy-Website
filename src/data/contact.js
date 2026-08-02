import { Building2, Handshake, Mail, MapPin, Phone, UsersRound } from 'lucide-react';

export const contactInfoCards = [
  {
    title: 'Email',
    value: 'contact@projectbharti.org',
    detail: 'Primary channel for collaboration and general enquiries.',
    Icon: Mail,
  },
  {
    title: 'Phone',
    value: '+91 XXXXX XXXXX',
    detail: 'Available for project coordination by appointment.',
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
    detail: 'Institutional base for academic coordination and project administration.',
    Icon: MapPin,
    isAddress: true,
  },
  {
    title: 'Research Collaboration',
    value: '[Official research email — to be confirmed by Project Bharti]',
    detail: 'For academic collaboration, research partnerships, institutional engagement, and project-related enquiries.',
    Icon: Handshake,
  },
];

export const contactFaqItems = [
  {
    question: 'How can I volunteer with Project Bharti?',
    answer:
      'Prospective volunteers may contact the project office regarding field support, outreach, workshop facilitation, and awareness activities aligned with Project Bharti’s research and capacity-building goals.',
  },
  {
    question: 'How can institutions partner with the project?',
    answer:
      'Academic institutions, government agencies, and implementing organisations may discuss research collaboration, field engagement, training design, and community partnerships through the contact channels listed on this page.',
  },
  {
    question: 'Can I request training material or resources?',
    answer:
      'Resource requests may be submitted through the contact form and will be reviewed by Project Bharti as materials are developed and released.',
  },
  {
    question: 'How can organisations support the project?',
    answer:
      'Support may take the form of research collaboration, field partnership, institutional engagement, volunteer participation, or community outreach aligned with the project mandate.',
  },
  {
    question: 'How will new resources be announced?',
    answer:
      'Updates will be published through official project channels and the Resources section as new materials become available.',
  },
];

export const contactHighlights = [
  {
    title: 'NGOs',
    description: 'Partner on community outreach, field delivery, and local implementation support.',
    Icon: UsersRound,
  },
  {
    title: 'Volunteers',
    description: 'Contribute to field work, facilitation support, and community awareness activities.',
    Icon: Building2,
  },
  {
    title: 'Institutions',
    description: 'Collaborate on research, capacity building, curriculum design, and programme evaluation.',
    Icon: Building2,
  },
];
