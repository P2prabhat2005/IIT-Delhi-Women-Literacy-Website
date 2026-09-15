import AboutPreview from '../components/AboutPreview.jsx';
import ActivitiesPreview from '../components/ActivitiesPreview.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import FeaturedCaseStudy from '../components/FeaturedCaseStudy.jsx';
import Hero from '../components/Hero.jsx';
import Partners from '../components/Partners.jsx';
import StoriesFromTheField from '../components/StoriesFromTheField.jsx';
import VoicesFromTheField from '../components/VoicesFromTheField.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ActivitiesPreview />
      <StoriesFromTheField />
      <FeaturedCaseStudy />
      <VoicesFromTheField />
      <Partners />
      <ContactCTA />
    </>
  );
}
