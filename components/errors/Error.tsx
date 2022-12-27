const Error = ({ errMsg }: { errMsg: string }) => {
  return (
    <div className="flex justify-center items-center grow h-full">
      <div className="text-red1 font-medium text-2xl">{errMsg}</div>
    </div>
  );
};
export default Error;
