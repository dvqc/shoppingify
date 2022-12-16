import { Reducer } from "react";
import { AddItemFormActionI } from "types/app";
import { ItemCreateBody } from "types/prisma";

export const addItemInitialState: ItemCreateBody = {
    name: "",
    note: "",
    image: "",
    category: {
      label: ""
    }
  };

export const addItemFormReducer: Reducer<ItemCreateBody, AddItemFormActionI> = (state, action) => {
    if (action.type === "reset") {
      return addItemInitialState;
    }
    if (action.type === "category")
      return {
        ...state,
        category: { label: action.value }
      };
    const result = { ...state };
    result[action.type] = action.value;
    return result;
  };