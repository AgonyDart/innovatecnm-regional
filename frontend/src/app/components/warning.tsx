import React from "react";
import { CheckCircle } from "lucide-react";

interface WarningProps {
  className?: string;
}

export default function Warning({ className }: WarningProps) {
  return (
    <div
      className={`bg-primary w-full flex justify-center items-center rounded-2xl gap-1 px-4 py-2 ${className}`}
    >
      <CheckCircle className="text-background" />
      <p className="text-background font-montserrat text-xl">Todo en orden</p>
    </div>
  );
}
