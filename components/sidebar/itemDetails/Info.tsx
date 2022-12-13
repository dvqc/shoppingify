import { ReactNode } from "react";

const Info = ({ name, children }: { name: string; children: ReactNode }) => {
  return (
    <div className="my-8">
      <div className="text-base text-gray3 font-medium mb-3">{name}</div>
      {children}
    </div>
  );
};
export default Info;
