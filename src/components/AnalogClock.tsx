'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, Settings, RotateCcw, Volume2, VolumeX, Palette, Zap, Pause, Play } from 'lucide-react';

interface ClockProps {
  size?: number;
  showDigital?: boolean;
  timezone?: string;
}

interface ClockTheme {
  id: string;
  name: string;
  faceColor: string;
  handColors: {
    hour: string;
    minute: string;
    second: string;
  };
  numberColor: string;
  markingColor: string;
}

const AnalogClock = ({ size = 200, showDigital = true, timezone = 'local' }: ClockProps) => {
  const [time, setTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(timezone);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('classic');
  const [hoveredHand, setHoveredHand] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartTime, setDragStartTime] = useState<Date | null>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  const timezones = [
    { id: 'local', label: 'Local Time', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    { id: 'utc', label: 'UTC', timezone: 'UTC' },
    { id: 'est', label: 'Eastern Time', timezone: 'America/New_York' },
    { id: 'pst', label: 'Pacific Time', timezone: 'America/Los_Angeles' },
    { id: 'cet', label: 'Central European', timezone: 'Europe/Berlin' },
    { id: 'jst', label: 'Japan Standard', timezone: 'Asia/Tokyo' }
  ];

  const themes: ClockTheme[] = [
    {
      id: 'classic',
      name: 'Classic',
      faceColor: '#FEF3C7',
      handColors: { hour: '#1F2937', minute: '#374151', second: '#DC2626' },
      numberColor: '#8B4513',
      markingColor: '#8B4513'
    },
    {
      id: 'modern',
      name: 'Modern',
      faceColor: '#F8FAFC',
      handColors: { hour: '#1E293B', minute: '#475569', second: '#EF4444' },
      numberColor: '#334155',
      markingColor: '#64748B'
    },
    {
      id: 'dark',
      name: 'Dark',
      faceColor: '#1F2937',
      handColors: { hour: '#F9FAFB', minute: '#D1D5DB', second: '#F59E0B' },
      numberColor: '#F9FAFB',
      markingColor: '#6B7280'
    },
    {
      id: 'vintage',
      name: 'Vintage',
      faceColor: '#FDF2E9',
      handColors: { hour: '#92400E', minute: '#A16207', second: '#B91C1C' },
      numberColor: '#92400E',
      markingColor: '#A16207'
    },
    {
      id: 'neon',
      name: 'Neon',
      faceColor: '#0F172A',
      handColors: { hour: '#00FF88', minute: '#00D4FF', second: '#FF0080' },
      numberColor: '#00FF88',
      markingColor: '#00D4FF'
    }
  ];

  const currentTheme = themes.find(theme => theme.id === selectedTheme) || themes[0];

  useEffect(() => {
    setIsClient(true);
    const updateTime = () => {
      if (!isPaused) {
        const now = new Date();
        if (selectedTimezone !== 'local') {
          const timezone = timezones.find(tz => tz.id === selectedTimezone)?.timezone;
          if (timezone) {
            // Use toLocaleString to get the correct time for the timezone
            const timeString = now.toLocaleString('en-US', { timeZone: timezone });
            setTime(new Date(timeString));
          } else {
            setTime(now);
          }
        } else {
          setTime(now);
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedTimezone, isPaused]);

  // Sound effect for second hand tick
  const playTickSound = () => {
    if (soundEnabled) {
      // Create a simple tick sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  // Handle mouse interactions
  const handleMouseEnter = (handType: string) => {
    setHoveredHand(handType);
  };

  const handleMouseLeave = () => {
    setHoveredHand(null);
  };

  const handleClockClick = (event: React.MouseEvent) => {
    if (isDragging) return;
    
    const rect = clockRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = event.clientX - rect.left - centerX;
    const clickY = event.clientY - rect.top - centerY;
    
    const angle = Math.atan2(clickY, clickX) * 180 / Math.PI + 90;
    const normalizedAngle = (angle + 360) % 360;
    
    // Convert angle to time (rough approximation)
    const hours = Math.floor(normalizedAngle / 30);
    const minutes = Math.floor((normalizedAngle % 30) * 2);
    
    const newTime = new Date(time);
    newTime.setHours(hours === 0 ? 12 : hours, minutes, 0);
    setTime(newTime);
    setDragStartTime(newTime);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const resetTime = () => {
    setTime(new Date());
    setIsPaused(false);
  };

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
      <div 
        ref={clockRef}
        className="relative inline-block cursor-pointer"
        onClick={handleClockClick}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={`drop-shadow-2xl transition-all duration-300 ${hoveredHand ? 'scale-105' : 'scale-100'}`}
        >
          {/* Clock Face Background */}
          <circle
            cx={centerX}
            cy={centerY}
            r={size / 2 - 2}
            fill={currentTheme.faceColor}
            stroke={currentTheme.markingColor}
            strokeWidth="4"
            className="drop-shadow-lg transition-all duration-500"
          />

          {/* Clock Face Gradient */}
          <defs>
            <radialGradient id="clockGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentTheme.faceColor} />
              <stop offset="70%" stopColor={currentTheme.faceColor} />
              <stop offset="100%" stopColor={currentTheme.faceColor} />
            </radialGradient>
            <linearGradient id="hourHandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentTheme.handColors.hour} />
              <stop offset="100%" stopColor={currentTheme.handColors.hour} />
            </linearGradient>
            <linearGradient id="minuteHandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentTheme.handColors.minute} />
              <stop offset="100%" stopColor={currentTheme.handColors.minute} />
            </linearGradient>
            <linearGradient id="secondHandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentTheme.handColors.second} />
              <stop offset="100%" stopColor={currentTheme.handColors.second} />
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
                stroke={currentTheme.markingColor}
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-all duration-300"
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
                stroke={currentTheme.markingColor}
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
                className="transition-all duration-300"
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
                fill={currentTheme.numberColor}
                className="select-none transition-all duration-300"
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
            strokeWidth={hoveredHand === 'hour' ? "8" : "6"}
            strokeLinecap="round"
            className={`transition-all duration-300 ease-out cursor-pointer ${hoveredHand === 'hour' ? 'drop-shadow-lg' : ''}`}
            onMouseEnter={() => handleMouseEnter('hour')}
            onMouseLeave={handleMouseLeave}
          />

          {/* Minute Hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={minuteX}
            y2={minuteY}
            stroke="url(#minuteHandGradient)"
            strokeWidth={hoveredHand === 'minute' ? "6" : "4"}
            strokeLinecap="round"
            className={`transition-all duration-300 ease-out cursor-pointer ${hoveredHand === 'minute' ? 'drop-shadow-lg' : ''}`}
            onMouseEnter={() => handleMouseEnter('minute')}
            onMouseLeave={handleMouseLeave}
          />

          {/* Second Hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={secondX}
            y2={secondY}
            stroke="url(#secondHandGradient)"
            strokeWidth={hoveredHand === 'second' ? "4" : "2"}
            strokeLinecap="round"
            className={`transition-all duration-300 ease-out cursor-pointer ${hoveredHand === 'second' ? 'drop-shadow-lg' : ''}`}
            onMouseEnter={() => handleMouseEnter('second')}
            onMouseLeave={handleMouseLeave}
          />

          {/* Center Dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="6"
            fill={currentTheme.markingColor}
            stroke={currentTheme.faceColor}
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Inner Center Dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="3"
            fill={currentTheme.faceColor}
            className="transition-all duration-300"
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

        {/* Interactive Control Buttons */}
        <div className="absolute -top-2 -right-2 flex space-x-1">
          {/* Pause/Play Button */}
          <button
            onClick={togglePause}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="h-4 w-4 text-gray-600" /> : <Pause className="h-4 w-4 text-gray-600" />}
          </button>
          
          {/* Reset Button */}
          <button
            onClick={resetTime}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
            title="Reset to current time"
          >
            <RotateCcw className="h-4 w-4 text-gray-600" />
          </button>
          
          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
            title="Settings"
          >
            <Settings className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-full right-0 mt-4 bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/30 min-w-80 z-50">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-gray-800">Interactive Clock Settings</h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <RotateCcw className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Theme Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                <Palette className="h-4 w-4" />
                <span>Theme</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedTheme === theme.id
                        ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Timezone Selection */}
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

            {/* Sound Toggle */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <span>Sound Effects</span>
              </label>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-full p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  soundEnabled
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                {soundEnabled ? 'Sound On' : 'Sound Off'}
              </button>
            </div>

            {/* Interactive Features Info */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Interactive Features</span>
              </div>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Click on clock face to set time</li>
                <li>• Hover over hands for effects</li>
                <li>• Use pause/resume controls</li>
                <li>• Try different themes</li>
              </ul>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Interactive analog clock with themes & controls
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
