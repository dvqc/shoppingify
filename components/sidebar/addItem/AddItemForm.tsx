import ErrMsg from "components/ErrMsg";
import { DetailsItemContext, SideBarContext } from "contexts";
import { useCreateItem } from "hooks/mutations";
import { useCategories } from "hooks/queries";
import { useContext, useState } from "react";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

const AddItemForm = () => {
  const { setSideBarTab } = useContext(SideBarContext);
  const { setItemId } = useContext(DetailsItemContext);
  const { data: cateogries, error } = useCategories();
  const [formError, setFormError] = useState<string>();
  const createItem = useCreateItem();

  return (
    <form
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          name: { value: string };
          note: { value: string };
          image: { value: string };
          category: { value: string };
        };
        try {
          const item = await createItem({
            name: target.name.value,
            note: target.note.value,
            image: target.image.value,
            category: { label: target.category.value }
          });
          setItemId(item.id);
          setSideBarTab("info");
        } catch (e: any) {
          setFormError(e.message?.message);
        }
      }}
      className="w-full h-full  px-10 py-8 flex flex-col bg-white"
    >
      <h2 className="text-2xl font-medium">Add a new item</h2>

      <TextInput id="name" name="name" placeholder="Enter a name" label="Name" isRequired={true}></TextInput>

      <TextArea id="note" name="note" placeholder="Enter a note" label={"Note (optional)"}></TextArea>

      <TextInput
        id="image"
        name="image"
        placeholder="Enter a url"
        label="Image (optional)"
        isRequired={false}
      ></TextInput>

      <SelectInput
        id="category"
        name="category"
        placeholder="Enter a category"
        label="Category"
        options={
          cateogries
            ? cateogries.map((cat) => {
                return { text: cat.label, value: cat.label };
              })
            : []
        }
      />

      {formError && formError.length > 0 ? <ErrMsg message={formError} /> : <></>}

      <div className="btn-group mt-auto mb-0">
        <button
          className="btn text-dark2 bg-gray5"
          onClick={(e) => {
            e.preventDefault();
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
