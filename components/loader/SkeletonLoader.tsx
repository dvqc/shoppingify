const SkeletonLoader = ({ className }: { className?: string }) => {
  return <div className={`w-full h-full rounded-2xl bg-slate-100 opacity-70 animate-pulse ${className}`}></div>;
};
export default SkeletonLoader;
