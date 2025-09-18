import Navbar from "../components/navbar";

export default function Home() {
  return (
    <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden bg-light-background">
      {/* Background Layers */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-primary blur-[255px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen items-center">
        Panels
        <Navbar />
      </div>
    </section>
  );
}
