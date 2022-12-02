const Loader = ({
  height,
  width
}: {
  height?: "h-12" | "h-24" | "h-48" | "h-64";
  width?: "w-12" | "w-24" | "w-48" | "w-64";
}): JSX.Element => {
  return (
    <div className="w-full h-full  flex overflow-hidden bg-none justify-center items-center">
      <div
        className={`${!height ? "h-12 " : height} ${
          !width ? "w-12 " : width
        } border-solid border-2 border-t-yellow-400 rounded-full animate-spin 
      border-yellow1 mt-20`}
      ></div>
    </div>
  );
};

export default Loader;
