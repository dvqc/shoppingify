const SkeletonLoader = ({ className }: { className?: string }) => {
  return <div className={`${className ?? ""} skeleton`}></div>;
};
export default SkeletonLoader;
