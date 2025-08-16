// hooks/useLocalStorageSync.js
import { useEffect } from 'react';

const useLocalStorageSync = ({
  key,
  initialLoad = () => {},
  getDataToSave = () => ({}),
  dependencies = [],
  onStatusChange = null
}) => {
  // Load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        initialLoad(parsed);
      }
    } catch (err) {
      console.error(`Error loading ${key} from localStorage`, err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save on changes
  useEffect(() => {
    const data = { ...getDataToSave(), lastSaved: new Date().toISOString() };
    try {
      localStorage.setItem(key, JSON.stringify(data));
      if (onStatusChange) {
        onStatusChange('Preferences auto-saved');
        const timeout = setTimeout(() => onStatusChange(''), 2000);
        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.error(`Error saving ${key} to localStorage`, err);
      if (onStatusChange) onStatusChange('Save failed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useLocalStorageSync;
