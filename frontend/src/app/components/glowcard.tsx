interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div
      className={`relative w-11/12 bg-background rounded-2xl shadow-md py-4 px-5 overflow-hidden ${className}`}
    >
      {/* Background Layers */}
      <div className="absolute -right-12 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-primary blur-[64px]" />

      {/* Content */}
      <div className="relative flex flex-col w-full items-center min-h-[120px]">
        {children}
      </div>
    </div>
  );
}
