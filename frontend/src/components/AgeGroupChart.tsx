"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import axios from "axios";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AgeGroupChart() {
  const [ageData, setAgeData] = useState<{ range: string; count: number }[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/customer/age-summary").then((res) => {
      setAgeData(res.data);
    });
  }, []);

  const chartData = {
    labels: ageData.map((d) => d.range),
    datasets: [
      {
        label: "Jumlah Customer",
        data: ageData.map((d) => d.count),
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="card p-4 h-full flex justify-center items-center">
        <div className="h-64 w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
