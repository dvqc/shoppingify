import { useRef, useState } from "react";
import { afterAnimation } from "utils/helpers";

const FadeInOut = ({
  children,
  show,
  className = ""
}: {
  children: React.ReactNode;
  show: boolean;
  className?: string;
}) => {
  // const [isShow, setIsShow] = useState(show);
  const [status, setStatus] = useState<"closed" | "closing" | "open">(!show ? "closing" : "open");
  const ref = useRef<HTMLDivElement>(null);

  const conditionalStyle =
    status == "closed" ? "hidden" : status == "closing" ? "animate-fade-out" : "block animate-fade-in";

  if (status == "closing")
    afterAnimation(ref, () => {
      setStatus("closed");
    });

  return (
    <div ref={ref} className={`w-full h-full m-0 p-0 ${conditionalStyle} ${className}`}>
      {children}
    </div>
  );
};
export default FadeInOut;
