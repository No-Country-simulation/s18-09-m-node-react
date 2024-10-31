import {
  ContactSupportIcon,
  ExportIcon,
  FaqIcon,
  GuidesIcon,
  NotificationsIcon,
  PersonalInfoIcon,
  PreferencesIcon,
  SecurityIcon,
  StatsCharsIcon,
  StatsSummaryIcon,
  UsageHistoryIcon,
} from "@/svg/navigator-drawer-icons";
import { NavHeader } from "./NavHeader";
import { NavLink } from "./NavLink";
import { Divider } from "./Divider";
import { appStore } from "@/store";

type Props = {
  toggleDrawer: () => void;
};

export const NavigationItems = ({ toggleDrawer }: Props) => {
  const modalSettings = appStore((state) => state.modalSettings);
  const setModalSettings = appStore((state) => state.setModalSettings);

  const controlDisplay = (value: string) => {
    toggleDrawer();
    setModalSettings({
      ...modalSettings,
      [value]: true,
    });
  };

  return (
    <nav className="w-full py-[18px] px-[12px]">
      <NavHeader title="Perfil de usuario" />
      <NavLink
        title={"Información personal"}
        icon={<PersonalInfoIcon />}
        controlDisplay={() => controlDisplay("profileInfo")}
      />
      <NavLink
        title={"Preferencias de configuración"}
        icon={<PreferencesIcon />}
        controlDisplay={() => controlDisplay("configPreferences")}
      />
      <NavLink
        title={"Historial de uso"}
        icon={<UsageHistoryIcon />}
        controlDisplay={() => controlDisplay("usageHistory")}
      />
      <Divider />
      <NavHeader title="Estadísticas" />
      <NavLink
        title={"Resúmen de Productividad"}
        icon={<StatsSummaryIcon />}
        controlDisplay={() => controlDisplay("statsSummary")}
      />
      <NavLink
        title={"Gráficos y Visualizaciones"}
        icon={<StatsCharsIcon />}
        controlDisplay={() => controlDisplay("statsChars")}
      />
      <NavLink
        title={"Exportar Datos"}
        icon={<ExportIcon />}
        controlDisplay={() => controlDisplay("export")}
      />
      <Divider />
      <NavHeader title="Configuración" />
      <NavLink
        title={"Notificaciones"}
        icon={<NotificationsIcon />}
        controlDisplay={() => controlDisplay("notifications")}
      />
      <NavLink
        title={"Seguridad"}
        icon={<SecurityIcon />}
        controlDisplay={() => controlDisplay("security")}
      />
      <NavLink
        title={"Preguntas Frecuentes"}
        icon={<FaqIcon />}
        controlDisplay={() => controlDisplay("faq")}
      />
      <NavLink
        title={"Tutoriales y Guías"}
        icon={<GuidesIcon />}
        controlDisplay={() => controlDisplay("tutorialsAndGuides")}
      />
      <NavLink
        title={"Contacto Soporte"}
        icon={<ContactSupportIcon />}
        controlDisplay={() => controlDisplay("supportContact")}
      />
    </nav>
  );
};
