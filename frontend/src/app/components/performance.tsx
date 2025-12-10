import { useEffect, useState } from "react";
import Card from "./card";

export default function PerformanceCard() {
  const [energyGenerated, setEnergyGenerated] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://10.179.22.161:8001/panels/mqtt/latest"
        );
        const panelsData = await response.json();
        // console.log(panelsData);
        if (panelsData && typeof panelsData === "object") {
          const totalEnergy = panelsData.power_gen || 0;
          setEnergyGenerated(totalEnergy);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch panel data:", error);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) {
    return <Card className="mb-4">Cargando...</Card>;
  }

  return (
    <Card className="mb-4">
      <p className="text-lg font-montserrat font-normal w-full text-left mb-2">
        Generación de Energía
      </p>
      <p className="text-4xl font-worksans font-semibold w-full text-left text-primary">
        {energyGenerated} W
      </p>
      <div className="w-full h-2 bg-light-background rounded-full mt-4">
        <div
          className="h-2 bg-primary rounded-full"
          style={{ width: `${Math.min((energyGenerated / 10) * 100, 100)}%` }}
        ></div>
      </div>
    </Card>
  );
}
