'use client';

import { useState, useEffect } from 'react';
import { Clock, Globe, Settings, ChevronDown, RotateCcw, Watch } from 'lucide-react';
import AnalogClock from './AnalogClock';

interface TimeFormat {
  id: string;
  label: string;
  format: Intl.DateTimeFormatOptions;
}

interface Timezone {
  id: string;
  label: string;
  timezone: string;
}

const timeFormats: TimeFormat[] = [
  {
    id: '12h',
    label: '12 Hour',
    format: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
  },
  {
    id: '24h',
    label: '24 Hour',
    format: { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
  },
  {
    id: 'time-only',
    label: 'Time Only',
    format: { hour: '2-digit', minute: '2-digit', hour12: true }
  },
  {
    id: 'with-date',
    label: 'With Date',
    format: { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    }
  }
];

const timezones: Timezone[] = [
  { id: 'local', label: 'Local Time', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { id: 'utc', label: 'UTC', timezone: 'UTC' },
  { id: 'est', label: 'Eastern Time', timezone: 'America/New_York' },
  { id: 'pst', label: 'Pacific Time', timezone: 'America/Los_Angeles' },
  { id: 'cet', label: 'Central European', timezone: 'Europe/Berlin' },
  { id: 'jst', label: 'Japan Standard', timezone: 'Asia/Tokyo' }
];

const InteractiveTime = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('12h');
  const [selectedTimezone, setSelectedTimezone] = useState('local');
  const [showSettings, setShowSettings] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnalog, setShowAnalog] = useState(false);

  const updateTime = () => {
    const now = new Date();
    const timezone = timezones.find(tz => tz.id === selectedTimezone)?.timezone || 'local';
    const format = timeFormats.find(fmt => fmt.id === selectedFormat)?.format || timeFormats[0].format;
    
    try {
      const timeString = now.toLocaleTimeString('en-US', {
        ...format,
        timeZone: timezone === 'local' ? undefined : timezone
      });
      setCurrentTime(timeString);
      
      // Update date if format includes it
      if (selectedFormat === 'with-date') {
        const dateString = now.toLocaleDateString('en-US', {
          timeZone: timezone === 'local' ? undefined : timezone
        });
        setCurrentDate(dateString);
      } else {
        setCurrentDate('');
      }
    } catch (error) {
      console.error('Error updating time:', error);
      setCurrentTime('Error');
    }
  };

  useEffect(() => {
    setIsClient(true);
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedFormat, selectedTimezone]);

  const handleFormatChange = (formatId: string) => {
    setIsAnimating(true);
    setSelectedFormat(formatId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleTimezoneChange = (timezoneId: string) => {
    setIsAnimating(true);
    setSelectedTimezone(timezoneId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const resetToDefault = () => {
    setIsAnimating(true);
    setSelectedFormat('12h');
    setSelectedTimezone('local');
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!isClient) {
    return (
      <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white/90 border border-white/20">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative z-30">
      {/* Main Time Display */}
      <div className="flex flex-col items-center space-y-4">
        {/* Digital Time Display */}
        <div 
          className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 text-white/95 border border-white/30 cursor-pointer hover:bg-white/30 transition-all duration-300 group shadow-lg"
          onClick={() => setShowSettings(!showSettings)}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
          <span className="text-base font-semibold">
            Open Now
          </span>
          <div className={`transition-all duration-300 ${isAnimating ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
            <span className="text-sm font-mono">
              {currentTime}
            </span>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showSettings ? 'rotate-180' : ''}`} />
        </div>

        {/* Analog Clock Toggle */}
        <button
          onClick={() => setShowAnalog(!showAnalog)}
          className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2 text-white/90 border border-white/25 hover:bg-white/25 transition-all duration-300 group shadow-md"
        >
          <Watch className="h-4 w-4" />
          <span className="text-sm font-medium">
            {showAnalog ? 'Hide' : 'Show'} Wall Clock
          </span>
        </button>

        {/* Analog Clock Display */}
        {showAnalog && (
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <AnalogClock 
              size={200} 
              showDigital={false} 
              timezone={selectedTimezone}
            />
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 min-w-80 z-[60]">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-gray-800">Time Settings</h3>
              </div>
              <button
                onClick={resetToDefault}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                title="Reset to default"
              >
                <RotateCcw className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Time Format Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Time Format</label>
              <div className="grid grid-cols-2 gap-2">
                {timeFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => handleFormatChange(format.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedFormat === format.id
                        ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timezone Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Timezone</span>
              </label>
              <select
                value={selectedTimezone}
                onChange={(e) => handleTimezoneChange(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white text-gray-700 focus:border-amber-300 focus:outline-none transition-colors duration-200"
              >
                {timezones.map((tz) => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Time Preview */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-gray-800 mb-1">
                  {currentTime}
                </div>
                {currentDate && (
                  <div className="text-sm text-gray-600">
                    {currentDate}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  {timezones.find(tz => tz.id === selectedTimezone)?.label}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-xs text-gray-500 text-center">
              Click outside to close • Updates every second
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-[55]"
          onClick={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default InteractiveTime;
