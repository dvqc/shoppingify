import { useRef, useState } from "react";
import { afterAnimation } from "utils/helpers";

const QuantityBtn = ({
  qty,
  setQty,
  isEditing
}: {
  qty: number;
  setQty: (qty: number) => Promise<any>;
  isEditing: boolean;
}) => {
  const [btnGrpStatus, setBtnGrpStatus] = useState<"open" | "closed" | "closing">("closed");
  const deleteRef = useRef<HTMLButtonElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const minusRef = useRef<HTMLButtonElement>(null);

  const toggleBtnGrp = () => {
    if (isEditing)
      if (btnGrpStatus == "open") hideBtnGrp();
      else showBtnGrp();
  };

  const conditionalStyle =
    btnGrpStatus == "closed" ? "hidden" : btnGrpStatus == "closing" ? "animate-fade-out" : "block animate-fade-in";

  const showBtnGrp = () => {
    setBtnGrpStatus("open");
  };

  const hideBtnGrp = () => {
    if (btnGrpStatus !== "closing") {
      afterAnimation(deleteRef, () => {
        setBtnGrpStatus("closed");
      });
      afterAnimation(addRef, () => {
        setBtnGrpStatus("closed");
      });
      afterAnimation(minusRef, () => {
        setBtnGrpStatus("closed");
      });
      setBtnGrpStatus("closing");
    }
  };

  return (
    <div
      className={`h-10 flex flex-row mr-0 ml-auto bg-none text-xs font-bold  rounded-xl
    ${btnGrpStatus == "closed" ? "" : "bg-white ease-in duration-200"}`}
    >
      <button
        ref={deleteRef}
        className={`w-8 bg-[url('/images/delete.svg')] bg-yellow1 bg-no-repeat bg-[length:60%_60%] 
    bg-center rounded-xl ${conditionalStyle}`}
      ></button>
      <button
        ref={minusRef}
        className={`w-8 bg-[url('/images/minus.svg')]  bg-no-repeat bg-[length:60%_60%] bg-center ${conditionalStyle}`}
        onClick={() => {
          if (qty > 1) {
            setQty(qty - 1);
          }
        }}
      ></button>
      <button
        onClick={toggleBtnGrp}
        className={`w-14 text-yellow1  
    border-yellow1 border-2 rounded-3xl ${btnGrpStatus == "closing" ? "animate-fade-out" : "block animate-fade-in"}
    `}
      >
        {qty}
        {" pcs"}
      </button>
      <button
        ref={addRef}
        onClick={() => {
          setQty(qty + 1);
        }}
        className={`w-8 bg-[url('/images/addPcs.svg')]  bg-no-repeat bg-[length:60%_60%] bg-center ${conditionalStyle}`}
      ></button>
    </div>
  );
};

export default QuantityBtn;
