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
      {isRequired ? (
        <input type="text" id={id} name={name} className="input" placeholder={placeholder} required />
      ) : (
        <input type="text" id={id} name={name} className="input" placeholder={placeholder} />
      )}
      <label htmlFor={name} className="label">
        {label}
      </label>
    </div>
  );
};

export default TextInput;
