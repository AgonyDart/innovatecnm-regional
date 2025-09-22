import React, { useEffect, useState } from "react";
import Card from "./card";
import { CircleDollarSign, MoveUp } from "lucide-react";

export default function Saving() {
  const [savings, setSavings] = useState<number | null>(null);
  const [percentageSavings, setPercentageSavings] = useState<number | null>(
    null
  );

  useEffect(() => {
    const ws = new WebSocket(`${process.env.API}/panels/ws/savings`);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setSavings(data.savings_mxn_monthly);
        setPercentageSavings(data.percentage_savings);
      } catch (e) {
        console.error("Failed to parse savings data:", e);
      }
    };
    return () => ws.close();
  }, []);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-xl">
          {savings !== null
            ? savings.toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              }) + " MXN"
            : "Cargando..."}
        </p>
        <div className="flex items-center text-primary">
          <MoveUp className="w-4 h-4" />
          <p className="text-xl">
            +{percentageSavings !== null ? percentageSavings.toFixed(2) : 0}%
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <CircleDollarSign />
        <p className="text-lg">Promedio de ahorros mensuales</p>
      </div>
    </Card>
  );
}
