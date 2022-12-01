import { ListItemUpdateBody, ListUpdateBody } from "types/prisma.types";
import { fetcher } from "./helpers";

const updateList = async (url: string, payload: ListUpdateBody) => {
  await fetcher(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).catch((err) => console.log(err));
};


const updateListItem = async (url: string, payload: ListItemUpdateBody) =>
  await fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).catch((err) => console.log(err));

export { updateList, updateListItem };
