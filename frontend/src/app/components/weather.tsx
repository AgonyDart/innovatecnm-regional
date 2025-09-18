import GlowCard from "../components/glowcard";
import { Sun } from "lucide-react";

export default function WeatherCard() {
  return (
    <GlowCard className="mb-4">
      <p className="text-lg font-montserrat font-normal w-full text-left mb-4">
        Clima en tiempo real
      </p>
      <div className="flex items-center w-full">
        <Sun size={40} />
        <div>
          <p className="text-lg font-montserrat font-normal w-full text-left px-2 mb-2">
            25°C
          </p>
          <p className="text-lg font-montserrat font-normal w-full text-left px-2 mb-2">
            Descripción del clima
          </p>
        </div>
      </div>
    </GlowCard>
  );
}
