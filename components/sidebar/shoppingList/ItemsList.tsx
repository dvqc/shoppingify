import groupBy from "lodash.groupby";
import { ListData } from "types/prisma.types";
import Item from "./Item";

const ItemsList = ({ list, isEditing }: { list: ListData; isEditing: boolean }) => {
  const listByCategory = groupBy(list?.listItems, (list) => list.item.category.label);

  return (
    <>
      {(() => {
        let shoppingList = [];
        for (const [category, itemsByCategory] of Object.entries(listByCategory)) {
          shoppingList.push(
            <div key={category} className="m-0 p-0 ">
              <h3 className="text-sm font-medium text-gray1 mt-8 mb-4 ">{category}</h3>
              <ul>
                {itemsByCategory.map((item, i) => (
                  <Item key={item.id} listItem={item} isEditing={isEditing} />
                ))}
              </ul>
            </div>
          );
        }
        return shoppingList;
      })()}
    </>
  );
};
export default ItemsList;
