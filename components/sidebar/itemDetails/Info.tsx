import { ReactNode } from "react";

const Info = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="my-8">
      <div className="text-base text-gray3 font-medium mb-3">{label}</div>
      {children}
    </div>
  );
};
export default Info;
