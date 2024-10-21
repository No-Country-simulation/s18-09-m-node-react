"use client";
import { DashboardMenu } from "./DashboardMenu";
import { DashboardMenuItem } from "./DashboardMenuItem";

type DashboardItem = {
  value: string;
  href: string;
  selected: boolean;
};

type Props = {
  title: string;
  items: DashboardItem[];
} & React.ComponentProps<"div">;

export const Dashboard = ({ title, items, children }: Props) => {
  return (
    <div
      className="w-full h-full
                 min-h-screen
                 pt-[126px]
                 pl-[152px]"
    >
      <h1
        className="text-[#09090B]
                   font-roboto
                   font-[700]
                   text-[36px]"
      >
        {title}
      </h1>
      <DashboardMenu>
        {items.map((item) => (
          <div key={item.href}>
            <DashboardMenuItem value={item.value} href={item.href} />

            {item.selected && children}
          </div>
        ))}
      </DashboardMenu>
    </div>
  );
};
