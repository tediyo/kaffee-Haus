'use client';

import { useState, useEffect } from 'react';
import { Clock, Settings, RotateCcw } from 'lucide-react';

interface ClockProps {
  size?: number;
  showDigital?: boolean;
  timezone?: string;
}

const AnalogClock = ({ size = 200, showDigital = true, timezone = 'local' }: ClockProps) => {
  const [time, setTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(timezone);

  const timezones = [
    { id: 'local', label: 'Local Time', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    { id: 'utc', label: 'UTC', timezone: 'UTC' },
    { id: 'est', label: 'Eastern Time', timezone: 'America/New_York' },
    { id: 'pst', label: 'Pacific Time', timezone: 'America/Los_Angeles' },
    { id: 'cet', label: 'Central European', timezone: 'Europe/Berlin' },
    { id: 'jst', label: 'Japan Standard', timezone: 'Asia/Tokyo' }
  ];

  useEffect(() => {
    setIsClient(true);
    const updateTime = () => {
      const now = new Date();
      if (selectedTimezone !== 'local') {
        const timezone = timezones.find(tz => tz.id === selectedTimezone)?.timezone;
        if (timezone) {
          const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
          const targetTime = new Date(utcTime + (now.getTimezoneOffset() * 60000));
          setTime(targetTime);
        } else {
          setTime(now);
        }
      } else {
        setTime(now);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedTimezone]);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles for clock hands
  const hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + minute adjustment
  const minuteAngle = minutes * 6; // 6 degrees per minute
  const secondAngle = seconds * 6; // 6 degrees per second

  const centerX = size / 2;
  const centerY = size / 2;

  // Hand lengths
  const hourHandLength = size * 0.3;
  const minuteHandLength = size * 0.4;
  const secondHandLength = size * 0.45;

  // Convert angles to radians and calculate hand positions
  const hourX = centerX + hourHandLength * Math.sin((hourAngle - 90) * Math.PI / 180);
  const hourY = centerY - hourHandLength * Math.cos((hourAngle - 90) * Math.PI / 180);
  
  const minuteX = centerX + minuteHandLength * Math.sin((minuteAngle - 90) * Math.PI / 180);
  const minuteY = centerY - minuteHandLength * Math.cos((minuteAngle - 90) * Math.PI / 180);
  
  const secondX = centerX + secondHandLength * Math.sin((secondAngle - 90) * Math.PI / 180);
  const secondY = centerY - secondHandLength * Math.cos((secondAngle - 90) * Math.PI / 180);

  return (
    <div className="relative">
      {/* Clock Container */}
      <div className="relative inline-block">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="drop-shadow-2xl"
        >
          {/* Clock Face Background */}
          <circle
            cx={centerX}
            cy={centerY}
            r={size / 2 - 2}
            fill="url(#clockGradient)"
            stroke="#8B4513"
            strokeWidth="4"
            className="drop-shadow-lg"
          />

          {/* Clock Face Gradient */}
          <defs>
            <radialGradient id="clockGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
            <linearGradient id="hourHandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <linearGradient id="minuteHandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#4B5563" />
            </linearGradient>
            <linearGradient id="secondHandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>

          {/* Hour Markings */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30) - 90;
            const x1 = centerX + (size / 2 - 15) * Math.cos(angle * Math.PI / 180);
            const y1 = centerY + (size / 2 - 15) * Math.sin(angle * Math.PI / 180);
            const x2 = centerX + (size / 2 - 5) * Math.cos(angle * Math.PI / 180);
            const y2 = centerY + (size / 2 - 5) * Math.sin(angle * Math.PI / 180);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#8B4513"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}

          {/* Minute Markings */}
          {Array.from({ length: 60 }, (_, i) => {
            if (i % 5 === 0) return null; // Skip hour markings
            const angle = (i * 6) - 90;
            const x1 = centerX + (size / 2 - 10) * Math.cos(angle * Math.PI / 180);
            const y1 = centerY + (size / 2 - 10) * Math.sin(angle * Math.PI / 180);
            const x2 = centerX + (size / 2 - 5) * Math.cos(angle * Math.PI / 180);
            const y2 = centerY + (size / 2 - 5) * Math.sin(angle * Math.PI / 180);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#8B4513"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />
            );
          })}

          {/* Hour Numbers */}
          {Array.from({ length: 12 }, (_, i) => {
            const hour = i === 0 ? 12 : i;
            const angle = (i * 30) - 90;
            const x = centerX + (size / 2 - 25) * Math.cos(angle * Math.PI / 180);
            const y = centerY + (size / 2 - 25) * Math.sin(angle * Math.PI / 180);
            
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="bold"
                fill="#8B4513"
                className="select-none"
              >
                {hour}
              </text>
            );
          })}

          {/* Hour Hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={hourX}
            y2={hourY}
            stroke="url(#hourHandGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />

          {/* Minute Hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={minuteX}
            y2={minuteY}
            stroke="url(#minuteHandGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />

          {/* Second Hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={secondX}
            y2={secondY}
            stroke="url(#secondHandGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />

          {/* Center Dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="6"
            fill="#8B4513"
            stroke="#FEF3C7"
            strokeWidth="2"
          />

          {/* Inner Center Dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="3"
            fill="#FEF3C7"
          />
        </svg>

        {/* Digital Time Display */}
        {showDigital && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-amber-200">
              <div className="text-center">
                <div className="text-lg font-mono font-bold text-gray-800">
                  {time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                    timeZone: selectedTimezone === 'local' ? undefined : timezones.find(tz => tz.id === selectedTimezone)?.timezone
                  })}
                </div>
                <div className="text-xs text-gray-600">
                  {timezones.find(tz => tz.id === selectedTimezone)?.label}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="absolute -top-2 -right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <Settings className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-full right-0 mt-4 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 min-w-64 z-50">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-gray-800">Clock Settings</h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <RotateCcw className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Timezone</label>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 focus:border-amber-300 focus:outline-none transition-colors duration-200"
              >
                {timezones.map((tz) => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Real-time analog clock
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default AnalogClock;
