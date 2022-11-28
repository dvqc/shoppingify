const Loader = ({ size }: { size?: "s" | "m" | "l" | "xl" }) => {
  let length: number;
  switch (size) {
    case "s": {
      length = 6;
      break;
    }
    case "m": {
      length = 12;
      break;
    }
    case "l": {
      length = 24;
      break;
    }
    case "xl": {
      length = 48;
      break;
    }
    default:
      length = 12;
  }

  return (
    <div className="w-full h-full  flex overflow-hidden bg-none justify-center items-center">
      <div
        className={`h-${length} w-${length} border-solid border-2 border-t-transparent rounded-full animate-spin mt-${length} 
      border-yellow1`}
      ></div>
    </div>
  );
};

export default Loader;
