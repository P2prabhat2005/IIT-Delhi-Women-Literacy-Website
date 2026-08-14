import { ArrowRight, Play, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AccessibleModal from './AccessibleModal.jsx';
import SectionTitle from './SectionTitle.jsx';

const testimonialVideos = [
  {
    id: '31687',
    src: '/videos/testimonials/31687.mp4',
    poster: '/videos/testimonials/31687.jpg',
  },
  {
    id: '31688',
    src: '/videos/testimonials/31688.mp4',
    poster: '/videos/testimonials/31688.jpg',
  },
  {
    id: '31690',
    src: '/videos/testimonials/31690.mp4',
    poster: '/videos/testimonials/31690.jpg',
  },
  {
    id: '31691',
    src: '/videos/testimonials/31691.mp4',
    poster: '/videos/testimonials/31691.jpg',
  },
  {
    id: '31692',
    src: '/videos/testimonials/31692.mp4',
    poster: '/videos/testimonials/31692.jpg',
  },
];

function VoiceCard({ className = '', onPlay, video }) {
  return (
    <article className={`min-w-0 ${className}`.trim()}>
      <button
        type="button"
        onClick={() => onPlay(video)}
        className="group relative block aspect-video w-full overflow-hidden rounded-[1.15rem] border border-slate-200/90 bg-slate-100 text-left shadow-[0_6px_18px_rgba(15,23,42,0.05)] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-800"
        aria-label={`Play testimonial video ${video.id}`}
      >
        <img
          src={video.poster}
          alt=""
          width="1280"
          height="720"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-90 transition duration-300 motion-safe:group-hover:scale-[1.015]"
        />
        <span className="absolute inset-0 bg-slate-950/15 transition group-hover:bg-slate-950/25" aria-hidden="true" />
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/95 text-red-900 shadow-[0_6px_14px_rgba(15,23,42,0.14)] transition motion-safe:group-hover:scale-105">
            <Play size={22} className="ml-0.5" fill="currentColor" aria-hidden="true" />
          </span>
        </span>
      </button>
    </article>
  );
}

export default function VoicesFromTheField() {
  const [activeVideo, setActiveVideo] = useState(null);

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

        <div className="mx-auto mt-10 max-w-5xl lg:mt-12" aria-label="Participant testimonial videos">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {testimonialVideos.slice(0, 3).map((video) => (
              <VoiceCard key={video.id} video={video} onPlay={setActiveVideo} />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
            {testimonialVideos.slice(3).map((video, index) => (
              <VoiceCard
                key={video.id}
                video={video}
                onPlay={setActiveVideo}
                className={index === 0 ? 'lg:col-span-2 lg:col-start-2' : 'lg:col-span-2 lg:col-start-4'}
              />
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
