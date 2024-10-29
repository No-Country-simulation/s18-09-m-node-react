"use client";

import BarChart from "@/components/ui/charts/BarChart";
import PieChart from "@/components/ui/charts/PieChart";
import { Dashboard } from "@/components/ui/dashboard/Dashboard";

const Charts: React.FC = () => {
  const items = [
    {
      value: "Resumen de productividad",
      href: "/statistics/summary",
      selected: false,
    },
    {
      value: "Gráficos y visualizaciones",
      href: "/statistics/charts",
      selected: true,
    },
    { value: "Exportar datos", href: "/statistics/export", selected: false },
  ];
  return (
    <Dashboard title="Estadísticas" items={items}>
      <div className="flex w-full pl-[120px]">
        <PieChart />
        <div className="-translate-x-[110px]">
          <BarChart />
        </div>
      </div>
    </Dashboard>
  );
};

export default Charts;
