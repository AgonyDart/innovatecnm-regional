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
import Card from "./card";
import Image from "next/image";
import { CircleDollarSign, Zap } from "lucide-react";

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
  savings,
  percentage,
}: {
  labels: string[];
  values: number[];
  title?: string;
  savings?: number | null;
  percentage?: number | null;
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
        display: false,
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
        min: 0,
        max: 5,
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
      <h2 className="font-semibold text-3xl">{title}</h2>
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full flex">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-2/3">
          <Line
            data={data}
            options={options}
            width={undefined}
            height={undefined}
          />
        </div>
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-1/3 flex flex-col items-center justify-center">
          <Image
            src="/pan.png"
            alt="Solar Panel Icon"
            width={128}
            height={128}
          />
          <h3 className="font-medium text-xl">Desempeño monitoreado</h3>
          {/* Performance Card */}
          <Card className="mb-4">
            <div className="flex items-center">
              <Zap size={32} className="mr-3" />
              <p className="text-3xl font-worksans w-full text-left ">
                {values[values.length - 1] ?? 0} W
              </p>
            </div>
            <p className="text-lg font-montserrat font-normal w-full text-left mb-2">
              Energía generada
            </p>
            <div className="w-full h-2 bg-light-background rounded-full mt-4">
              <div className="flex h-2 w-full gap-1">
                {Array.from({ length: 10 }).map((_, i) => {
                  const stepValue =
                    ((values[values.length - 1] ?? 0) / 30) * 10;
                  const isFilled = i < stepValue;
                  return (
                    <div
                      key={i}
                      className={`flex-1 h-full rounded ${
                        isFilled ? "bg-primary" : "bg-light-background"
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-base w-full text-right ">
                {percentage ?? 0} %
              </p>
            </div>
          </Card>
          {/* Savings Card */}
          <Card>
            <div className="flex items-center gap-2 mt-2">
              <CircleDollarSign />
              <p className="text-lg">Equivalente monetario</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xl text-primary font-worksans font-semibold w-full text-left">
                {savings !== null
                  ? savings.toLocaleString("es-MX", {
                      style: "currency",
                      currency: "MXN",
                    }) + " MXN"
                  : "Cargando..."}
              </p>
            </div>
          </Card>
          {/* UpTime + Export to excel */}
        </div>
      </div>
    </GlowCard>
  );
}
