import Image from "next/image";

export default function Home() {
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-background">
      {/* Background Layers */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] lg:w-[1600px] h-[400px] lg:h-[800px] rounded-full bg-primary blur-[128px] lg:blur:[192px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen">
        <div className="relative z-10 text-center text-bone md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-7xl mt-40 font-semibold font-worksans">
            Eco Monitoreo Solar
          </h1>
          <div className="flex justify-center mt-4">
            <Image
              src="/globe.svg"
              alt="Eco Monitoreo Solar"
              width={48}
              height={48}
              className="mt-6"
            />
          </div>
          <p className="mt-4 font-montserrat font-regular md:text-xl">
            Energía limpia
          </p>
          <p className="mt-4 font-montserrat font-regular md:text-xl">
            Un futuro brillante
          </p>
          <div className="mt-8"></div>
        </div>
        <div className="z-10 md:w-1/2 flex justify-center mt-8 md:mt-0 w-full"></div>
      </div>
    </section>
  );
}
