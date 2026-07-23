import ActivitiesPreview from '../components/ActivitiesPreview.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import Hero from '../components/Hero.jsx';
import Partners from '../components/Partners.jsx';
import ResourcesPreview from '../components/ResourcesPreview.jsx';
import SessionIntroVideo from '../components/SessionIntroVideo.jsx';

export default function Home() {
  return (
    <>
      <SessionIntroVideo />
      <Hero />
      <ActivitiesPreview />
      <ResourcesPreview />
      <Partners />
      <ContactCTA />
    </>
  );
}
