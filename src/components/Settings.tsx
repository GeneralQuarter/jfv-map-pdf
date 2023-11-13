import { FC, useMemo } from 'react';
import { useSettings } from '../hooks/use-settings';
import type { Settings } from '../contexts/settings';

const Settings: FC = () => {
  const {settings, toggleSetting} = useSettings();
  const settingKeys = useMemo(() => Object.keys(settings), [settings]) as (keyof Settings)[];

  return <>
    {settingKeys.map(settingKey => (
      <label key={settingKey}>
        <input name={settingKey} type='checkbox' checked={settings[settingKey]} onChange={() => toggleSetting(settingKey)} />
        <span>{settingKey}</span>
      </label>
    ))}
  </>;
}

export default Settings;
