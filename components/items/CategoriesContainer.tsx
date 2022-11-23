import ItemsContainer from "./ItemsContainer";

const CategoriesContainer = ({ categories }: { categories: string[] }) => {
  return (
    <div className="w-full m-0 p-0">
      {categories.map((category, i) => (
        <ItemsContainer key={i} category={category}></ItemsContainer>
      ))}
    </div>
  );
};

export default CategoriesContainer;
