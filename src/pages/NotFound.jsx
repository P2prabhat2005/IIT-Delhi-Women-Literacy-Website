import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page">
      <h1>Page Not Found</h1>
      <p>The requested page could not be found on the Project Bharti website.</p>
      <Link to="/">Return to home</Link>
    </section>
  );
}
