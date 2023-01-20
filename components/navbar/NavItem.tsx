import Link from "next/link";
import { useRouter } from "next/router";
const NavItem = ({ link, svg, onClick }: { link: string; svg: JSX.Element; onClick?: () => void }) => {
  const router = useRouter();
  const onpageStyle =
    "before:inline-block before:content-[''] before:h-full before:rounded-r-md before:bg-yellow1 before:w-[6px] bg-gray-100";
  return (
    <li
      className={`h-11 w-full flex hover:bg-gray-100 transition ease-in duration-300 ${
        router.asPath.includes(link) ? onpageStyle : ""
      }`}
    >
      <Link href={link}>
        <div onClick={onClick} className="grow w-full h-full flex justify-center items-center hover:cursor-pointer">
          {svg}
        </div>
      </Link>
    </li>
  );
};

export default NavItem;
