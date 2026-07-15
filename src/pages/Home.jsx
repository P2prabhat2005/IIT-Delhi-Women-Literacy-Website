import { lazy, Suspense } from 'react';
import AboutPreview from '../components/AboutPreview.jsx';
import ActivitiesPreview from '../components/ActivitiesPreview.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import Hero from '../components/Hero.jsx';
import Objectives from '../components/Objectives.jsx';
import Partners from '../components/Partners.jsx';
import ProjectLeadership from '../components/ProjectLeadership.jsx';
import ResourcesPreview from '../components/ResourcesPreview.jsx';
import RouteLoadingState from '../components/RouteLoadingState.jsx';

const InteractiveIndiaMap = lazy(() => import('../components/InteractiveIndiaMap.jsx'));

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Objectives />
      <Suspense fallback={<RouteLoadingState />}>
        <InteractiveIndiaMap />
      </Suspense>
      <ActivitiesPreview />
      <ProjectLeadership />
      <ResourcesPreview />
      <Partners />
      <ContactCTA />
    </>
  );
}
