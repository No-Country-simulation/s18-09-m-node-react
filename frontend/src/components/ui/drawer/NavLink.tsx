import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  title: string;
  icon: JSX.Element;
  toggleDrawer: () => void;
};

export const NavLink = ({ href, title, icon, toggleDrawer }: Props) => {
  return (
    <Link href={href} className="w-full" onClick={toggleDrawer}>
      <div
        className="h-[56px] px-[16px]
                   flex gap-[12px]
                   items-center
                   text-[#4A4459]
                   transition
                   motion-reduce:transition-none
                   motion-reduce:hover:transform-none
                   duration-100
                   hover:text-[#19B69A]"
      >
        {icon}
        <h2
          className="h-[20px]
                       text-[14px]
                       font-roboto
                       font-semibold
                       tracking-[0.1px]"
        >
          {title}
        </h2>
      </div>
    </Link>
  );
};
