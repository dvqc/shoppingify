import Loader from "components/Loader";
import { DetailsItemContext, SideBarContext } from "contexts";
import { useItem } from "hooks/queries";
import { useContext } from "react";
import Info from "./Info";

const Details = () => {
  const { itemId } = useContext(DetailsItemContext);
  const { setSideBarTab } = useContext(SideBarContext);

  const { data: itemData, error } = useItem(itemId);

  if (error) return <div>Failed to load</div>;
  if (!itemData)
    return (
      <div className="w-full h-full bg-white">
        <Loader></Loader>
      </div>
    );

  console.log(itemData);
  return (
    <div className="w-full h-full  px-10 py-8 flex flex-col bg-white hide-scroll">
      <button className="text-yellow1 text-sm font-bold w-fit" onClick={() => setSideBarTab("list")}>
        <span className="text-xl">&#8592;</span> back
      </button>
      <img src={itemData.image ?? ""} className="w-full rounded-xl mt-8"></img>
      <Info name="name">
        <h1 className="text-2xl font-medium text-dark2">{itemData.name}</h1>
      </Info>
      <Info name="category">
        <h2 className="text-xl font-medium text-dark2">{itemData.category.label}</h2>
      </Info>
      <Info name="note">
        <p className="text-base font-medium text-dark2">{itemData.note}</p>
      </Info>
    </div>
  );
};

export default Details;
