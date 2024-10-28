type Props = {
  title: string;
  icon: JSX.Element;
  controlDisplay: () => void;
};

export const NavLink = ({ title, icon, controlDisplay }: Props) => {
  return (
    <button
      className="h-[56px] px-[16px]
                 flex gap-[12px]
                 items-center
                 text-[#4A4459]
                 transition
                 motion-reduce:transition-none
                 motion-reduce:hover:transform-none
                 duration-100
                 hover:text-[#19B69A]"
      onClick={controlDisplay}
    >
      <span
        className="text-[#09090B] 
                   ransition duration-200
                   group-hover:text-[#19B69A]"
      >
        {icon}
      </span>
      <h2
        className="h-[20px]
                   text-[14px]
                   font-roboto
                   font-semibold
                   tracking-[0.1px]"
      >
        {title}
      </h2>
    </button>
  );
};
