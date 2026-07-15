import { useParams } from 'react-router-dom';

export default function StateDetails() {
  const { stateId } = useParams();

  return (
    <section className="page">
      <h1>State Details</h1>
      <p>State details placeholder for {stateId}.</p>
    </section>
  );
}
