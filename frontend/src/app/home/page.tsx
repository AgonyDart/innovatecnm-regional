"use client";

import { useEffect } from "react";
import Warning from "../components/warning";
import Navbar from "../components/navbar";
import Saving from "../components/saving";
import WeatherCard from "../components/weather";
import PerformanceCard from "../components/performance";

export default function Home() {
  // console.log("hola");
  // useEffect(() => {
  //   console.log("Starting fetch for latest MQTT panel data...");
  //   fetch("http://172.18.85.161:8001/")
  //     .then((response) => {
  //       console.log("Received response:", response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Parsed JSON data:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching MQTT panel data:", error);
  //     });
  // }, []);
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-light-background">
      {/* Background Layers */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-primary blur-[255px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen items-center">
        <Warning className="mb-7 mt-12" />
        <div className="flex flex-col w-full max-w-5xl items-center">
          <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-12 mt-12 mb-7">
            <WeatherCard />
            <PerformanceCard />
          </div>
        </div>
        <h1 className="text-4xl font-semibold font-worksans mb-2 text-left w-full">
          Ahorros
        </h1>
        <Saving />
        <Navbar />
      </div>
    </section>
  );
}
