import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const { isAdmin, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(username, password);
      navigate('/', { replace: true });
    } catch (submitError) {
      setError(submitError.message || 'Invalid username or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section bg-white">
      <div className="site-container flex justify-center">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70 md:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-900 text-white">
            <LockKeyhole size={20} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-slate-950">Administrator Sign In</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sign in to manage resources, documents, and media for Project Bharti.
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="admin-username" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-800"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-800"
              />
            </div>

            {error ? (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-800">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-red-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
