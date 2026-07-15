import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page">
      <h1>Page Not Found</h1>
      <p>The requested page does not exist.</p>
      <Link to="/">Return home</Link>
    </section>
  );
}
