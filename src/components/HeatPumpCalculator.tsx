import React, { useState, useEffect } from 'react';
import { heatPumpModels } from '../lib/constants';
import { getDistanceReduction, getDecibelCorrection, calculateDistance } from '../lib/calculations';
import { ResultDisplay } from './ResultDisplay';
import { CalculatorForm } from './CalculatorForm';
import { HeatPumpIllustration } from './HeatPumpIllustration';
import { Card } from './ui/Card';

export const HeatPumpCalculator = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [soundPowerLevel, setSoundPowerLevel] = useState('');
  const [directivity, setDirectivity] = useState('Q4');
  const [horizontalDistance, setHorizontalDistance] = useState('');
  const [stories, setStories] = useState('');
  const [barrierReduction, setBarrierReduction] = useState('0');
  const [result, setResult] = useState<{ finalLevel: number; passes: boolean } | null>(null);

  useEffect(() => {
    if (soundPowerLevel && horizontalDistance && stories) {
      try {
        const step1 = Number(soundPowerLevel);
        const distance = calculateDistance(Number(horizontalDistance), Number(stories));
        
        if (isNaN(step1) || isNaN(distance)) return;

        const step4 = getDistanceReduction(distance, directivity as keyof typeof getDistanceReduction);
        const step5 = Number(barrierReduction);
        const step6 = Number((step1 + step4 + step5).toFixed(2));
        const step7 = 40.00; // Background Level
        const step8 = Number((step7 - step6).toFixed(2));
        const correction = getDecibelCorrection(step8);
        const higherLevel = Math.max(step6, step7);
        const step9 = Number((higherLevel + correction).toFixed(2));

        setResult({
          finalLevel: step9,
          passes: step9 <= 42.00
        });
      } catch (error) {
        console.error('Calculation error:', error);
        setResult(null);
      }
    }
  }, [soundPowerLevel, directivity, horizontalDistance, stories, barrierReduction]);

  const handleModelSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelName = e.target.value;
    setSelectedModel(modelName);
    const model = heatPumpModels.find(m => m.name === modelName);
    if (model) {
      setSoundPowerLevel(model.power.toString());
    }
  };

  return (
    <div className="min-h-screen bg-[#1E0B36] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold gradient-text text-center mb-8">
            Heat Pump Noise Assessment
          </h1>

          <HeatPumpIllustration />

          <CalculatorForm
            selectedModel={selectedModel}
            directivity={directivity}
            horizontalDistance={horizontalDistance}
            stories={stories}
            barrierReduction={barrierReduction}
            onModelSelect={handleModelSelect}
            onDirectivityChange={(e) => setDirectivity(e.target.value)}
            onHorizontalDistanceChange={(e) => setHorizontalDistance(e.target.value)}
            onStoriesChange={(e) => setStories(e.target.value)}
            onBarrierReductionChange={(e) => setBarrierReduction(e.target.value)}
          />
        </Card>

        {result && <ResultDisplay finalLevel={result.finalLevel} passes={result.passes} />}
      </div>
    </div>
  );
};