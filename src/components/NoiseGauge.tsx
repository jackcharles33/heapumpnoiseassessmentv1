import { Circle } from 'lucide-react';

interface NoiseGaugeProps {
  value: number;
  maxValue: number;
  passes: boolean;
}

export const NoiseGauge = ({ value, maxValue, passes }: NoiseGaugeProps) => {
  const percentage = (value / maxValue) * 100;
  const getColor = (percent: number, passes: boolean) => {
    if (passes) return 'bg-gradient-to-r from-emerald-400 to-green-500';
    if (percent > 100) return 'bg-gradient-to-r from-red-500 to-pink-500';
    if (percent > 80) return 'bg-gradient-to-r from-yellow-500 to-pink-500';
    return 'bg-gradient-to-r from-green-400 to-emerald-500';
  };

  return (
    <div className="neumorphic-gauge animate-scale">
      <div 
        className={`absolute h-full transition-all duration-500 ease-out rounded-full ${getColor(percentage, passes)}`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
      <Circle 
        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 text-white transition-all duration-500
                 filter drop-shadow-lg"
        style={{ left: `${Math.min(percentage, 100)}%` }}
        fill="currentColor"
      />
    </div>
  );
};