import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart() {
  const labels = ["December", "January", "February", "March", "April", "May"];

  const data = {
    labels,
    datasets: [
      {
        label: "Hours Spent",
        data: [10, 15, 13, 20, 14, 18],
        borderRadius: 10,
        backgroundColor: "#6366F1", // Indigo Tailwind color
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      y: {
        ticks: { color: "#6B7280" },
        grid: { color: "#E5E7EB" },
      },
      x: {
        ticks: { color: "#6B7280" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border mt-6">
      <h3 className="font-semibold text-gray-800 mb-4">Hours Spent</h3>
      <Bar data={data} options={options} height={180} />
    </div>
  );
}
