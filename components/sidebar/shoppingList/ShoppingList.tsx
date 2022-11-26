import Loader from "components/Loader";
import { useState } from "react";
import useSWR from "swr";
import { ListData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import AddItem from "./AddItem";
import ItemsList from "./ItemsList";
import NameInput from "./NameInput";

const ShoppingList = () => {
  const { data: list, error } = useSWR<ListData>("/api/lists/active", fetcher);
  const [isEditing, setIsEditing] = useState(false);
  if (error) return <div>failed to load</div>;

  return (
    <div className="w-full h-full m-0 p-0 flex flex-col">
      <div className="w-full m-0 px-10 pt-8 grow">
        <AddItem></AddItem>
        <div className="m-0 p-0 w-full">
          {!list ? (
            <Loader></Loader>
          ) : (
            <>
              <h2 className="my-10 text-2xl font-bold text-dark2">{list.name}</h2>
              <ItemsList list={list} isEditing={isEditing}></ItemsList>
            </>
          )}
        </div>
      </div>
      <div className="w-full px-10 py-8 bg-white ">
        <NameInput disabled={!isEditing}></NameInput>
      </div>
    </div>
  );
};

export default ShoppingList;
