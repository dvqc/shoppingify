import useSWR from "swr";
import { CategoryData } from "types/prisma.types";
import { fetcher } from "utils/helpers";
import { getCategoriesKey } from "utils/swr-keys";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

const AddItemForm = () => {
  const { data: cateogries, error } = useSWR<CategoryData[]>(getCategoriesKey, fetcher);
  // const handleSubmit = (e: FormEvent) => {
  // TODO.....
  // return;
  // };
  return (
    <form className="w-full h-full m-0 px-10 py-8 flex flex-col bg-white">
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

      <div className="btn-group mt-auto mb-0">
        <button onClick={(e) => e.preventDefault()} className="btn text-dark2 bg-gray5">
          Cancel
        </button>
        <button type="submit" onClick={(e) => e.preventDefault()} className="btn text-white bg-yellow1">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
