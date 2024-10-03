import { Link } from "@nextui-org/link";

interface Menu {
  name: string;
  link: string;
}

const menuList: Menu[] = [
  {
    name: "Profile",
    link: "",
  },
];

export const PersonMenu = ({ id, focus }: { id: string; focus?: string }) => {
  return (
    <div className="gap-4 flex flex-col mx-5">
      {menuList.map((menu) => (
        <Link
          key={menu.name}
          href={`/people/${id}/${menu.link}`}
          color="foreground"
          underline={menu.name === focus ? "always" : "none"}
        >
          {menu.name}
        </Link>
      ))}
    </div>
  );
};
