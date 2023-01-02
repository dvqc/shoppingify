import { useEffect, useState } from "react";

const ErrMsg = ({ errMessage }: { errMessage?: string }) => {
  const [message, setMessage] = useState(errMessage);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    setMessage(errMessage);
    setHide(false);
  }, [errMessage]);

  if (!message || message.length == 0) return <></>;

  setTimeout(() => setHide(true), 5000);
  return (
    <div
      className={`bg-red1 text-white text-lg font-bold mt-6 px-4 py-2 rounded-xl shadow-xl ${
        hide ? "animate-fade-out" : ""
      }`}
      onAnimationEnd={() => {
        setMessage("");
      }}
    >
      {message}!
    </div>
  );
};
export default ErrMsg;
