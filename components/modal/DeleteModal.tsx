import Router from "next/router";
import {
  forwardRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef
} from "react";
import styles from "styles/Modal.module.scss";

const DeleteModal = forwardRef<HTMLDialogElement, { id: string }>(
  ({ id }, ref) => {
    const localRef = useRef<HTMLDialogElement | null>(null);

    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      // todo ...
      closeModal(localRef, () => {
        return;
      });
      Router.reload();
    };

    useEffect(() => {
      if (typeof ref != "function" && ref?.current)
        localRef.current = ref?.current;
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
                closeModal(localRef, () => {
                  return;
                });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

const afterAnimation = (ref: RefObject<HTMLElement>, callback: () => void) => {
  ref.current?.addEventListener("animationend", callback, {
    once: true
  });
};

const closeModal = (
  ref: MutableRefObject<HTMLDialogElement | null>,
  cleanUpFunc: () => void
) => {
  ref.current?.setAttribute("closing", "");
  afterAnimation(ref, () => {
    ref.current?.removeAttribute("closing");
    ref.current?.close();
  });
  cleanUpFunc();
};

export default DeleteModal;
