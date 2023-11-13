import { createContext, FC, PropsWithChildren, useCallback, useState, useMemo } from 'react';

export type Settings = {
  showCanopy: boolean;
  showMapZones: boolean;
}

type SettingsContextValue = {settings: Settings, toggleSetting: (setting: keyof Settings) => void};

const initialSettings: Settings = {
  showCanopy: false,
  showMapZones: false,
}

export const SettingsContext = createContext<SettingsContextValue>({settings: initialSettings, toggleSetting: () => {}});

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const toggleSetting = useCallback((setting: keyof Settings) => {
    setSettings(prev => ({...prev, [setting]: !prev[setting]}));
  }, []);

  const value = useMemo(() => ({settings, toggleSetting}), [settings, toggleSetting])
  
  return <SettingsContext.Provider value={value}>
    {children}
  </SettingsContext.Provider>;
}
