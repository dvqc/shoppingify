import { useEffect, useRef, useState } from "react";
import { SideBarStates } from "types/app";

const SideBar = ({ show, children }: { show: SideBarStates; children: JSX.Element[] }) => {
  const [hide, setHide] = useState(false);
  const shouldAnimate = useRef(false);
  useEffect(() => {
    setHide(false);
    shouldAnimate.current = true;
  }, [show]);

  return (
    <div className="w-96 h-screen sticky top-0 right-0 bg-orange1 ">
      {children.map((child) =>
        child.key == show ? (
          <div
            key={child.key}
            className={`${shouldAnimate.current ? "animate-slide-in" : ""} absolute z-10 top-0 right-0 w-full h-full `}
            onAnimationEnd={() => setHide(true)}
          >
            {child}
          </div>
        ) : (
          <div key={child.key} className={`absolute z-0 top-0 right-0 w-full ${hide ? "hidden" : ""}`}>
            {child}
          </div>
        )
      )}
    </div>
  );
};
export default SideBar;
