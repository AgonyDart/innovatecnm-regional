import Card from "./card";
import { CircleDollarSign, MoveUp } from "lucide-react";

export default function Saving() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-xl">$1,278.32 MXN</p>
        <div className="flex items-center text-primary">
          <MoveUp className="w-4 h-4" />
          <p className="text-xl">+15%</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <CircleDollarSign />
        <p className="text-lg">Promedio de ahorros diarios</p>
      </div>
    </Card>
  );
}
