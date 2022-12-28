const BackBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="text-yellow1 text-sm font-bold w-fit" onClick={onClick}>
      <span className="text-xl">&#8592;</span> back
    </button>
  );
};

export default BackBtn;
