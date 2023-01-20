import { ReactNode } from "react";

const HistoryContainer = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full">
      <h1 className="text-dark2 font-bold text-2xl mt-6 mb-10">Shopping History</h1>
      {children}
    </div>
  );
};

export default HistoryContainer;
