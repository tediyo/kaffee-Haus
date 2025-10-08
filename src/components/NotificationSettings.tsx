'use client';

import React, { useState } from 'react';
import { Settings, Bell, Volume2, VolumeX, Vibrate, Clock, MapPin, Trash2, CheckCircle } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { NotificationSettings as NotificationSettingsType } from '@/types/notification';

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, clearAll, getUnreadCount } = useNotifications();
  const [localSettings, setLocalSettings] = useState<NotificationSettingsType>(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    onClose();
  };

  const handleReset = () => {
    setLocalSettings(settings);
  };

  const handleClearAll = () => {
    clearAll();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Notification Settings</h2>
                <p className="text-amber-100">Customize your notification experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <span className="text-white text-xl">×</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Position Settings */}
          <div>
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
              <MapPin className="h-5 w-5 text-amber-600" />
              <span>Notification Position</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'top-right', label: 'Top Right' },
                { value: 'top-left', label: 'Top Left' },
                { value: 'bottom-right', label: 'Bottom Right' },
                { value: 'bottom-left', label: 'Bottom Left' },
                { value: 'top-center', label: 'Top Center' },
                { value: 'bottom-center', label: 'Bottom Center' },
              ].map((position) => (
                <button
                  key={position.value}
                  onClick={() => setLocalSettings(prev => ({ ...prev, position: position.value as any }))}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    localSettings.position === position.value
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-amber-300 text-gray-700'
                  }`}
                >
                  {position.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Settings */}
          <div>
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
              <Clock className="h-5 w-5 text-amber-600" />
              <span>Auto-close Duration</span>
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="1000"
                  value={localSettings.duration}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-gray-700">
                  {localSettings.duration / 1000}s
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>1s</span>
                <span>10s</span>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div>
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
              <Bell className="h-5 w-5 text-amber-600" />
              <span>Display Options</span>
            </label>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-800">Show Progress Bar</h4>
                  <p className="text-sm text-gray-600">Display countdown progress on notifications</p>
                </div>
                <button
                  onClick={() => setLocalSettings(prev => ({ ...prev, showProgress: !prev.showProgress }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    localSettings.showProgress ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    localSettings.showProgress ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-800">Auto-close Notifications</h4>
                  <p className="text-sm text-gray-600">Automatically close notifications after duration</p>
                </div>
                <button
                  onClick={() => setLocalSettings(prev => ({ ...prev, autoClose: !prev.autoClose }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    localSettings.autoClose ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    localSettings.autoClose ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Sound & Vibration Settings */}
          <div>
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
              <Volume2 className="h-5 w-5 text-amber-600" />
              <span>Sound & Vibration</span>
            </label>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  {localSettings.enableSound ? (
                    <Volume2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <VolumeX className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-800">Enable Sound</h4>
                    <p className="text-sm text-gray-600">Play sound for new notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setLocalSettings(prev => ({ ...prev, enableSound: !prev.enableSound }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    localSettings.enableSound ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    localSettings.enableSound ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Vibrate className={`h-5 w-5 ${localSettings.enableVibration ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <h4 className="font-medium text-gray-800">Enable Vibration</h4>
                    <p className="text-sm text-gray-600">Vibrate device for new notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setLocalSettings(prev => ({ ...prev, enableVibration: !prev.enableVibration }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    localSettings.enableVibration ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    localSettings.enableVibration ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Max Notifications */}
          <div>
            <label className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
              <Bell className="h-5 w-5 text-amber-600" />
              <span>Maximum Notifications</span>
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={localSettings.maxNotifications}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, maxNotifications: parseInt(e.target.value) }))}
                  className="flex-1"
                />
                <span className="text-lg font-medium text-gray-700">
                  {localSettings.maxNotifications}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>1</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-center space-x-3">
              <Trash2 className="h-5 w-5 text-red-600" />
              <div>
                <h4 className="font-medium text-red-800">Clear All Notifications</h4>
                <p className="text-sm text-red-600">
                  {getUnreadCount()} unread notifications
                </p>
              </div>
            </div>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-b-2xl">
          <button
            onClick={handleReset}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Reset
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
