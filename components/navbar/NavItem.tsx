import Image from "next/image";
const NavItem = ({ link, text, svgPath }: { link: string; text: string; svgPath: string }) => {
  return (
    <li
      className="h-11 w-full flex justify-between  hover:bg-slate-100  transition ease-in duration-300 
    before:inline-block before:content-[''] before:h-full   before:rounded-r-md before:hover:bg-yellow-400
    before:w-[6px] before:transition before:ease-in before:duration-300"
    >
      <a href={link} className="w-full">
        <div className="flex justify-center items-center h-full">
          <Image width="20" height="16" src={svgPath} alt="" />
        </div>
      </a>
    </li>
  );
};

export default NavItem;
