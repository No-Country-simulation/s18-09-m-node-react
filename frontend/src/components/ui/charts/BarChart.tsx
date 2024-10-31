"use client";

import { useEffect } from "react";

const BarChart: React.FC = () => {
  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.type = "text/javascript";
      script.onload = () => {
        // @ts-expect-error Google Charts API not typed in TypeScript
        google.charts.load("current", { packages: ["corechart"] });
        // @ts-expect-error Google Charts API not typed in TypeScript
        google.charts.setOnLoadCallback(drawChart);
      };
      document.head.appendChild(script);
    };

    const drawChart = () => {
      // @ts-expect-error Google Charts API not typed in TypeScript
      const data = google.visualization.arrayToDataTable([
        ["Mes", "Promedio Pausas", "Promedio Trabajo"],
        ["Enero 2024", 1.5, 6.5],
        ["Febrero 2024", 2, 6],
        ["Marzo 2024", 1.8, 6.2],
        ["Abril 2024", 2.2, 5.8],
        ["Mayo 2024", 1.7, 6.3],
        ["Junio 2024", 2.5, 5.5],
      ]);

      const options = {
        title: "Productividad Semestral",
        titleTextStyle: {
          fontName: "Arial",
          fontSize: 15, // Asegúrate que tenga el mismo tamaño que el PieChart
          bold: true,
        },
        legend: {
          position: "right",
          alignment: "end",
          textStyle: {
            fontSize: 14, // Ajusta el tamaño de las etiquetas de la leyenda
          },
        },
        chartArea: { width: "70%", height: "70%" },
        vAxis: {
          title: "",
          minValue: 0,
          maxValue: 8,
          ticks: [0, 2, 4, 6, 8],
        },
        hAxis: {
          title: "",
        },
        colors: ["#19B69A", "#4EA5F6"],
        bars: "vertical",
        bar: { groupWidth: "50%" },
        isStacked: false,
      };

      // @ts-expect-error Google Charts API not typed in TypeScript
      const chart = new google.visualization.ColumnChart(
        document.getElementById("barchart_vertical")
      );
      chart.draw(data, options);
    };

    loadGoogleCharts();
  }, []);

  return (
    <div className="flex justify-start items-center h-80">
      <div id="barchart_vertical" className="w-[850px] h-full"></div>
    </div>
  );
};

export default BarChart;
