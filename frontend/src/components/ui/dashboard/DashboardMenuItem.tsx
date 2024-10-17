import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

type Props = {
  value: string;
  href: string;
};

export const DashboardMenuItem = memo(({ value, href }: Props) => {
  return (
    <div
      className="w-[255px]
                 py-[6px]
                 px-[6px]
                 flex
                 items-center
                 min-h-[36px]
                 gap-x-2.5"
    >
      <Link
        href={href}
        className="flex
                   items-center
                   text-[14px]
                   font-[400]
                   font-inter
                   w-full
                   gap-x-2.5"
      >
        <span>{value}</span>
        <div
          className="h-4 w-4
                     flex
                     items-center"
        >
          <ChevronRight />
        </div>
      </Link>
    </div>
  );
});
