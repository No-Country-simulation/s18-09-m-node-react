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

type Props = {
  toggleDrawer: () => void;
};

export const NavigationItems = ({ toggleDrawer }: Props) => {
  return (
    <nav className="w-full py-[18px] px-[12px]">
      <NavHeader title="Perfil de usuario" />
      <NavLink
        href={"/profile/information"}
        title={"Información personal"}
        icon={<PersonalInfoIcon />}
        toggleDrawer={toggleDrawer}
      />
      <NavLink
        href={"/profile/configuration-preferences"}
        title={"Preferencias de configuración"}
        icon={<PreferencesIcon />}
        toggleDrawer={toggleDrawer}
      />
      <NavLink
        href={"/profile/usage-history"}
        title={"Historial de uso"}
        icon={<UsageHistoryIcon />}
        toggleDrawer={toggleDrawer}
      />
      <Divider />
      <NavHeader title="Estadísticas" />
      <NavLink
        href={"/statistics/summary"}
        title={"Resúmen de Productividad"}
        icon={<StatsSummaryIcon />}
        toggleDrawer={toggleDrawer}
      />
      <NavLink
        href={"/statistics/charts"}
        title={"Gráficos y Visualizaciones"}
        icon={<StatsCharsIcon />}
        toggleDrawer={toggleDrawer}
      />
      <NavLink
        href={"/statistics/export"}
        title={"Exportar Datos"}
        icon={<ExportIcon />}
        toggleDrawer={toggleDrawer}
      />
      <Divider />
      <NavHeader title="Configuración" />
      <NavLink
        href={"/settings/notifications"}
        title={"Notificaciones"}
        icon={<NotificationsIcon />}
        toggleDrawer={toggleDrawer}
      />
      <NavLink
        href={"/settings/security"}
        title={"Seguridad"}
        icon={<SecurityIcon />}
        toggleDrawer={toggleDrawer}
      />
      <NavLink
        href={"/settings/faq"}
        title={"Preguntas Frecuentes"}
        icon={<FaqIcon />}
        toggleDrawer={toggleDrawer}
      />
      <NavLink
        href={"/settings/tutorials-and-guides"}
        title={"Tutoriales y Guías"}
        icon={<GuidesIcon />}
        toggleDrawer={toggleDrawer}
      />
      <NavLink
        href={"/settings/contact-support"}
        title={"Contacto Soporte"}
        icon={<ContactSupportIcon />}
        toggleDrawer={toggleDrawer}
      />
    </nav>
  );
};
