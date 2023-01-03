const PercentageBar = ({ percentage, label }: { percentage: number; label: string }) => {
  if (percentage > 100 || percentage < 0) return <div>Invalid percentage</div>;
  else {
    return (
      <div>
        <div className="flex justify-between flex-wrap w-full mb-2">
          <div className="text-sm text-black font-medium ">{label}</div>
          <div className="text-sm text-black font-medium ">{percentage + "%"}</div>
        </div>
        <div className="h-[6px] min-w-full rounded-full bg-gray4">
          <div className="h-full rounded-full bg-yellow1" style={{ maxWidth: percentage + "%" }}></div>
        </div>
      </div>
    );
  }
};

export default PercentageBar;
