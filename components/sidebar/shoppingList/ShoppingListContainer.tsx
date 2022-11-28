import Loader from "components/Loader";
import useSWR, { useSWRConfig } from "swr";
import { ListData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import ShoppingList from "./ShoppingList";

const ShoppingListContainer = () => {
  const { data: list, error } = useSWR<ListData>("/api/lists/active", fetcher);
  const { mutate } = useSWRConfig();

  const handleUpdate = () => {
    mutate("/api/lists/active", () => {});
  };

  if (error) return <div>failed to load</div>;

  return (
    <div className="w-full min-h-screen m-0 p-0 flex flex-col">
      {!list ? <Loader></Loader> : <ShoppingList list={list}></ShoppingList>}
    </div>
  );
};

export default ShoppingListContainer;
