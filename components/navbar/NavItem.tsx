const NavItem = ({
  link,
  text,
  svg,
  onClick
}: {
  link: string;
  text: string;
  svg: JSX.Element;
  onClick?: () => void;
}) => {
  return (
    <li
      className="h-11 w-full flex justify-between  hover:bg-gray-100  transition ease-in duration-300 
    before:inline-block before:content-[''] before:h-full before:rounded-r-md before:hover:bg-yellow1
    before:w-[6px] before:transition before:ease-in before:duration-300"
    >
      <a href={link} className="w-full" onClick={onClick}>
        <div className="flex justify-center items-center h-full">{svg}</div>
      </a>
    </li>
  );
};

export default NavItem;
