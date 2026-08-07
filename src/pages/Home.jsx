import ActivitiesPreview from '../components/ActivitiesPreview.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import Hero from '../components/Hero.jsx';
import Partners from '../components/Partners.jsx';
import ResourcesPreview from '../components/ResourcesPreview.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <ActivitiesPreview />
      <ResourcesPreview />
      <Partners />
      <ContactCTA />
    </>
  );
}
