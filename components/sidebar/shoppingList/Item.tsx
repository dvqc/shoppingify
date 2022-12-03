import FadeInOut from "components/FadeInOut";
import Loader from "components/Loader";
import { useEffect, useState } from "react";
import useSwr, { useSWRConfig } from "swr";
import { ListItemData } from "types/prisma.types";
import { updateListItem } from "utils/api-helpers";
import { fetcher } from "utils/helpers";
import { getListItemKey } from "utils/swr-keys";
import CheckBox from "./CheckBox";
import QuantityBtn from "./QuantityBtn";

const Item = ({ listItem, isEditing }: { listItem: ListItemData; isEditing: boolean }) => {
  const listItemKey = getListItemKey(listItem.id);
  const { data: listItemData, error } = useSwr<ListItemData>(listItemKey, fetcher);
  const { mutate } = useSWRConfig();
  const [itemChecked, setItemChecked] = useState(false);

  const checkItem = () => {
    setItemChecked(!itemChecked);
  };

  useEffect(() => {
    if (isEditing && itemChecked) setItemChecked(false);
  }, [isEditing]);

  if (error) return <div>Failed to load data</div>;
  if (!listItemData) return <Loader></Loader>;

  return (
    <li key={listItem.id} className="my-4 max-h-min flex flex-row basis-10 items-center flex-wrap">
      <FadeInOut className="w-fit h-fit" show={!isEditing}>
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
