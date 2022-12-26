import { ReactNode } from "react";

const Empty = ({ classname, children }: { classname?: string; children?: ReactNode }) => {
  return (
    <div className={`flex h-full w-full justify-center items-center ${classname}`}>
      <div className="text-xl text-gray-400">{children ?? "Nothing to show"}</div>
    </div>
  );
};

export default Empty;
