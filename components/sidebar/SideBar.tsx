import { useEffect, useState } from "react";
import { SideBarStates } from "types/app";

const SideBar = ({ show, children }: { show: SideBarStates; children: JSX.Element[] }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(false);
  }, [show]);

  return (
    <div className="w-96 h-screen sticky top-0 right-0 bg-orange1 ">
      {children.map((child) =>
        child.props["data-sidebarid"] == show ? (
          <div className="animate-slide-in absolute w-full h-full" onAnimationEnd={() => setHide(true)}>
            {child}
          </div>
        ) : (
          <div className={`absolute  top-0 right-0 w-full ${hide ? "hidden" : ""}`}>{child}</div>
        )
      )}
    </div>
  );
};
export default SideBar;
