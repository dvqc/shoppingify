import { Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
Modal.setAppElement("#__next");

const CancelModal = ({
  onSubmit,
  isOpen,
  setIsOpen
}: {
  onSubmit: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // const submitModal = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  // };

  return (
    <Modal
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "1.5rem",
          width: "min(100%,30rem)",
          padding: "2rem 2.3rem"
        },
        overlay: {
          backgroundColor: "rgb(0, 0, 0, .2)"
        }
      }}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
          setIsOpen(false);
        }}
      >
        <h2 className="mb-4 text-2xl font-medium text-dark2">Are you sure you want to cancel this list?</h2>
        <div className="btn-group justify-end">
          <input className={`btn bg-red1 text-white w-24`} type="submit" value={"Yes"} />
          <button
            className={`btn bg-gray5 text-dark2 w-24`}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CancelModal;
