"use client";

import { Dashboard } from "@/components/ui/dashboard/Dashboard";

export default function StatisticsPage() {
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
    { value: "Exportar datos", href: "/statistics/export", selected: false },
  ];

  return <Dashboard title="Estadísticas" items={items}></Dashboard>;
}
