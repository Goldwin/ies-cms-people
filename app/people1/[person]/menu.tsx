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
  {
    name: "Activity",
    link: "/activity",
  },
];

export const PersonMenu = ({ id, focus }: { id: string; focus?: string }) => {
  return (
    <section className="col-start-1 col-end-2 items-center justify-center gap-4 py-4 md:py-10 px-4 h-full">
      <div className="gap-4 flex flex-col">
        {menuList.map((menu) => (
          <Link
            key={menu.name}
            href={`/people/${id}${menu.link}`}
            color="foreground"
            underline={menu.name === focus ? "always" : "none"}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </section>
  );
};
