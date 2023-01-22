import SideBar from "components/sidebar";
import AddItemForm from "components/sidebar/addItem";
import { Details } from "components/sidebar/itemDetails/";
import ShoppingList from "components/sidebar/shoppingList";
import { DetailsItemContext, ScreenContext, SideBarContext } from "contexts";
import { Fragment, useContext, useEffect, useState } from "react";
import { SideBarStates } from "types/app";
import { MIN_WIDTH } from "utils/constants";

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  const [sideBarTab, setSideBarTab] = useState<SideBarStates>("list");
  const [sideBarShown, setSideBarShown] = useState(false);
  const [itemId, setItemId] = useState("x");
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    if (typeof window != "undefined")
      if (window.innerWidth) {
        setScreenWidth(window.innerWidth);
        if (window.innerWidth >= MIN_WIDTH) setSideBarShown(true);
      }
  }, []);

  return (
    <Fragment>
      <DetailsItemContext.Provider value={{ itemId, setItemId }}>
        <SideBarContext.Provider value={{ sideBarShown, setSideBarShown, sideBarTab, setSideBarTab }}>
          <ScreenContext.Provider value={{ width: screenWidth }}>
            <SideBar show={sideBarTab}>
              <AddItemForm key={"add"}></AddItemForm>
              <Details key={"info"}></Details>
              <ShoppingList key={"list"}></ShoppingList>
            </SideBar>
            <div className="md:pr-96">
              <main className="lg:px-20 px-5">{children}</main>
            </div>
            <div
              className={`md:hidden fixed flex items-center justify-center font-bold text-xl text-white
            z-20 w-8 h-8 top-1/2 right-5 shadow-base rounded-full  cursor-pointer 
            ${sideBarShown ? "rotate-180 ease-in-out duration-300  bg-red1" : "ease-in-out duration-300 bg-blue1"}`}
              onClick={() => {
                setSideBarShown(!sideBarShown);
              }}
            >
              {"<"}
            </div>
          </ScreenContext.Provider>
        </SideBarContext.Provider>
      </DetailsItemContext.Provider>
    </Fragment>
  );
};

export default SideBarLayout;
