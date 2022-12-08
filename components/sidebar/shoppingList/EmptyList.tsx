const EmptyList = () => {
  return (
    <div className="bg-none grow m-0 p-0 h-full relative flex justify-center items-center text-dark2 text-xl font-bold">
      No items
      <img className="absolute bottom-0 w-3/4" src="/images/shopping.svg" alt="bottle" />
    </div>
  );
};

export default EmptyList;
