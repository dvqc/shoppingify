import ErrMsg from "components/ErrMsg";
import { HeaderLoader, TextLoader } from "components/loader";
import SkeletonLoader from "components/loader/SkeletonLoader";
import { DetailsItemContext, SideBarContext } from "contexts";
import { useAddItemToActiveList, useDeleteItem } from "hooks/mutations";
import { useItem } from "hooks/queries";
import { useContext, useEffect, useState } from "react";
import BackBtn from "./BackBtn";
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

  return (
    <div className="w-full h-full min-h-screen px-10 py-8 flex flex-col bg-white hide-scroll">
      {!itemData ? (
        <>
          <SkeletonLoader className="h-56 my-10"></SkeletonLoader>
          <HeaderLoader></HeaderLoader>
          <HeaderLoader></HeaderLoader>
          <TextLoader rowNumber={10}></TextLoader>
        </>
      ) : (
        <>
          <BackBtn onClick={() => setSideBarTab("list")}></BackBtn>
          <img src={itemData.image ?? ""} className="w-full h-56 object-cover rounded-xl mt-8"></img>
          <Info label="name">
            <h1 className="text-2xl font-medium text-dark2">{itemData.name}</h1>
          </Info>
          <Info label="category">
            <h2 className="text-xl font-medium text-dark2">{itemData.category.label}</h2>
          </Info>
          <Info label="note">
            <p className="text-base font-medium text-dark2">{itemData.note}</p>
          </Info>

          <div className="mb-6">
            {errorMessage && errorMessage.length > 0 ? <ErrMsg message={errorMessage} /> : <></>}
          </div>

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
        </>
      )}
    </div>
  );
};

export default Details;
