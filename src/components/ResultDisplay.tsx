import { Info, Volume2, ThermometerSun, Zap } from 'lucide-react';
import { NoiseGauge } from './NoiseGauge';
import { Card } from './ui/Card';

interface ResultDisplayProps {
  finalLevel: number;
  passes: boolean;
}

export const ResultDisplay = ({ finalLevel, passes }: ResultDisplayProps) => {
  const gradientClass = passes 
    ? 'bg-gradient-to-r from-emerald-500 to-green-500'
    : 'bg-gradient-to-r from-pink-500 to-purple-500';

  return (
    <Card className="mt-8 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<Volume2 className={`w-6 h-6 ${passes ? 'text-emerald-400' : 'text-pink-400'}`} />}
          label="Noise Level"
          value={`${finalLevel.toFixed(2)} dB(A)`}
        />
        <StatCard 
          icon={<ThermometerSun className={`w-6 h-6 ${passes ? 'text-emerald-400' : 'text-purple-400'}`} />}
          label="Status"
          value={passes ? "Compliant" : "Non-Compliant"}
          valueColor={passes ? "text-emerald-400" : "text-red-400"}
        />
        <StatCard 
          icon={<Zap className={`w-6 h-6 ${passes ? 'text-emerald-400' : 'text-mint-400'}`} />}
          label="Limit"
          value="42.00 dB(A)"
        />
      </div>
      
      <div className="mb-8">
        <NoiseGauge value={finalLevel} maxValue={42} passes={passes} />
        <div className="flex justify-between mt-3 text-sm text-purple-300">
          <span>0 dB(A)</span>
          <span className="font-medium">Limit: 42 dB(A)</span>
        </div>
      </div>

      <div className={`flex items-start gap-3 p-4 rounded-xl ${
        passes 
          ? 'bg-emerald-400/10 border border-emerald-400/20' 
          : 'bg-red-400/10 border border-red-400/20'
      }`}>
        <Info className={passes ? 'text-emerald-400' : 'text-red-400'} />
        <div>
          <h3 className={`text-lg font-semibold mb-1 ${passes ? 'text-emerald-400' : 'text-red-400'}`}>
            {passes ? "Permitted Development Compliant" : "Exceeds Noise Limit"}
          </h3>
          <p className="text-sm text-purple-200">
            {passes 
              ? "This installation meets the permitted development noise requirements of ≤42 dB(A)"
              : "This configuration exceeds the permitted development noise limit of 42 dB(A). Consider adjusting the installation parameters."}
          </p>
        </div>
      </div>
    </Card>
  );
};

const StatCard = ({ icon, label, value, valueColor = "text-white" }) => (
  <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-700/30">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <span className="text-sm text-purple-300">{label}</span>
    </div>
    <div className={`text-xl font-semibold ${valueColor}`}>{value}</div>
  </div>
);