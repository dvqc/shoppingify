import Loader from "components/Loader";
import { useItem } from "hooks/queries";
import Info from "./Info";

const Details = ({ itemId }: { itemId: string }) => {
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
      <img src={itemData.image ?? ""} className="w-full rounded-xl"></img>
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
