import React from 'react';
import { Ruler, Building } from 'lucide-react';
import { FormField } from './ui/FormField';
import { Select } from './ui/Select';
import { calculateDistance } from '../lib/calculations';

interface DistanceCalculatorProps {
  horizontalDistance: string;
  stories: string;
  onHorizontalDistanceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStoriesChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DistanceCalculator = ({
  horizontalDistance,
  stories,
  onHorizontalDistanceChange,
  onStoriesChange
}: DistanceCalculatorProps) => {
  const calculatedDistance = horizontalDistance && stories
    ? calculateDistance(Number(horizontalDistance), Number(stories))
    : null;

  return (
    <>
      <FormField
        label="Step 3a: Horizontal Distance (m)"
        icon={<Ruler className="w-5 h-5 text-purple-400" />}
      >
        <input
          type="number"
          value={horizontalDistance}
          onChange={onHorizontalDistanceChange}
          step="0.1"
          min="0"
          className="neumorphic-input w-full"
          placeholder="Enter horizontal distance in meters..."
        />
      </FormField>

      <FormField
        label="Step 3b: Assessment Window Level"
        icon={<Building className="w-5 h-5 text-purple-400" />}
      >
        <Select
          value={stories}
          onChange={onStoriesChange}
          options={[
            { value: "0", label: "Ground floor" },
            { value: "1", label: "First floor" },
            { value: "2", label: "Second floor" },
            { value: "3", label: "Third floor" },
            { value: "4", label: "Fourth floor" }
          ]}
        />
      </FormField>

      {calculatedDistance && (
        <div className="col-span-2 bg-purple-900/30 rounded-xl p-4 border border-purple-700/30">
          <p className="text-purple-300">
            Calculated Distance: <span className="text-white font-semibold">{calculatedDistance.toFixed(2)}m</span>
          </p>
        </div>
      )}
    </>
  );
};