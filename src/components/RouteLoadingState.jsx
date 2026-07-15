export default function RouteLoadingState() {
  return (
    <div className="section bg-white">
      <div className="site-container space-y-4">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="h-8 w-3/4 animate-pulse rounded-full bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-100" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-40 animate-pulse rounded-[1.5rem] border border-slate-200 bg-slate-50" />
          <div className="h-40 animate-pulse rounded-[1.5rem] border border-slate-200 bg-slate-50" />
        </div>
      </div>
    </div>
  );
}
