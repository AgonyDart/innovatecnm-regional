"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import dynamic from "next/dynamic";
import { Activity } from "lucide-react";

const SimpleChart = dynamic(() => import("../components/simpleChart"), {
  ssr: false,
});

export default function Home() {
  const [panels, setPanels] = useState<
    Record<
      number,
      {
        labels: string[];
        values: number[];
        name?: string;
        savings_mxn: number;
        efficiency_percent: number;
      }
    >
  >({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://10.179.22.161:8001/panels/mqtt/latest"
        );
        const panelsData = await response.json();
        console.log("Fetched panel data:", panelsData);

        const formattedDate = new Date().toLocaleTimeString();

        setPanels((prev) => {
          const next = { ...prev };

          // Reference panel
          if (!next[0]) {
            next[0] = {
              labels: [],
              values: [],
              name: "Panel de referencia",
              savings_mxn: 0,
              efficiency_percent: 0,
            };
          }
          next[0] = {
            ...next[0],
            labels: [...next[0].labels, formattedDate].slice(-30),
            values: [...next[0].values, panelsData.power_ref].slice(-30),
          };

          // Generated panel
          if (!next[1]) {
            next[1] = {
              labels: [],
              values: [],
              name: "Panel Generador",
              savings_mxn: 0,
              efficiency_percent: 0,
            };
          }
          next[1] = {
            ...next[1],
            labels: [...next[1].labels, formattedDate].slice(-30),
            values: [...next[1].values, panelsData.power_gen].slice(-30),
          };

          return next;
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch panel data:", error);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-light-background">
      {/* Background Layers */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-primary blur-[255px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen items-center z-10">
        {loading && (
          <p className="text-xl flex justify-center items-center">
            Cargando...
          </p>
        )}
        {Object.entries(panels).map(([id, panel]) => (
          <div key={id} className="w-full mb-8">
            <SimpleChart
              labels={panel.labels}
              values={panel.values}
              savings={panel.savings_mxn}
              percentage={panel.efficiency_percent}
              title={
                id === "0"
                  ? "Panel de referencia"
                  : panel.name || `Panel Solar ${id}`
              }
            />
            {id === "0" && (
              <div className="flex items-center mt-6">
                <hr className="flex-grow border-t-4 border-primary rounded-2xl" />
                <span className="mx-4 text-primary font-semibold text-sm">
                  <Activity className="inline-block mr-2" size={32} />
                </span>
                <hr className="flex-grow border-t-4 border-primary rounded-2xl" />
              </div>
            )}
          </div>
        ))}
        <Navbar />
      </div>
    </section>
  );
}
