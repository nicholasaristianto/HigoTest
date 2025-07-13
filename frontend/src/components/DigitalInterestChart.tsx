"use client";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";

Chart.register(ArcElement, Tooltip, Legend);

export default function DigitalInterestChart() {
  const [data, setData] = useState<{ labels: string[]; counts: number[] }>({
    labels: [],
    counts: [],
  });

  useEffect(() => {
    axios.get("https://higotest-production.up.railway.app/api/customer/digital-interest-summary").then((res) => {
      setData({
        labels: res.data.map((d: any) => d._id),
        counts: res.data.map((d: any) => d.count),
      });
    });
  }, []);

  const chartData = {
    labels: data.labels,
    datasets: [{
      data: data.counts,
      backgroundColor: [
        "#6366F1", 
        "#ffa200ff", 
        "#10B981", 
        "#EF4444", 
        "#fd00dbff", 
        "#000000", 
        "#ffee00ff", 
        "#22D3EE", 
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
