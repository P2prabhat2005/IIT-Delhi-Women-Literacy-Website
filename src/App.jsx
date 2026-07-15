import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import RouteLoadingState from './components/RouteLoadingState.jsx';

const About = lazy(() => import('./pages/About.jsx'));
const Activities = lazy(() => import('./pages/Activities.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const Resources = lazy(() => import('./pages/Resources.jsx'));
const StateDetails = lazy(() => import('./pages/StateDetails.jsx'));

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteLoadingState />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<RouteLoadingState />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="activities"
          element={
            <Suspense fallback={<RouteLoadingState />}>
              <Activities />
            </Suspense>
          }
        />
        <Route
          path="resources"
          element={
            <Suspense fallback={<RouteLoadingState />}>
              <Resources />
            </Suspense>
          }
        />
        <Route
          path="states/:stateId"
          element={
            <Suspense fallback={<RouteLoadingState />}>
              <StateDetails />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<RouteLoadingState />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteLoadingState />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
