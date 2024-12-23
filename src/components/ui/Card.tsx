interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`neumorphic-card ${className}`}>
      {children}
    </div>
  );
};