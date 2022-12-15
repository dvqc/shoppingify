const TextInput = ({
  id,
  name,
  placeholder,
  label,
  isRequired = false
}: {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  isRequired?: boolean;
}) => {
  return (
    <div className="input-group">
      <input
        type="text"
        id={id}
        name={name}
        className="input"
        placeholder={placeholder}
        required={isRequired}
        autoComplete="off"
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
};

export default TextInput;
