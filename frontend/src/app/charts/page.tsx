"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import dynamic from "next/dynamic";

const SimpleChart = dynamic(() => import("../components/simpleChart"), {
  ssr: false,
});

export default function Home() {
  const [panels, setPanels] = useState([]);
  useEffect(() => {
    const ws = new WebSocket(`${process.env.API}/panels/ws`);
    ws.onmessage = (event) => {
      const panelsData = JSON.parse(event.data);
      setPanels(panelsData);
    };
    return () => {
      ws.close();
    };
  }, []);

  const labels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const values = [120, 200, 150, 300, 250, 400, 320];
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-light-background">
      {/* Background Layers */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-primary blur-[255px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen items-center">
        <SimpleChart labels={labels} values={values} />
        <Navbar />
      </div>
    </section>
  );
}
