import React, { useEffect, useRef, useState } from "react";
import Card from "./card";
import { CircleDollarSign, MoveUp } from "lucide-react";

export default function Saving() {
  const [savings, setSavings] = useState<number>(0);
  const [percentageSavings, setPercentageSavings] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const accumulatedSavings = useRef(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://172.31.98.113:8000/panels/mqtt/latest"
        );
        const data = await response.json();

        // Calculate savings based on panel data
        const totalSavings = Array.isArray(data)
          ? data.reduce((sum, panel) => {
              const savings = (panel.power_ref - panel.power_gen) * 1000; // Convert to MXN equivalent
              return sum + (savings || 0);
            }, 0)
          : 0;

        accumulatedSavings.current += totalSavings;
        accumulatedSavings.current = parseFloat(
          accumulatedSavings.current.toFixed(5)
        );
        setSavings(accumulatedSavings.current);

        // Calculate efficiency percentage
        const totalPercentage = Array.isArray(data)
          ? data.reduce((sum, panel) => {
              const efficiency = (panel.power_gen / panel.power_ref) * 100 || 0;
              return sum + efficiency;
            }, 0) / data.length
          : 0;
        setPercentageSavings(totalPercentage);

        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch savings data:", e);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <Card>Cargando...</Card>;
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-xl">{savings + " MXN"}</p>
        <div className="flex items-center text-primary">
          <MoveUp className="w-4 h-4" />
          <p className="text-xl">+{percentageSavings.toFixed(2)}%</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <CircleDollarSign />
        <p className="text-lg">Promedio de ahorros mensuales</p>
      </div>
    </Card>
  );
}
