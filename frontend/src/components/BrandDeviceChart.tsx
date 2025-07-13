"use client";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";

Chart.register(ArcElement, Tooltip, Legend);

export default function BrandDeviceChart() {
  const [data, setData] = useState<{ labels: string[]; counts: number[] }>({
    labels: [],
    counts: [],
  });

  useEffect(() => {
    axios.get("https://higotest-production.up.railway.app/api/customer/brand-device-summary").then((res) => {
      setData({
        labels: res.data.map((b: any) => b._id),
        counts: res.data.map((b: any) => b.count),
      });
    });
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [{
      data: data.counts,
      backgroundColor: [
        "#FF6384", 
        "#36A2EB", 
        "#FFCE56", 
        "#4BC0C0", 
        "#9966FF", 
        "#FF9F40", 
        "#00A86B",
        "#C71585",
        "#8B0000", 
        "#008080",
      ],
      borderWidth: 0,
      hoverOffset: 8,
    }],
  };

  const options = {
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          padding: 16,
          font: { family: "Inter" },
        },
      },
    },
    maintainAspectRatio: false,
    cutout: "65%",
  };

  return (
    <div className="card p-4 h-full">
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
