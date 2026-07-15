import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="project-bharti-error-boundary flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
          <section className="w-full max-w-lg rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/70">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-800">Project Bharti</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950">We&apos;re unable to load this page.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Please refresh the page and try again. If the issue continues, please contact the Project Bharti team.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-red-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              Refresh page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
