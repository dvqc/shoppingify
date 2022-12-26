import { useRouter } from "next/router";
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
  const router = useRouter();
  const onpageStyle =
    "before:inline-block before:content-[''] before:h-full before:rounded-r-md before:bg-yellow1 before:w-[6px] bg-gray-100";
  return (
    <li
      className={`h-11 w-full flex justify-between  hover:bg-gray-100  transition ease-in duration-300 ${
        router.asPath === link ? onpageStyle : ""
      }`}
    >
      <a href={link} className="w-full" onClick={onClick}>
        <div className="flex justify-center items-center h-full">{svg}</div>
      </a>
    </li>
  );
};

export default NavItem;
