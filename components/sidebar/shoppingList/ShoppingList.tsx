import Loader from "components/Loader";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ListDataExpanded, ListUpdateBody } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import { getActiveListKey, getListKey } from "utils/swrKeys";
import FadeInOut from "../../FadeInOut";
import AddItem from "./AddItem";
import ItemsList from "./ItemsList";
import NameInput from "./NameInput";

const ShoppingList = () => {
  const actvieListKey = getActiveListKey({ expand: true });
  const { data: list, error } = useSWR<ListDataExpanded>(actvieListKey, fetcher);
  const { mutate } = useSWRConfig();
  const [isEditing, setIsEditing] = useState(false);

  const updateListName = async (url: string, payload: ListUpdateBody) => {
    await fetcher(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  };

  if (error) return <div>failed to load</div>;

  return (
    <div className="w-full min-h-screen m-0 p-0 flex flex-col">
      {!list ? (
        <div className="h-screen">
          <Loader height="h-24" width="w-24"></Loader>
        </div>
      ) : (
        <>
          <div className="w-full m-0 px-10 pt-8 grow">
            <AddItem></AddItem>
            <div className="m-0 p-0 w-full">
              <div className="w-full flex flex-row justify-between">
                <h2 className="my-10 text-2xl font-bold text-dark2">{list.name}</h2>
                <button className="w-8" onClick={() => setIsEditing(!isEditing)}>
                  Edit
                </button>
              </div>
              <ItemsList list={list} isEditing={isEditing}></ItemsList>
            </div>
          </div>
          <div className="w-full h-28 px-10 py-8 bg-white mb-0 mt-auto relative">
            {/* {isEditing ? ( */}
            <div className="absolute w-full h-full bottom-0 right-0">
              <FadeInOut show={isEditing}>
                <NameInput
                  disabled={list.listItems.length == 0}
                  value={list.name}
                  onSave={async (newName: string) => {
                    await mutate(
                      actvieListKey,
                      updateListName(getListKey(list.id), {
                        name: newName
                      })
                    );
                    setIsEditing(false);
                  }}
                ></NameInput>
              </FadeInOut>
            </div>
            {/* ) : ( */}
            <div className="absolute w-full h-full  bottom-0 right-0">
              <FadeInOut show={!isEditing}>
                <div className="btn-group">
                  <button className="btn bg-gray5 text-dark2">Cancel</button>
                  <button className="btn bg-blue1 text-white">Complete</button>
                </div>
              </FadeInOut>
            </div>
            {/* )} */}
          </div>
        </>
      )}{" "}
    </div>
  );
};

export default ShoppingList;
