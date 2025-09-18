import Warning from "../components/warning";
import Navbar from "../components/navbar";
import Saving from "../components/saving";
import WeatherCard from "../components/weather";
import PerformanceCard from "../components/performance";

export default function Home() {
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-light-background">
      {/* Background Layers */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-primary blur-[255px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen items-center">
        <Warning className="mb-7 mt-12" />
        <WeatherCard />
        <PerformanceCard />
        <h1 className="text-4xl font-semibold font-worksans mb-2 text-left w-5/6">
          Ahorros
        </h1>
        <Saving />
        <Navbar />
      </div>
    </section>
  );
}
