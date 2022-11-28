import Loader from "components/Loader";
import useSWR, { useSWRConfig } from "swr";
import { ListDataExpanded } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import ShoppingList from "./ShoppingList";

const ShoppingListContainer = () => {
  const { data: list, error } = useSWR<ListDataExpanded>("/api/lists/active?expand=true", fetcher);
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
