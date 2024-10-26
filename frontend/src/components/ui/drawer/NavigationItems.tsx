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

export const NavigationItems = () => {
  return (
    <nav className="w-full py-[18px] px-[12px]">
      <NavHeader title="Perfil de usuario" />
      <NavLink
        href={"/profile/information"}
        title={"Información personal"}
        icon={<PersonalInfoIcon />}
      />
      <NavLink
        href={"/profile/configuration-preferences"}
        title={"Preferencias de configuración"}
        icon={<PreferencesIcon />}
      />
      <NavLink
        href={"/profile/usage-history"}
        title={"Historial de uso"}
        icon={<UsageHistoryIcon />}
      />
      <Divider />
      <NavHeader title="Estadísticas" />
      <NavLink
        href={"/statistics/summary"}
        title={"Resúmen de Productividad"}
        icon={<StatsSummaryIcon />}
      />
      <NavLink
        href={"/statistics/charts"}
        title={"Gráficos y Visualizaciones"}
        icon={<StatsCharsIcon />}
      />
      <NavLink
        href={"/statistics/export"}
        title={"Exportar Datos"}
        icon={<ExportIcon />}
      />
      <Divider />
      <NavHeader title="Configuración" />
      <NavLink
        href={"/settings/notifications"}
        title={"Notificaciones"}
        icon={<NotificationsIcon />}
      />
      <NavLink
        href={"/settings/security"}
        title={"Seguridad"}
        icon={<SecurityIcon />}
      />
      <NavLink
        href={"/settings/faq"}
        title={"Preguntas Frecuentes"}
        icon={<FaqIcon />}
      />
      <NavLink
        href={"/settings/tutorials-and-guides"}
        title={"Tutoriales y Guías"}
        icon={<GuidesIcon />}
      />
      <NavLink
        href={"/settings/contact-support"}
        title={"Contacto Soporte"}
        icon={<ContactSupportIcon />}
      />
    </nav>
  );
};
