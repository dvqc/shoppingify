import { useEffect, useState } from "react";
import { SideBarStates } from "types/app";

const SideBar = ({ show, children }: { show: SideBarStates; children: JSX.Element[] }) => {
  const [hide, setHide] = useState(false);
  const [previousShow, setPreviousShow] = useState<SideBarStates>();
  useEffect(() => {
    setHide(false);
  }, [show]);
  return (
    <div className="md:w-96 md:ml-0 md:fixed md:block hidden w-full h-screen top-0 right-0 bg-orange1 ">
      {children.map((child) =>
        child.key == show ? (
          <div
            key={child.key}
            className={`md:absolute ${"animate-slide-in"}  z-10 top-0 right-0 w-full h-full `}
            onAnimationEnd={() => setPreviousShow(show)}
          >
            {child}
          </div>
        ) : (
          <div
            key={child.key}
            className={`md:absolute z-0 top-0 right-0 w-full animate-slide-out ${
              hide ? "hidden" : child.key === previousShow ? "" : "hidden"
            } `}
            onAnimationEnd={() => setHide(true)}
          >
            {child}
          </div>
        )
      )}
    </div>
  );
};
export default SideBar;
