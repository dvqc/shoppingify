import FadeInOut from "components/FadeInOut";
import {SkeletonLoader} from "components/loader";
import { useActiveListExpanded, useListItemByRelIds } from "hooks/queries";
import { useEffect, useState } from "react";
import { ListItemData } from "types/prisma";
import { removeItemFromActiveList, updateListItem } from "utils/fetch-helpers";
import CheckBox from "./CheckBox";
import QuantityBtn from "./QuantityBtn";

const Item = ({ listItem, isEditing }: { listItem: ListItemData; isEditing: boolean }) => {
  const listId = listItem.list.id;
  const itemId = listItem.item.id;
  const { data: listItemData, error, mutate } = useListItemByRelIds(listId, itemId);
  const { mutate: mutateActiveList } = useActiveListExpanded();

  const [itemChecked, setItemChecked] = useState(false);

  const checkItem = () => {
    setItemChecked(!itemChecked);
  };

  useEffect(() => {
    if (isEditing && itemChecked) setItemChecked(false);
  }, [isEditing]);

  if (error) {
    return <div className="text-base font-bold text-red1">Failed to load data</div>;
  }
  if (!listItemData) return <SkeletonLoader className="h-8 my-4 bg-orange-200"></SkeletonLoader>;

  return (
    <li key={listItem.id} className="my-4 max-h-min flex flex-row basis-10 items-center flex-wrap">
      <FadeInOut className="w-fit h-fit" show={!isEditing}>
        <CheckBox onChange={checkItem} isChecked={itemChecked}></CheckBox>
      </FadeInOut>
      <div className={`text-lg font-medium text-black ${itemChecked ? "line-through" : ""}`}>{listItem.item.name}</div>
      <QuantityBtn
        qty={listItemData.qty}
        isEditing={isEditing}
        onRemove={async () => await mutateActiveList(removeItemFromActiveList(listItem.id))}
        setQty={(qty: number) =>
          mutate(updateListItem(listItem.id, { qty: qty }), {
            optimisticData: { ...listItemData, qty: qty },
            rollbackOnError: true
          })
        }
      ></QuantityBtn>
    </li>
  );
};
export default Item;
