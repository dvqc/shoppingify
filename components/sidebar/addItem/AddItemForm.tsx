import ErrMsg from "components/errors/ErrMsg";
import { DetailsItemContext, SideBarContext } from "contexts";
import { useCreateItem } from "hooks/mutations";
import { useCategories } from "hooks/queries";
import { ChangeEvent, useContext, useReducer, useState } from "react";
import { addItemFormReducer, addItemInitialState } from "utils/reducers";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

const AddItemForm = () => {
  const { setSideBarTab } = useContext(SideBarContext);
  const { setItemId } = useContext(DetailsItemContext);
  const { data: cateogries } = useCategories();
  const categoryOptions = cateogries ? cateogries.map((category) => category.label) : [];
  const [formError, setFormError] = useState<string>();
  const [formData, dispatchFormAction] = useReducer(addItemFormReducer, addItemInitialState);
  const createItem = useCreateItem();

  const reset = () => {
    dispatchFormAction({ type: "reset", value: "" });
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    try {
      const item = await createItem(formData);
      reset();
      setItemId(item.id);
      setSideBarTab("info");
    } catch (err: any) {
      setFormError(err.message?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full min-h-screen px-10 py-8 flex flex-col bg-white">
      <h2 className="text-2xl font-medium">Add a new item</h2>

      <TextInput
        placeholder="Enter a name"
        label="Name"
        required={true}
        value={formData.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatchFormAction({ type: "name", value: e.target.value })}
      ></TextInput>

      <TextArea
        id="note"
        name="note"
        placeholder="Enter a note"
        label={"Note (optional)"}
        value={formData.note ?? ""}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatchFormAction({ type: "note", value: e.target.value })}
      ></TextArea>

      <TextInput
        id="image"
        name="image"
        placeholder="Enter a url"
        label="Image (optional)"
        required={false}
        value={formData.image ?? ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatchFormAction({ type: "image", value: e.target.value })}
      ></TextInput>

      <SelectInput
        id="category"
        name="category"
        placeholder="Enter a category"
        label="Category"
        value={formData.category.label}
        options={categoryOptions}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatchFormAction({ type: "category", value: e.target.value })}
        onOption={(newValue) => dispatchFormAction({ type: "category", value: newValue })}
      />

      <ErrMsg errMessage={formError} />

      <div className="btn-group mb-0 mt-auto">
        <button
          className="btn text-dark2 bg-gray5"
          onClick={(e) => {
            e.preventDefault();
            reset();
            setSideBarTab("list");
          }}
        >
          Cancel
        </button>
        <button type="submit" className="btn text-white bg-yellow1">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
