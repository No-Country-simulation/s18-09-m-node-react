import { NotificationsIcon } from "@/svg/navigator-drawer-icons";
import { UnderConstruction } from "../UnderConstruction";

export const Notifications = () => {
  return (
    <div className="md:w-[930px] w-full px-[102px]">
      <div
        className="w-[310px] h-[40px]
                   flex
                   justify-center
                   items-center
                   gap-5"
      >
        <div className="text-[#09BCB4]">
          <NotificationsIcon />
        </div>
        <h2
          className="w-full
                     text-[20px]
                     tracking-[1px]
                     text-[#0859A3]"
        >
          Notificaciones
        </h2>
      </div>

      <div className="pt-[44px]">
        <UnderConstruction />
      </div>
    </div>
  );
};
