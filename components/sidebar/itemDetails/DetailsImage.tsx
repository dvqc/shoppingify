import { SkeletonLoader } from "components/loader";
import Image from "next/image";
import { useState } from "react";

const DetailsImage = ({ src }: { src?: string | null }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className="w-full min-h-[14rem] rounded-xl mt-8 bg-slate-50 relative">
      {isLoading && <SkeletonLoader />}
      {isError && <Image src="/images/placeholder.svg" alt="fallback" layout="fill" objectFit="cover" />}
      <Image
        src={src ?? ""}
        objectPosition=""
        layout="fill"
        objectFit="cover"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setIsError(true);
        }}
      />
    </div>
  );
};

export default DetailsImage;
