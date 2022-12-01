import FadeInOut from "components/FadeInOut";
import { useEffect, useState } from "react";

const QuantityBtn = ({
  qty,
  setQty,
  isEditing
}: {
  qty: number;
  setQty: (qty: number) => Promise<any>;
  isEditing: boolean;
}) => {
  const [showBtnGrp, setShowBtnGrp] = useState(false);

  const toggleBtnGrp = () => {
    if (isEditing) setShowBtnGrp(!showBtnGrp);
  };

  useEffect(() => {
    if (!isEditing) setShowBtnGrp(false);
  }, [isEditing]);
  return (
    <div
      className={`h-10 flex flex-row mr-0 ml-auto bg-none text-xs font-bold  rounded-xl
    ${!showBtnGrp ? "bg-transparent ease-in duration-200" : "bg-white ease-in duration-200"}`}
    >
      <FadeInOut show={showBtnGrp} fit={true}>
        <button
          className={`w-8 h-10 bg-[url('/images/delete.svg')] bg-yellow1 bg-no-repeat bg-[length:60%_60%] 
    bg-center rounded-xl`}
        ></button>
      </FadeInOut>
      <FadeInOut show={showBtnGrp} fit={true}>
        <button
          className={`w-8 h-10  bg-[url('/images/minus.svg')]  bg-no-repeat bg-[length:60%_60%] bg-center`}
          onClick={() => {
            if (qty > 1) {
              setQty(qty - 1);
            }
          }}
        ></button>
      </FadeInOut>
      <button
        onClick={toggleBtnGrp}
        className={`w-14 text-yellow1  
    border-yellow1 border-2 rounded-3xl 
    `}
      >
        {qty}
        {" pcs"}
      </button>
      <FadeInOut show={showBtnGrp} fit={true}>
        <button
          onClick={() => {
            setQty(qty + 1);
          }}
          className={`w-8 h-10 bg-[url('/images/addPcs.svg')]  bg-no-repeat bg-[length:60%_60%] bg-center`}
        ></button>
      </FadeInOut>
    </div>
  );
};

export default QuantityBtn;
