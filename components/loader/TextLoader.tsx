import SkeletonLoader from "./SkeletonLoader";

const TextLoader = ({ rowNumber }: { rowNumber?: number }) => {
  const rows = rowNumber ? Array(rowNumber).fill(0) : Array(5).fill(0);
  return (
    <>
      {rows.map((row, i) => (
        <SkeletonLoader className={`h-2 mb-2 ${i == rows.length - 1 ? "w-5/6" : ""}`}></SkeletonLoader>
      ))}
    </>
  );
};

export default TextLoader;
