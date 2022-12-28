import SideBar from "components/sidebar";
import AddItemForm from "components/sidebar/addItem";
import { Details } from "components/sidebar/itemDetails/";
import ShoppingList from "components/sidebar/shoppingList";
import { DetailsItemContext, SideBarContext } from "contexts";
import { useState } from "react";
import { SideBarStates } from "types/app";

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  const [sideBarTab, setSideBarTab] = useState<SideBarStates>("list");
  const [itemId, setItemId] = useState("x");
  return (
    <>
      <DetailsItemContext.Provider value={{ itemId, setItemId }}>
        <SideBarContext.Provider value={{ sideBarTab, setSideBarTab }}>
          <main className="grow px-20 bg-gray5">{children}</main>
          <SideBar show={sideBarTab}>
            <AddItemForm key={"add"}></AddItemForm>
            <Details key={"info"}></Details>
            <ShoppingList key={"list"}></ShoppingList>
          </SideBar>
        </SideBarContext.Provider>
      </DetailsItemContext.Provider>
    </>
  );
};

export default SideBarLayout;
