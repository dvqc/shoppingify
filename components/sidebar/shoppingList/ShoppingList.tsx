import Loader from "components/Loader";
import { useReducer, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ListData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import AddItem from "./AddItem";
import ItemsList from "./ItemsList";
import NameInput from "./NameInput";

type listAction =
  | { type: "incrementQty"; index: number }
  | { type: "decrementQty"; index: number }
  | { type: "removeItem"; index: number }
  | { type: "changeName"; newName: string };

function listReducer(state: ListData, action: listAction): ListData {
  switch (action.type) {
    case "incrementQty": {
      const index = action.index;
      if (index >= 0 && index < state.listItems.length) return { ...state, qty: state.listItems[index].qty + 1 };
    }
    case "decrementQty": {
      const index = action.index;
      if (index >= 0 && index < state.listItems.length) return { ...state, qty: state.listItems[index].qty - 1 };
    }
    case "removeItem": {
      const index = action.index;
      if (index >= 0 && index < state.listItems.length)
        return { ...state, listItems: state.listItems.splice(index, 1) };
    }
    case "changeName": {
      return { ...state, name: action.newName };
    }
    default:
      throw new Error();
  }
}

const ShoppingList = () => {
  const { data: list, error } = useSWR<ListData>("/api/lists/active", fetcher);
  if (error) return <div>failed to load</div>;

  const { mutate } = useSWRConfig();
  const [listState, listDispatch] = useReducer(listReducer, list);
  const [isEditing, setIsEditing] = useState(true);

  const handleUpdate = () => {
    mutate("/api/lists/active", () => {});
  };
  return (
    <div className="w-full min-h-screen m-0 p-0 flex flex-col">
      {!list ? (
        <Loader></Loader>
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
              <NameInput disabled={list.listItems.length == 0} value={list.name}></NameInput>
            ) : (
              <div className="btn-group  ">
                <button className="btn bg-gray5 text-dark2">Cancel</button>
                <button className="btn bg-blue1 text-white">Complete</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingList;
