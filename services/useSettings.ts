
import { useState, useEffect } from 'react';

export interface AppSettings {
  anomalyThreshold: number;
  minCostThreshold: number;
}

const DEFAULT_SETTINGS: AppSettings = {
  anomalyThreshold: 20,
  minCostThreshold: 100,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('optimizer_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('optimizer_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
};
