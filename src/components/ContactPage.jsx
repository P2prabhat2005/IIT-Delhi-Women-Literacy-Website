import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Mail, MapPin, Send, Sparkles, UserRound } from 'lucide-react';
import { contactFaqItems, contactHighlights, contactInfoCards } from '../data/contact.js';

function ContactCard({ card }) {
  const { Icon, detail, isAddress, title, value } = card;

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-900">
        <Icon size={20} aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
      {isAddress ? (
        <address className="mt-3 whitespace-pre-line text-sm font-semibold not-italic leading-6 text-slate-800">{value}</address>
      ) : value ? (
        <p className="mt-3 text-sm font-semibold text-slate-800">{value}</p>
      ) : null}
      <p className={`${value ? 'mt-2' : 'mt-3'} text-sm leading-7 text-slate-600`}>{detail}</p>
    </div>
  );
}

const dmsLocationQuery =
  'Department of Management Studies, Indian Institute of Technology Delhi, IV Floor, Vishwakarma Bhavan, Shaheed Jeet Singh Marg, Hauz Khas, New Delhi 110016, India';
const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(dmsLocationQuery)}&output=embed`;
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dmsLocationQuery)}`;

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = contactInfoCards.find((card) => card.title === 'Email')?.value;
    const body = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Phone: ${formState.phone}`,
      `Organization: ${formState.organization}`,
      '',
      formState.message,
    ].join('\n');

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 p-8 text-white shadow-2xl shadow-slate-300/70 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-200">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Contact Project Bharti</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Academic institutions, government agencies, CSR partners, NGOs, and community organisations may contact Project Bharti regarding research collaboration, field partnership, and capacity-building engagement.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Sparkles size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Institutional engagement</p>
                <p className="text-sm text-slate-300">Reach the project office for collaboration and programme enquiries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contactInfoCards.map((card) => (
            <ContactCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-900">
              <Mail size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-800">Send a message</p>
              <h2 className="text-2xl font-semibold text-slate-950">Submit an enquiry</h2>
            </div>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Name
                <input
                  name="name"
                  autoComplete="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:bg-white"
                  placeholder="Full name"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:bg-white"
                  placeholder="your@email.com"
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Phone
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:bg-white"
                  placeholder="Phone number"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Organization
                <input
                  name="organization"
                  autoComplete="organization"
                  value={formState.organization}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:bg-white"
                  placeholder="Institution, agency, or organisation"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Subject
              <input
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:bg-white"
                placeholder="Subject of enquiry"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
              Message
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows="6"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-red-300 focus:bg-white"
                placeholder="Describe your enquiry, partnership interest, or request."
                required
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              <Send size={16} aria-hidden="true" />
              Submit
            </button>
          </form>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-200/70 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-900 shadow-sm">
              <UserRound size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-800">Who can connect</p>
              <h2 className="text-2xl font-semibold text-slate-950">Engagement pathways</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4">
            {contactHighlights.map(({ Icon, description, title }) => (
              <div key={title} className="rounded-[1.25rem] border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-900">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 md:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-800">Frequently asked questions</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Collaboration and engagement</h2>
        </div>
        <div className="mt-8 space-y-3">
          {contactFaqItems.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <div key={item.question} className="rounded-[1.25rem] border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  id={`faq-trigger-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className="text-sm font-semibold text-slate-900">{item.question}</span>
                  <ChevronDown size={18} className={`shrink-0 text-slate-600 transition ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {isOpen ? (
                  <p id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} className="px-5 pb-5 text-sm leading-7 text-slate-600">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-900">
              <MapPin size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-800">Location</p>
              <h2 className="text-2xl font-semibold text-slate-950">Project office</h2>
            </div>
          </div>
          <div className="mt-8 h-[320px] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm md:h-[380px]">
            <iframe
              title="Department of Management Studies, IIT Delhi location"
              src={googleMapsEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the Department of Management Studies, IIT Delhi location in Google Maps"
            className="btn-secondary mt-5"
          >
            <MapPin size={16} aria-hidden="true" />
            Open in Google Maps
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-red-200">Partner with the project</p>
          <h2 className="mt-3 text-3xl font-semibold">Research, outreach, and field collaboration</h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            Project Bharti welcomes partnerships with academic institutions, public agencies, CSR programmes, NGOs, and community organisations to advance financial literacy, digital literacy, and women entrepreneurship.
          </p>
          <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100">
            Collaboration opportunities are reviewed as the programme expands.
          </div>
        </div>
      </section>

    </div>
  );
}
