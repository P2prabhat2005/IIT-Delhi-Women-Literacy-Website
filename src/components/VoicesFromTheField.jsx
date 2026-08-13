import { ArrowRight, Play, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibleModal from './AccessibleModal.jsx';
import SectionTitle from './SectionTitle.jsx';

const testimonialVideos = [
  {
    id: '1000131955',
    src: '/videos/testimonials/1000131955.mp4',
    poster: '/videos/testimonials/1000131955.jpg',
  },
  {
    id: '1000131958',
    src: '/videos/testimonials/1000131958.mp4',
    poster: '/videos/testimonials/1000131958.jpg',
  },
  {
    id: 'vn-20260812-120558',
    src: '/videos/testimonials/VN20260812_120558.mp4',
    poster: '/videos/testimonials/VN20260812_120558.jpg',
  },
];

function VoiceCard({ featured = false, onPlay, video }) {
  return (
    <article className="min-w-0">
      <button
        type="button"
        onClick={() => onPlay(video)}
        className="group relative block aspect-video w-full overflow-hidden rounded-[1.15rem] border border-slate-200/90 bg-slate-100 text-left shadow-[0_6px_18px_rgba(15,23,42,0.05)] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-800"
        aria-label={featured ? 'Play featured participant voice' : 'Play participant voice'}
      >
        <img
          src={video.poster}
          alt=""
          width="720"
          height="1280"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[center_28%] opacity-90 transition duration-300 motion-safe:group-hover:scale-[1.015]"
        />
        <span className="absolute inset-0 bg-slate-950/15 transition group-hover:bg-slate-950/25" aria-hidden="true" />
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span
            className={`flex items-center justify-center rounded-full border border-white/70 bg-white/95 text-red-900 shadow-[0_6px_14px_rgba(15,23,42,0.14)] transition motion-safe:group-hover:scale-105 ${
              featured ? 'h-16 w-16' : 'h-12 w-12'
            }`}
          >
            <Play size={featured ? 24 : 18} className="ml-0.5" fill="currentColor" aria-hidden="true" />
          </span>
        </span>
      </button>
      <p className={`mt-3 font-semibold uppercase tracking-[0.18em] text-red-900/80 ${featured ? 'text-[11px]' : 'text-[10px]'}`}>
        Participant Voice
      </p>
    </article>
  );
}

export default function VoicesFromTheField() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [featuredVideo, ...supportingVideos] = testimonialVideos;

  return (
    <section
      id="voices-from-the-field"
      aria-labelledby="voices-from-the-field-title"
      className="relative isolate scroll-mt-28 overflow-hidden bg-[#f8f4ee] pb-8 pt-16 md:pb-10 md:pt-20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-8 select-none font-serif text-[10rem] leading-none text-red-900/[0.045] md:top-4 md:text-[14rem]"
      >
        “
      </span>

      <div className="site-container relative">
        <SectionTitle
          align="center"
          eyebrow="Voices from the Field"
          id="voices-from-the-field-title"
          description="Hear directly from the women at the heart of Project Bharti."
        >
          Voices from the Field
        </SectionTitle>
        <div className="mx-auto mt-5 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-6 bg-red-800/50" />
          <span className="h-1 w-1 rounded-full bg-red-800/70" />
          <span className="h-px w-6 bg-red-800/50" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-start lg:gap-7">
          <VoiceCard featured video={featuredVideo} onPlay={setActiveVideo} />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7">
            {supportingVideos.map((video) => (
              <VoiceCard key={video.id} video={video} onPlay={setActiveVideo} />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center md:mt-10">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 transition hover:text-red-800"
          >
            Explore Stories from the Field
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <AccessibleModal
        isOpen={Boolean(activeVideo)}
        onClose={() => setActiveVideo(null)}
        ariaLabel="Participant testimonial video"
        closeOnOverlayClick
        overlayClassName="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/90 px-3 py-6 sm:px-6"
        className="relative w-full max-w-5xl outline-none"
      >
        <button
          type="button"
          onClick={() => setActiveVideo(null)}
          data-autofocus
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close video"
        >
          <X size={18} aria-hidden="true" />
        </button>
        {activeVideo ? (
          <video
            key={activeVideo.id}
            controls
            playsInline
            preload="auto"
            poster={activeVideo.poster}
            className="max-h-[82vh] w-full rounded-2xl bg-black"
          >
            <source src={activeVideo.src} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        ) : null}
      </AccessibleModal>
    </section>
  );
}
