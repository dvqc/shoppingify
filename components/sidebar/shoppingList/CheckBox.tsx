const CheckBox = ({ onChange, isChecked }: { onChange: () => void; isChecked: boolean }) => {
  return (
    <label className="flex mr-4 cursor-pointer">
      <input className="hidden" type="checkbox" onChange={onChange} checked={isChecked} />
      <span className="h-6 w-6 inline-block relative border-2 border-yellow1 rounded-[4px]"></span>
    </label>
  );
};

export default CheckBox;
