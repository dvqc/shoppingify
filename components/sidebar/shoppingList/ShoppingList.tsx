import Loader from "components/Loader";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ListDataExpanded, ListUpdateBody } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import { getListKey } from "utils/swrKeys";
import AddItem from "./AddItem";
import ItemsList from "./ItemsList";
import NameInput from "./NameInput";

const ShoppingList = () => {
  const { data: list, error } = useSWR<ListDataExpanded>("/api/lists/active?expand=true", fetcher);
  const { mutate } = useSWRConfig();
  const [isEditing, setIsEditing] = useState(true);

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
          <Loader size="l"></Loader>
        </div>
      ) : (
        <>
          <div className="w-full m-0 px-10 pt-8 grow">
            <AddItem></AddItem>
            <div className="m-0 p-0 w-full">
              <h2 className="my-10 text-2xl font-bold text-dark2">{list.name}</h2>
              <ItemsList list={list} isEditing={isEditing}></ItemsList>
            </div>
          </div>
          <div className="w-full px-10 py-8 bg-white mb-0 mt-auto">
            {isEditing ? (
              <NameInput
                disabled={list.listItems.length == 0}
                value={list.name}
                onSave={(newName: string) =>
                  mutate(
                    "/api/lists/active?expand=true",
                    updateListName(getListKey(list.id), {
                      name: newName
                    }),
                    {
                      optimisticData: { ...list, name: newName },
                      rollbackOnError: true
                    }
                  )
                }
              ></NameInput>
            ) : (
              <div className="btn-group  ">
                <button className="btn bg-gray5 text-dark2">Cancel</button>
                <button className="btn bg-blue1 text-white">Complete</button>
              </div>
            )}
          </div>
        </>
      )}{" "}
    </div>
  );
};

export default ShoppingList;
