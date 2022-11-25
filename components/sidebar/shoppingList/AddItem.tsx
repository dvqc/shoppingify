const AddItem = () => {
  return (
    <div className="w-full py-4 px-4  flex bg-purple1 rounded-3xl relative">
      <img className="absolute -top-4 w-3/5" src="/images/bottle.svg" alt="bottle" />
      <div className="pl-32">
        <p className="text-base font-bold text-white">Didn't find what you need?</p>
        <button className="mt-3 px-6 py-3 btn text-dark2 text-sm bg-white shadow-base">Add item</button>
      </div>
    </div>
  );
};

export default AddItem;
