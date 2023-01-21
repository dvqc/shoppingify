import SideBar from "components/sidebar";
import AddItemForm from "components/sidebar/addItem";
import { Details } from "components/sidebar/itemDetails/";
import ShoppingList from "components/sidebar/shoppingList";
import { DetailsItemContext, SideBarContext } from "contexts";
import { Fragment, useState } from "react";
import { SideBarStates } from "types/app";

const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  const [sideBarTab, setSideBarTab] = useState<SideBarStates>("list");
  const [itemId, setItemId] = useState("x");
  return (
    <Fragment>
      <DetailsItemContext.Provider value={{ itemId, setItemId }}>
        <SideBarContext.Provider value={{ sideBarTab, setSideBarTab }}>
          <div className="md:pr-96">
            <main className="lg:px-20 px-5">{children}</main>
          </div>
          <SideBar show={sideBarTab}>
            <AddItemForm key={"add"}></AddItemForm>
            <Details key={"info"}></Details>
            <ShoppingList key={"list"}></ShoppingList>
          </SideBar>
        </SideBarContext.Provider>
      </DetailsItemContext.Provider>
    </Fragment>
  );
};

export default SideBarLayout;
