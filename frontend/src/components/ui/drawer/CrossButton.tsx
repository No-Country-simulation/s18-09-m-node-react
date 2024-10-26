import { CrossIcon } from "@/svg/navigator-drawer-icons";

type Props = {
  onClick: () => void;
};

export const CrossButton = ({ onClick }: Props) => {
  return (
    <button
      className="absolute
                 top-[13px]
                 right-[16.61px]
                 w-[45.39px]
                 h-[45.39px]
                 flex
                 justify-center
                 items-center
                 motion-reduce:transition-none
                 motion-reduce:hover:transform-none
                 duration-100
                 hover:text-[#19B69A]"
      onClick={onClick}
    >
      <CrossIcon />
    </button>
  );
};
