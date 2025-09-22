"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

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

  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-light-background">
      {/* Background Layers */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-primary blur-[255px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen items-center">
        Panels
        <Navbar />
      </div>
    </section>
  );
}
