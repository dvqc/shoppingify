import SideBar from "components/sidebar";
import AddItemForm from "components/sidebar/addItem";
import Details from "components/sidebar/itemDetails/Details";
import ShoppingList from "components/sidebar/shoppingList";
import { SideBarContext } from "contexts";
import { useState } from "react";
import { SideBarStates } from "types/app";

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  const [sideBarTab, setSideBarTab] = useState<SideBarStates>("list");

  return (
    <>
      <SideBarContext.Provider value={{ sideBarTab, setSideBarTab }}>
        {children}
        <SideBar show={sideBarTab}>
          <AddItemForm key={"add"}></AddItemForm>
          <Details key={"info"}></Details>
          <ShoppingList key={"list"}></ShoppingList>
        </SideBar>
      </SideBarContext.Provider>
    </>
  );
};

export default SideBarLayout;
