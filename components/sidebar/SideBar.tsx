import { useEffect, useState } from "react";
import { SideBarStates } from "types/app";

const SideBar = ({ show, children }: { show: SideBarStates; children: JSX.Element[] }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(false);
  }, [show]);

  return (
    <div className="w-96 max-h-screen sticky top-0 right-0 bg-orange1 hide-scroll">
      {children.map((child) => {
        console.log(child.sideBarId);
        return <></>;
      })}
    </div>
  );
};
export default SideBar;
