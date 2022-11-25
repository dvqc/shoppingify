import useSWR from "swr";
import { ListData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import AddItem from "./AddItem";
import EmptyList from "./EmptyList";
import NameInput from "./NameInput";

const ShoppingList = () => {
  const { data: list, error } = useSWR<ListData>("/api/lists/active", fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <div className="w-full h-full m-0 p-0 flex flex-col">
      <div className="w-full m-0 px-10 pt-8 grow">
        <AddItem></AddItem>
        {!list ? <EmptyList></EmptyList> : list.name}
      </div>

      <div className="w-full px-10 py-8 bg-white ">
        <NameInput disabled></NameInput>
      </div>
    </div>
  );
};

export default ShoppingList;
