interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div
      className={`w-full bg-background rounded-2xl shadow-md py-4 px-5 ${className}`}
    >
      {children}
    </div>
  );
}
