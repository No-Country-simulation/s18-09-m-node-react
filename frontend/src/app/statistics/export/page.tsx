import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const Export: React.FC = () => {
  const items = [
    {
      value: "Resumen de productividad",
      href: "/statistics/summary",
      selected: false,
    },
    {
      value: "Gráficos y visualizaciones",
      href: "/statistics/charts",
      selected: false,
    },
    { value: "Exportar datos", href: "/statistics/export", selected: true },
  ];

  return (
    <Dashboard title="Estadísticas" items={items}>
      <h1>Exportar Datos</h1>
    </Dashboard>
  );
};

export default Export;
