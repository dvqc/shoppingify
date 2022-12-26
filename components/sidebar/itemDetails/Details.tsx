import ErrMsg from "components/ErrMsg";
import Loader from "components/Loader";
import { DetailsItemContext, SideBarContext } from "contexts";
import { useAddItemToActiveList, useDeleteItem } from "hooks/mutations";
import { useItem } from "hooks/queries";
import { useContext, useEffect, useState } from "react";
import Info from "./Info";

const Details = () => {
  const { itemId } = useContext(DetailsItemContext);
  const { setSideBarTab } = useContext(SideBarContext);
  const { data: itemData, error } = useItem(itemId);
  const [errorMessage, setErrorMessage] = useState<string>();

  const addItem = useAddItemToActiveList(itemId);
  const deleteItem = useDeleteItem();

  useEffect(() => {
    setErrorMessage("");
  }, [itemId]);
  if (error) return <div></div>;
  if (!itemData)
    return (
      <div className="w-full h-full bg-white">
        <Loader></Loader>
      </div>
    );

  return (
    <div className="w-full h-full min-h-screen px-10 py-8 flex flex-col bg-white hide-scroll">
      <button className="text-yellow1 text-sm font-bold w-fit" onClick={() => setSideBarTab("list")}>
        <span className="text-xl">&#8592;</span> back
      </button>
      <img src={itemData.image ?? ""} className="w-full h-56 object-contain rounded-xl mt-8"></img>
      <Info label="name">
        <h1 className="text-2xl font-medium text-dark2">{itemData.name}</h1>
      </Info>
      <Info label="category">
        <h2 className="text-xl font-medium text-dark2">{itemData.category.label}</h2>
      </Info>
      <Info label="note">
        <p className="text-base font-medium text-dark2">{itemData.note}</p>
      </Info>

      <div className="mb-6">{errorMessage && errorMessage.length > 0 ? <ErrMsg message={errorMessage} /> : <></>}</div>

      <div className="btn-group mt-auto mb-0">
        <button
          onClick={async (e) => {
            e.preventDefault();
            setErrorMessage("");
            try {
              await deleteItem(itemId);
              setSideBarTab("list");
            } catch (err: any) {
              setErrorMessage(err.message?.message);
            }
          }}
          className="btn text-dark2 bg-gray5"
        >
          Delete
        </button>
        <button
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            setErrorMessage("");
            await addItem().catch((err) => {
              console.log(err.message);
              setErrorMessage(err.message?.message);
            });
          }}
          className="btn text-white bg-yellow1"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Details;
