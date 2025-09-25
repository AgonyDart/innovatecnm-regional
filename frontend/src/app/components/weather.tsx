import GlowCard from "../components/glowcard";
import { Cloudy, Sun } from "lucide-react";

export default function WeatherCard() {
  return (
    <GlowCard className="mb-4">
      <p className="text-lg font-montserrat font-normal w-full text-left mb-4">
        Clima en tiempo real
      </p>
      <div className="flex items-center w-full">
        <Cloudy size={40} />
        <div className="pl-6">
          <p className="text-lg font-montserrat font-normal w-full text-left px-2 mb-2">
            17°C
          </p>
          <p className="text-lg text-yellow-300 font-montserrat font-normal w-full text-left px-2 mb-2">
            ! Parcialmente nublado
          </p>
          <p className="text-lg font-montserrat font-normal w-full text-left px-2 mb-2"></p>
        </div>
      </div>
    </GlowCard>
  );
}
