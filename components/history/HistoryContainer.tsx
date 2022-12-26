import { ReactNode } from "react";

const HistoryContainer = ({ children }: { children?: ReactNode }) => {
  return (
    <main className="grow px-20 bg-gray5">
      <h1 className="text-dark2 font-bold text-2xl mt-6 mb-10">Shopping History</h1>
      {children}
    </main>
  );
};

export default HistoryContainer;
