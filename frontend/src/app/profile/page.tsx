"use client";
import { User } from "lucide-react";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-light-background">
      {/* Background Layers */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-primary blur-[255px]" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-primary blur-[255px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen items-center justify-between z-10 px-4 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-6 flex-1 justify-center w-full">
          {/* Profile Icon */}
          <div className="bg-black bg-opacity-70 rounded-full p-4">
            <User className="w-20 h-20 sm:w-32 sm:h-32 text-primary" />
          </div>

          {/* Info */}
          <div className="text-center w-full max-w-md flex flex-col gap-4 items-center">
            {/* Nombre */}
            <div className="w-full">
              <label className="block text-sm text-left font-bold text-primary mb-1">
                Nombre
              </label>
              <input
                type="text"
                value="Eco Monitor"
                readOnly
                className="w-full px-4 py-2 rounded-lg bg-black bg-opacity-65 text-white font-medium"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <label className="block text-sm text-left font-bold text-primary mb-1">
                Correo electrónico
              </label>
              <input
                type="text"
                value="email@example.com"
                readOnly
                className="w-full px-4 py-2 rounded-lg bg-black bg-opacity-65 text-white font-medium"
              />
            </div>

            {/* Device ID */}
            <div className="w-full">
              <label className="block text-sm text-left font-bold text-primary mb-1">
                Device ID
              </label>
              <input
                type="text"
                value="062faf49-8e92-4d3f-8620-996118f65e51"
                readOnly
                className="w-full px-4 py-2 rounded-lg bg-black bg-opacity-65 text-white font-medium"
              />
            </div>
          </div>

          {/* Logout Button */}
          <button
            className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition w-full max-w-xs sm:max-w-sm"
            onClick={() => {
              alert(
                "Esta es una versión de demostración. La funcionalidad de cierre de sesión no está habilitada."
              );
            }}
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Navbar */}
        <Navbar />
      </div>
    </section>
  );
}
