import { useReducer, useState } from "react";
import { ListData } from "types/prisma.types";
import AddItem from "./AddItem";
import ItemsList from "./ItemsList";
import NameInput from "./NameInput";

const ShoppingList = ({ list }: { list: ListData }) => {
  const [isEditing, setIsEditing] = useState(true);

  console.log(list);

  return (
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
            onSave={(newName: string) => console.log(newName)}
          ></NameInput>
        ) : (
          <div className="btn-group  ">
            <button className="btn bg-gray5 text-dark2">Cancel</button>
            <button className="btn bg-blue1 text-white">Complete</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingList;
