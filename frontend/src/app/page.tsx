"use client";

import Image from "next/image";
import {
  Activity,
  MessageCircleWarning,
  Play,
  ShieldPlus,
  Smartphone,
  Sprout,
  Zap,
} from "lucide-react";

import { useState } from "react";

export default function Home() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen w-full overflow-hidden bg-background px-4 sm:px-8">
      {/* Background Layers */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] lg:w-[1000px] h-[400px] md:h-[600px] rounded-full bg-primary blur-[64px] sm:blur-[128px] lg:blur-[192px]" />

      {/* Content */}
      <div className="flex flex-col w-full max-w-5xl min-h-screen md:min-h-0 mx-auto">
        {/* Hero Branding */}
        <section className="relative z-10 text-center w-full flex flex-col min-h-[50vh] justify-center items-center py-10 sm:py-16 md:py-24">
          <h1 className="text-2xl sm:text-4xl md:text-7xl mt-8 sm:mt-16 md:mt-32 font-semibold font-worksans">
            Eco Monitoreo Solar
          </h1>
            <div className="flex justify-center mt-4">
            <Image
              src="/ems.svg"
              alt="Eco Monitoreo Solar"
              width={192}
              height={192}
              className="my-8 sm:my-12 md:my-20 lg:w-[192px] lg:h-[192px] md:w-[128px] md:h-[128px] w-[64px] h-[64px]"
              priority
            />
            </div>
          <div>
            <p className="mt-6 sm:mt-10 md:mt-16 font-montserrat font-regular text-lg sm:text-2xl md:text-5xl">
              Energía <span className="text-primary">limpia</span>
            </p>
            <p className="mt-4 sm:mt-6 font-montserrat font-regular text-lg sm:text-2xl md:text-5xl">
              Un futuro <span className="text-primary">brillante</span>
            </p>
          </div>
        </section>
        {/* Hero Info */}
        <section className="relative z-10 text-center w-full flex flex-col min-h-screen justify-center items-center py-8 md:py-16">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold font-worksans">
            Maximiza tu <br />{" "}
            <span className="text-primary">inversión solar</span>
          </h2>
          <p className="mt-4 max-w-2xl font-montserrat text-base sm:text-lg md:text-xl">
            Monitorea y optimiza el rendimiento de tus paneles solares con
            EcoMonitoreo Solar. Nuestra plataforma avanzada te proporciona datos
            en tiempo real, análisis detallados y alertas proactivas para
            garantizar que tu sistema solar funcione con la mejor eficiencia.
          </p>
          <div className="mt-8 flex ">
            {/* <button className="bg-primary text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
              Comienza ahora <Play />
            </button> */}
            <a href="/home">
              <button className="ml-4 bg-primary text-bone py-2 px-4 font-semibold rounded-lg flex items-center gap-2">
                Ver demo <Play />
              </button>
            </a>
          </div>
          <div className="mt-12 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center rounded-xl shadow p-6">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2">
                24/7
              </span>
              <p className="font-montserrat text-base md:text-lg text-bone">
                Monitoreo
              </p>
            </div>
            <div className="flex flex-col items-center rounded-xl shadow p-6">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2">
                15%
              </span>
              <p className="font-montserrat text-base md:text-lg text-bone">
                Ganancia en Eficiencia
              </p>
            </div>
            <div className="flex flex-col items-center rounded-xl shadow p-6">
              <span className="text-4xl md:text-5xl font-bold text-primary mb-2">
                1 min
              </span>
              <p className="font-montserrat text-base md:text-lg text-bone">
                Tiempo de respuesta promedio
              </p>
            </div>
          </div>
        </section>
        {/* Features */}
        <section className="relative z-10 text-center w-full flex flex-col justify-center items-center py-8 md:py-16">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold font-worksans">
            <span className="text-primary">Solución Completa</span> <br /> de
            Monitoreo Solar
          </h2>
          <p className="mt-4 max-w-2xl font-montserrat text-base sm:text-lg md:text-xl">
            Nuestra plataforma provee todo lo que necesitas para gestionar,
            optimizar y proteger tu inversión en energía solar.
          </p>
        </section>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-start rounded-xl shadow p-6 bg-light-background">
              <div className="bg-primary/20 rounded-lg p-3 mb-4">
                <Activity className="text-primary" size={34} />
              </div>
              <h3 className="font-semibold text-xl text-left mb-2">
                Monitoreo en Tiempo Real
              </h3>
              <p className="font-montserrat text-base text-bone text-justify">
                Visualiza el rendimiento de tus paneles solares al instante
                desde cualquier dispositivo.
              </p>
            </div>
            <div className="flex flex-col items-start rounded-xl shadow p-6 bg-light-background">
              <div className="bg-primary/20 rounded-lg p-3 mb-4">
                <ShieldPlus className="text-primary" size={34} />
              </div>
              <h3 className="font-semibold text-xl text-left mb-2">
                Mantenimiento Predictivo
              </h3>
              <p className="font-montserrat text-base text-bone text-justify">
                Algoritmos potenciados por IA que anticipan y previenen fallos
                antes de que impacten el rendimiento, reduciendo perdidas hasta
                un 30%.
              </p>
            </div>
            <div className="flex flex-col items-start rounded-xl shadow p-6 bg-light-background">
              <div className="bg-primary/20 rounded-lg p-3 mb-4">
                <Zap className="text-primary" size={34} />
              </div>
              <h3 className="font-semibold text-xl text-left mb-2">
                Optimización de Rendimiento
              </h3>
              <p className="font-montserrat text-base text-bone text-justify">
                Ajustes automatizados basados en datos para maximizar la
                producción de energía y mejorar la eficiencia del sistema.
              </p>
            </div>
            <div className="flex flex-col items-start rounded-xl shadow p-6 bg-light-background">
              <div className="bg-primary/20 rounded-lg p-3 mb-4">
                <Sprout className="text-primary" size={34} />
              </div>
              <h3 className="font-semibold text-xl text-left mb-2">
                Análisis de Retorno de Inversión
              </h3>
              <p className="font-montserrat text-base text-bone text-justify">
                Informes detallados que muestran ahorros energéticos y el
                impacto ambiental positivo de tu sistema solar.
              </p>
            </div>
            <div className="flex flex-col items-start rounded-xl shadow p-6 bg-light-background">
              <div className="bg-primary/20 rounded-lg p-3 mb-4">
                <MessageCircleWarning className="text-primary" size={34} />
              </div>
              <h3 className="font-semibold text-xl text-left mb-2">
                Alertas Proactivas
              </h3>
              <p className="font-montserrat text-base text-bone text-justify">
                Notificaciones instantáneas sobre cualquier anomalía, impactos
                climáticos o mantenimiento necesario.
              </p>
            </div>
            <div className="flex flex-col items-start rounded-xl shadow p-6 bg-light-background">
              <div className="bg-primary/20 rounded-lg p-3 mb-4">
                <Smartphone className="text-primary" size={34} />
              </div>
              <h3 className="font-semibold text-xl text-left mb-2">
                Dashboard Móvil
              </h3>
              <p className="font-montserrat text-base text-bone text-justify">
                Acceso completo a todas las funcionalidades desde tu smartphone
                o tablet, con nuestra interfaz web responsiva.
              </p>
            </div>
          </div>
          {/* Footer */}
          <footer className="bg-light-background rounded-lg shadow mt-10 px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
              {/* Left: Branding & Short Description */}
              <div className="flex flex-col items-start md:items-start">
                <h2 className="text-2xl font-semibold font-worksans text-primary mb-2">
                  Eco Monitoreo Solar
                </h2>
                <p className="font-montserrat text-base text-bone max-w-xs">
                  Plataforma inteligente para monitoreo, optimización y
                  protección de sistemas solares.
                </p>
              </div>
              {/* Right: Navigation Links */}
              <nav className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
                <a
                  href="#"
                  className="font-montserrat text-base text-bone hover:text-primary transition"
                >
                  Sobre Nosotros
                </a>
                <a
                  href="#"
                  className="font-montserrat text-base text-bone hover:text-primary transition"
                >
                  Casos de Éxito
                </a>
                <a
                  href="#"
                  className="font-montserrat text-base text-bone hover:text-primary transition"
                >
                  Soporte
                </a>
                <a
                  href="#"
                  className="font-montserrat text-base text-bone hover:text-primary transition"
                >
                  Contacto
                </a>
              </nav>
            </div>
            <div className="border-t border-bone/20 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-montserrat text-sm text-bone text-center">
                © 2025 Solara Insights. Todos los derechos reservados.
              </p>
              <div className="flex gap-4">
                <button
                  className="font-montserrat text-sm text-bone hover:text-primary transition"
                  onClick={() => setShowPrivacy(true)}
                  type="button"
                >
                  Política de Privacidad
                </button>
                {showPrivacy && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-light-background rounded-lg shadow-lg p-8 max-w-lg w-full relative">
                      <h3 className="text-xl font-semibold mb-4 text-primary">
                        Política de Privacidad
                      </h3>
                      <p className="font-montserrat text-base text-bone mb-4">
                        En Eco Monitoreo Solar, la protección de tu información
                        es nuestra prioridad. Todos los datos personales
                        recopilados son gestionados bajo estrictos estándares de
                        seguridad y privacidad, conforme a la legislación
                        vigente. Utilizamos tu información exclusivamente para
                        ofrecerte una experiencia personalizada y optimizar el
                        funcionamiento de nuestra plataforma. Nunca compartimos
                        tus datos con terceros sin tu autorización expresa. Para
                        más detalles, puedes consultar nuestra política completa
                        o contactarnos directamente.
                      </p>
                      <button
                        className="absolute top-2 right-2 text-primary font-bold text-lg"
                        onClick={() => setShowPrivacy(false)}
                        type="button"
                        aria-label="Cerrar"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    className="font-montserrat text-sm text-bone hover:text-primary transition"
                    onClick={() => setShowTerms(true)}
                    type="button"
                  >
                    Términos del Servicio
                  </button>
                  {showTerms && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                      <div className="bg-light-background rounded-lg shadow-lg p-8 max-w-lg w-full relative">
                        <h3 className="text-xl font-semibold mb-4 text-primary">
                          Términos del Servicio
                        </h3>
                        <p className="font-montserrat text-base text-bone mb-4">
                          Al utilizar la aplicación "Eco Monitoreo Solar",
                          aceptas y te comprometes a cumplir con los siguientes
                          términos y condiciones. Nuestra aplicación te
                          proporciona herramientas para monitorear la eficiencia
                          de tus paneles solares. Eres responsable de la
                          veracidad de la información que ingresas.
                          <br />
                          <br />
                          El uso de la aplicación no transfiere ningún derecho
                          sobre su propiedad intelectual. El contenido y las
                          funciones de "Eco Monitoreo Solar" están protegidos
                          por derechos de autor y otras leyes. Nos reservamos el
                          derecho de suspender o cancelar tu cuenta si se
                          detecta un uso indebido o fraudulento de la
                          plataforma.
                        </p>
                        <button
                          className="absolute top-2 right-2 text-primary font-bold text-lg"
                          onClick={() => setShowTerms(false)}
                          type="button"
                          aria-label="Cerrar"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
