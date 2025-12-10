import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface WarningProps {
  className?: string;
}

export default function Warning({ className }: WarningProps) {
  const [loading, setLoading] = useState(true);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://10.179.22.161:8001/panels/mqtt/latest"
        );
        const data = await response.json();
        if (data && typeof data === "object") {
          if (data.power_gen < 0.5) {
            setFail(true);
          } else {
            setFail(false);
          }
        }
        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch savings data:", e);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={className}>
      {loading ? (
        <div className="flex items-center gap-2">
          <span>Verificando estado...</span>
        </div>
      ) : fail ? (
        <div className="flex items-center gap-2 bg-red-600 p-2 text-xl rounded-2xl">
          <AlertTriangle size={20} />
          <span>¡Alerta! El panel no está funcionando correctamente.</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-green-600 p-2 text-xl rounded-2xl">
          <CheckCircle size={20} />
          <span>Todo bien. El panel está funcionando correctamente.</span>
        </div>
      )}
    </div>
  );
}
