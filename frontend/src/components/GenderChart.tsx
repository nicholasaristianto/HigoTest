"use client";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";

Chart.register(ArcElement, Tooltip, Legend);

export default function GenderChart() {
  const [data, setData] = useState<{ labels: string[]; counts: number[] }>({
    labels: [],
    counts: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/customer/summary").then((res) => {
      const genderData = res.data.genderCount || [];
      setData({
        labels: genderData.map((d: any) => d._id),
        counts: genderData.map((d: any) => d.count),
      });
    });
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [{
      data: data.counts,
      backgroundColor: ["#EF4444", "#3B82F6"],
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
