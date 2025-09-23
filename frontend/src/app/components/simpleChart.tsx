"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import GlowCard from "./glowcard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SimpleChart({
  labels,
  values,
  title,
}: {
  labels: string[];
  values: number[];
  title?: string;
}) {
  const data = {
    labels,
    datasets: [
      {
        label: "Energía (W)",
        data: values,
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title || "Lectura de energía generada",
        color: "#fff",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Tiempo",
          color: "#fff",
        },
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Energía (W)",
          color: "#fff",
        },
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
    },
  };

  return (
    <GlowCard className="w-full p-4 bg-background rounded-4xl shadow-md mt-8">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full">
        <Line data={data} options={options} width={undefined} height={undefined} />
      </div>
    </GlowCard>
  );
}
