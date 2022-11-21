const NavItem = ({
  link,
  text,
  img
}: {
  link: string;
  text: string;
  img: string;
}) => {
  return (
    <li>
      <a href={link}> {text}</a>
    </li>
  );
};

export default NavItem;
