import { useEffect, useState } from "react";
import Card from "./card";

export default function PerformanceCard() {
  const [energyGenerated, setEnergyGenerated] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(`${process.env.API}/panels/ws`);

    ws.onopen = () => {
      console.log("WebSocket connected successfully.");
      setLoading(false);
    };

    ws.onmessage = (event) => {
      try {
        const panelsData = JSON.parse(event.data);
        if (Array.isArray(panelsData)) {
          let totalEnergy = 0;
          for (const panel of panelsData) {
            if (panel.power_w) {
              totalEnergy += panel.power_w;
            }
          }
          setEnergyGenerated(totalEnergy);
        }
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected.");
      if (ws.readyState !== WebSocket.CLOSED) return;

      let attempts = 0;
      const maxAttempts = 3;

      function tryReconnect() {
        if (attempts < maxAttempts) {
          attempts++;
          console.log(`Reconnection attempt ${attempts}...`);
          const newWs = new WebSocket(
            `${process.env.NEXT_PUBLIC_API}/panels/ws`
          );
          newWs.onopen = ws.onopen;
          newWs.onmessage = ws.onmessage;
          newWs.onclose = ws.onclose;
          newWs.onerror = ws.onerror;
        }
      }

      tryReconnect();
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup function: This runs when the component is unmounted
    return () => {
      ws.close();
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
          style={{ width: `${Math.min((energyGenerated / 5000) * 100, 100)}%` }}
        ></div>
      </div>
    </Card>
  );
}
