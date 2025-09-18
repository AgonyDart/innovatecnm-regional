import Card from "./card";

export default function PerformanceCard() {
  return (
    <Card className="mb-4">
      <p className="text-lg font-montserrat font-normal w-full text-left mb-2">
        Generación de Energía
      </p>
      <p className="text-4xl font-worksans font-semibold w-full text-left text-primary">
        12.5 kWh
      </p>
    </Card>
  );
}
