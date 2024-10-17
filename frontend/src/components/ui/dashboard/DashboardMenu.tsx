"use client";

type Props = React.ComponentProps<"div">;

export const DashboardMenu = ({ children }: Props) => {
  return (
    <aside
      className="w-full
                 h-full
                 mt-[39px]"
    >
      {children}
    </aside>
  );
};
