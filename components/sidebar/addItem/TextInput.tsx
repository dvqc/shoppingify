import { FC } from "react";
import { InputProps } from "types/app";

const TextInput: FC<InputProps> = ({ label, id, name, placeholder, required, onChange, value }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        id={id}
        name={name}
        className="input"
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
};

export default TextInput;
