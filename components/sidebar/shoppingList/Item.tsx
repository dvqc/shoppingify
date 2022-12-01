import FadeInOut from "components/FadeInOut";
import Loader from "components/Loader";
import { useEffect, useState } from "react";
import useSwr, { useSWRConfig } from "swr";
import { ListItemData, ListItemUpdateBody } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import { getListItemKey } from "utils/swrKeys";
import CheckBox from "./CheckBox";
import QuantityBtn from "./QuantityBtn";

const Item = ({ listItem, isEditing }: { listItem: ListItemData; isEditing: boolean }) => {
  const listItemKey = getListItemKey(listItem.id);
  const { data: listItemData, error } = useSwr<ListItemData>(listItemKey, fetcher);
  const { mutate } = useSWRConfig();

  const updateListItem = async (url: string, payload: ListItemUpdateBody) =>
    await fetcher(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

  const [itemChecked, setItemChecked] = useState(false);

  const checkItem = () => {
    setItemChecked(!itemChecked);
  };

  if (error) return <div>Failed to load data</div>;
  if (!listItemData) return <Loader></Loader>;

  useEffect(() => {
    if (isEditing && itemChecked) setItemChecked(false);
  }, [isEditing]);

  return (
    <li key={listItem.id} className="my-4 max-h-min flex flex-row basis-10 items-center flex-wrap">
      <FadeInOut fit={true} show={!isEditing}>
        <CheckBox onChange={checkItem} isChecked={itemChecked}></CheckBox>
      </FadeInOut>
      <div className={`text-lg font-medium text-black ${itemChecked ? "line-through" : ""}`}>{listItem.item.name}</div>
      <QuantityBtn
        qty={listItemData.qty}
        isEditing={isEditing}
        setQty={(qty: number) =>
          mutate(listItemKey, updateListItem(listItemKey, { qty: qty }), {
            optimisticData: { ...listItemData, qty: qty },
            rollbackOnError: true
          })
        }
      ></QuantityBtn>
    </li>
  );
};
export default Item;
