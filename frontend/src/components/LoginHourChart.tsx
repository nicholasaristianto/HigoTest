"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function LoginHourChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customer/login-hour-summary");
        const labels = res.data.map((item: any) => item._id);
        const counts = res.data.map((item: any) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Login Count",
              data: counts,
              backgroundColor: "#3B82F6",
              borderRadius: 6,
              barThickness: 40,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch login hour data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="card p-4 h-full">
      <div className="h-64 flex items-center justify-center">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
