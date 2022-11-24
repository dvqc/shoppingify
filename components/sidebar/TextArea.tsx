const TextArea = ({
  id,
  name,
  placeholder,
  label
}: {
  id: string;
  name: string;
  placeholder: string;
  label: string;
}) => {
  return (
    <div className="input-group">
      <textarea id={id} name={name} className="input pt-4 h-28 " rows={5} cols={40} placeholder={placeholder} />
      <label htmlFor="note" className="label">
        {label}
      </label>
    </div>
  );
};
export default TextArea;
