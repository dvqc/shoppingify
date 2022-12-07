import ShoppingList from "./shoppingList";

const SideBar = () => {
  return (
    <div className="w-96 max-h-screen sticky top-0 right-0 bg-orange1 overflow-hidden">
      <ShoppingList></ShoppingList>
      {/* <div className="animate-slide-in  z-10 absolute -left-full top-0 right-0 w-full">
        <AddItemForm></AddItemForm>
      </div> */}
    </div>
  );
};
export default SideBar;
