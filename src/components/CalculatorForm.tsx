import React from 'react';
import { Gauge, MapPin, Shield } from 'lucide-react';
import { heatPumpModels } from '../lib/constants';
import { FormField } from './ui/FormField';
import { Select } from './ui/Select';
import { DistanceCalculator } from './DistanceCalculator';

interface CalculatorFormProps {
  selectedModel: string;
  directivity: string;
  horizontalDistance: string;
  stories: string;
  barrierReduction: string;
  onModelSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDirectivityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onHorizontalDistanceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStoriesChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBarrierReductionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CalculatorForm = ({
  selectedModel,
  directivity,
  horizontalDistance,
  stories,
  barrierReduction,
  onModelSelect,
  onDirectivityChange,
  onHorizontalDistanceChange,
  onStoriesChange,
  onBarrierReductionChange
}: CalculatorFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField 
        label="Step 1: Select Heat Pump Model" 
        icon={<Gauge className="w-5 h-5 text-purple-400" />}
      >
        <Select
          value={selectedModel}
          onChange={onModelSelect}
          options={heatPumpModels.map(model => ({
            value: model.name,
            label: `${model.name} - ${model.power.toFixed(2)} dB(A)`
          }))}
        />
      </FormField>

      <FormField 
        label="Step 2: Select Opposing Surfaces" 
        icon={<MapPin className="w-5 h-5 text-purple-400" />}
      >
        <Select
          value={directivity}
          onChange={onDirectivityChange}
          options={[
            { value: 'Q2', label: '0' },
            { value: 'Q4', label: '1' },
            { value: 'Q8', label: '2' }
          ]}
        />
      </FormField>

      <DistanceCalculator
        horizontalDistance={horizontalDistance}
        stories={stories}
        onHorizontalDistanceChange={onHorizontalDistanceChange}
        onStoriesChange={onStoriesChange}
      />

      <FormField 
        label="Step 4: Select Visibility" 
        icon={<Shield className="w-5 h-5 text-purple-400" />}
      >
        <Select
          value={barrierReduction}
          onChange={onBarrierReductionChange}
          options={[
            { value: '0', label: 'Fully visible (0 dB)' },
            { value: '-5', label: 'Partially visible (-5 dB)' },
            { value: '-10', label: 'Not visible (-10 dB)' }
          ]}
        />
      </FormField>
    </div>
  );
};