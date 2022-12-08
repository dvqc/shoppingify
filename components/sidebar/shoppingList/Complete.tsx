const Complete = ({ onComplete, onCancel }: { onComplete: () => void; onCancel: () => void }) => {
  return (
    <div className="btn-group">
      <button onClick={onCancel} className="btn bg-gray5 text-dark2">
        Cancel
      </button>
      <button onClick={onComplete} className="btn bg-blue1 text-white">
        Complete
      </button>
    </div>
  );
};
export default Complete;
