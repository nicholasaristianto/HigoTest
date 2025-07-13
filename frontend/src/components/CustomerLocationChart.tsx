"use client";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

Chart.register(ArcElement, Tooltip, Legend);

export default function CustomerLocationChart() {
  const [locationData, setLocationData] = useState({ labels: [], counts: [] });

  const fetchData = async () => {
    try {
      const res = await axios.get("https://higotest-production.up.railway.app/api/customer/location-summary");
      const data = res.data;
      setLocationData({
        labels: Object.keys(data),
        counts: Object.values(data),
      });
    } catch (err) {
      console.error("Failed to fetch location summary", err);
    }
  };

  useEffect(() => {
    fetchData();
    // const interval = setInterval(fetchData, 5000);
    // return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: locationData.labels,
    datasets: [
      {
        data: locationData.counts,
        backgroundColor: [
          "#60a5fa", "#f472b6", "#34d399", "#facc15", "#c084fc", "#f97316",
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 16,
          font: {
            family: 'Inter',
          },
        },
      },
    },
    cutout: '65%',
    maintainAspectRatio: false,
  };

  return (
    <div className="card p-4 h-full">
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
