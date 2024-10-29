import { PreferencesIcon } from "@/svg/navigator-drawer-icons";
import { UnderConstruction } from "../UnderConstruction";

export const ConfigPreferences = () => {
  return (
    <div className="md:w-[930px] w-full px-[102px]">
      <div
        className="w-[340px] h-[40px]
                   flex
                   justify-center
                   items-center
                   gap-5"
      >
        <div className="text-[#09BCB4]">
          <PreferencesIcon />
        </div>
        <h2
          className="w-full
                     text-[20px]
                     tracking-[1px]
                     text-[#0859A3]"
        >
          Preferencias de configuración
        </h2>
      </div>

      <div className="pt-[44px]">
        <UnderConstruction />
      </div>
    </div>
  );
};
