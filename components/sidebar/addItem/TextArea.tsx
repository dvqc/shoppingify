import { FC } from "react";
import { TextAreaProps } from "types/app";

const TextArea: FC<TextAreaProps> = ({ id, name, placeholder, label, value, onChange }) => {
  return (
    <div className="input-group">
      <textarea
        id={id}
        name={name}
        className="input pt-4 h-28 "
        rows={5}
        cols={40}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
};
export default TextArea;
