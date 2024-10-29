"use client";

import { useEffect } from "react";

const PieChart: React.FC = () => {
  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.google.com/jsapi";
      script.type = "text/javascript";
      script.onload = () => {
        // @ts-expect-error Google Charts API not typed in TypeScript
        google.load("visualization", "1", {
          packages: ["corechart"],
          callback: drawChart,
        });
      };
      document.head.appendChild(script);
    };

    const drawChart = () => {
      // @ts-expect-error Google Charts API not typed in TypeScript
      const data = google.visualization.arrayToDataTable([
        ["Task", "Percentage"],
        ["Tiempos de trabajo", 87.5],
        ["Tiempos de pausa", 12.5],
      ]);

      const options = {
        title: "Productividad Diaria",
        is3D: true,
        colors: ["#4EA5F6", "#19B69A"],
        legend: {
          position: "right",
          alignment: "end",
          textStyle: {
            fontSize: 14, // Ajusta el tamaño de las etiquetas de la leyenda
          },
        },
        titleTextStyle: {
          fontName: "Arial",
          fontSize: 15, // Tamaño del título
          bold: true,
        },
      };

      // @ts-expect-error Google Charts API not typed in TypeScript
      const chart = new google.visualization.PieChart(
        document.getElementById("piechart_3d")
      );
      chart.draw(data, options);
    };

    loadGoogleCharts();
  }, []);

  return <div id="piechart_3d" className="w-[650px] h-80"></div>;
};

export default PieChart;
