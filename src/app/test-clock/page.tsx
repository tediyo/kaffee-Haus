'use client';

import AnalogClock from '@/components/AnalogClock';

export default function TestClock() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Analog Clock Test</h1>
        <AnalogClock size={300} showDigital={true} timezone="local" />
      </div>
    </div>
  );
}
