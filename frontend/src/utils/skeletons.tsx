export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`flex w-full md:w-52 bg-gray-200 rounded-md border border-accent-content flex-col gap-4 m-5 ${className}`}
    >
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <button className="btn-sm rounded-sm bg-slate-300">Learn More</button>
      <button className="btn-sm rounded-sm bg-slate-400">Enroll</button>
    </div>
  );
}
