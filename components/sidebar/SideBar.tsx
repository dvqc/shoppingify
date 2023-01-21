import { ScreenContext, SideBarContext } from "contexts";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { SideBarStates } from "types/app";

const SideBar = ({ show, children }: { show: SideBarStates; children: JSX.Element[] }) => {
  const { sideBarShown, setSideBarShown } = useContext(SideBarContext);
  const { width } = useContext(ScreenContext);
  const MIN_WIDTH = 768;

  const [hideTab, setHideTab] = useState(false);
  const [hideSidebar, sethideSidebar] = useState(false);
  const [previousShow, setPreviousShow] = useState<SideBarStates>();
  const route = useRouter().route;

  useEffect(() => {
    setHideTab(false);
  }, [show]);

  useEffect(() => {
    if (width < MIN_WIDTH) {
      if (hideSidebar) sethideSidebar(!sideBarShown);
      if (sideBarShown) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "scroll";
    }
  }, [sideBarShown]);

  useEffect(() => {
    if (width < MIN_WIDTH) setSideBarShown(false);
  }, [route]);

  return (
    <div
      className={`md:w-96 md:ml-0 md:left-auto md:block fixed h-screen left-24 top-0 right-0 bg-orange1
    ${sideBarShown ? "animate-fade-in" : "animate-fade-out"} ${hideSidebar ? "hidden" : ""}`}
      onAnimationEnd={() => {
        sethideSidebar(!sideBarShown);
      }}
    >
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
              hideTab ? "hidden" : child.key === previousShow ? "" : "hidden"
            } `}
            onAnimationEnd={() => setHideTab(true)}
          >
            {child}
          </div>
        )
      )}
    </div>
  );
};
export default SideBar;
