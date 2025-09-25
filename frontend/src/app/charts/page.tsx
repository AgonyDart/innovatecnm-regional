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
    const ws = new WebSocket(`${process.env.API}/panels/ws`);
    ws.onmessage = (event) => {
      const panelsData = JSON.parse(event.data);
      // console.log(panelsData);
      if (loading) setLoading(false);
      setPanels((prev) => {
        const next = { ...prev };
        panelsData.slice(-30).forEach((panel: any, idx: number) => {
          const formattedDate = new Date(panel.reading_at).toLocaleTimeString();
          const id = panel.panel_id ?? idx;
          if (!next[id]) {
            next[id] = {
              labels: [],
              values: [],
              name: panel.name,
              savings_mxn: panel.savings_mxn,
              efficiency_percent: panel.efficiency_percent,
            };
          }
          next[id] = {
            ...next[id],
            labels: [...next[id].labels, formattedDate].slice(-30),
            values: [...next[id].values, panel.power_w].slice(-30),
          };
        });
        console.log(next);
        return next;
      });
    };
    return () => {
      ws.close();
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
