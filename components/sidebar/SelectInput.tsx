import { useRef, useState } from "react";
import { afterAnimation } from "utils/helpers";

type Option = {
  text: string;
  value: string;
};

const SelectInput = ({
  id,
  name,
  placeholder,
  label,
  options
}: {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  options: Option[];
}) => {
  const [dropdownStatus, setDropdownStatus] = useState<"open" | "closed" | "closing">("closed");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Option>();
  const handleSelect = (option: Option) => {
    setSelected(option);
  };

  const showDropdown = () => {
    setDropdownStatus("open");
  };
  const hideDropdwon = () => {
    afterAnimation(dropdownRef, () => {
      setDropdownStatus("closed");
    });
    setDropdownStatus("closing");
  };

  return (
    <div className="input-group relative">
      <input
        type="text"
        id={id}
        name={name}
        className="input"
        placeholder={placeholder}
        onFocus={showDropdown}
        onBlur={hideDropdwon}
        value={selected?.text}
        required
      />
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div
        ref={dropdownRef}
        data-status={dropdownStatus}
        className={`${
          dropdownStatus == "closed"
            ? "hidden"
            : dropdownStatus == "closing"
            ? "animate-fade-out"
            : "block animate-fade-in"
        }
         w-full h-40 absolute top-32 bg-white rounded-xl shadow-base border-[1px] border-gray4  overflow-y-scroll`}
      >
        <ul className="py-2 px-2">
          {options.map((option, i) => (
            <li
              className="w-full px-6 py-2 text-lg font-medium text-gray1 rounded-xl
               cursor-pointer hover:text-dark2 hover:bg-gray5 transition-colors "
              key={i}
              onClick={() => handleSelect(option)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectInput;
