import Router from "next/router";
import { forwardRef, MutableRefObject, useEffect, useRef } from "react";
import styles from "styles/Modal.module.scss";
import { afterAnimation } from "utils/helpers";

const DeleteModal = forwardRef<HTMLDialogElement, { id: string }>(({ id }, ref) => {
  const localRef = useRef<HTMLDialogElement | null>(null);

  const closeModal = (ref: MutableRefObject<HTMLDialogElement | null>, cleanUpFunc?: () => void) => {
    ref.current?.setAttribute("closing", "");
    afterAnimation(ref, () => {
      ref.current?.removeAttribute("closing");
      ref.current?.close();
    });
    if (cleanUpFunc) cleanUpFunc();
  };
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // todo ...
    closeModal(localRef, () => {
      return;
    });
    Router.reload();
  };

  useEffect(() => {
    if (typeof ref != "function" && ref?.current) localRef.current = ref?.current;
  }, [ref]);

  return (
    <dialog ref={ref} className={styles["modal"]}>
      <form onSubmit={submitData}>
        <h2>Are you sure you that want to cancel this list?</h2>
        <div>
          <input className={styles["delete"]} type="submit" value="Delete" />
          <button
            onClick={(e) => {
              e.preventDefault();
              closeModal(localRef);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default DeleteModal;
