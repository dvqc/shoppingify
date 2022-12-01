import { useEffect, useRef, useState } from "react";
import { afterAnimation } from "utils/helpers";

const FadeInOut = ({
  children,
  show,
  fit,
  className = ""
}: {
  children: React.ReactNode;
  show: boolean;
  fit?: boolean;
  className?: string;
}) => {
  const [status, setStatus] = useState<"closed" | "closing" | "open">("closed");
  const ref = useRef<HTMLDivElement>(null);

  const conditionalStyle =
    status == "closed" ? "hidden" : status == "closing" ? "animate-fade-out" : "block animate-fade-in";

  useEffect(() => {
    if (!show) {
      if (status !== "closing") {
        afterAnimation(ref, () => {
          setStatus("closed");
        });

        setStatus("closing");
      }
    } else {
      setStatus("open");
    }
  }, [show]);
  return (
    <div ref={ref} className={`${fit ? "w-fit h-fit" : "w-full h-full"} m-0 p-0 ${conditionalStyle} ${className}`}>
      {children}
    </div>
  );
};
export default FadeInOut;
