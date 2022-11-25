const NameInput = ({ disabled = false }: { disabled?: boolean }) => {
  return (
    <div className="btn-group">
      <div className="w-full h-full  relative">
        <input
          disabled={disabled}
          type="text"
          placeholder="Enter a name"
          className=" h-full w-full px-4 absolute z-0 rounded-xl border-2 text-base text-dark2 font-medium
        outline-none bg-white border-yellow1 placeholder:text-gray4
        disabled:border-gray3 "
        />
        <button
          disabled={disabled}
          className="btn h-full absolute right-0 z-10  text-white bg-yellow1 disabled:bg-gray3"
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default NameInput;
