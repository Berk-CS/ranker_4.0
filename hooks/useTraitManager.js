import { useCallback, useEffect, useState } from 'react';
import { loadData, saveData } from '../utils/useLocalStorageSync';

export const useTraitManager = (scoreMapping) => {
  const [selectedTopTraits, setSelectedTopTraits] = useState([]);
  const [selectedRegularTraits, setSelectedRegularTraits] = useState([]);
  const [ratings, setRatings] = useState({});
  const [topQualitiesWeight, setTopQualitiesWeight] = useState(60);
  const [regularQualitiesWeight, setRegularQualitiesWeight] = useState(40);
  const [personName, setPersonName] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const data = loadData();
    if (data.selectedTopTraits) setSelectedTopTraits(data.selectedTopTraits);
    if (data.selectedRegularTraits) setSelectedRegularTraits(data.selectedRegularTraits);
    if (data.ratings) setRatings(data.ratings);
    if (data.personName) setPersonName(data.personName);
    if (data.topQualitiesWeight !== undefined) setTopQualitiesWeight(data.topQualitiesWeight);
    if (data.regularQualitiesWeight !== undefined) setRegularQualitiesWeight(data.regularQualitiesWeight);
  }, []);

  useEffect(() => {
    const success = saveData({
      selectedTopTraits,
      selectedRegularTraits,
      ratings,
      personName,
      topQualitiesWeight,
      regularQualitiesWeight,
      lastSaved: new Date().toISOString()
    });

    setSaveStatus(success ? 'Auto-saved' : 'Save failed');
    const timer = setTimeout(() => setSaveStatus(''), 2000);
    return () => clearTimeout(timer);
  }, [selectedTopTraits, selectedRegularTraits, ratings, personName, topQualitiesWeight, regularQualitiesWeight]);

  const updateRating = (trait, rating) => {
    setRatings(prev => ({ ...prev, [trait]: rating }));
  };

  const addTrait = useCallback((trait, isTop) => {
    if (isTop) {
      if (!selectedTopTraits.includes(trait)) setSelectedTopTraits(prev => [...prev, trait]);
    } else {
      if (!selectedRegularTraits.includes(trait)) setSelectedRegularTraits(prev => [...prev, trait]);
    }
  }, [selectedTopTraits, selectedRegularTraits]);

  const removeTrait = (trait, isTop) => {
    if (isTop) {
      setSelectedTopTraits(prev => prev.filter(t => t !== trait));
    } else {
      setSelectedRegularTraits(prev => prev.filter(t => t !== trait));
    }
    setRatings(prev => {
      const newRatings = { ...prev };
      delete newRatings[trait];
      return newRatings;
    });
  };

  const handleWeightChange = (value, isTop) => {
    const numValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    if (isTop) {
      setTopQualitiesWeight(numValue);
      setRegularQualitiesWeight(100 - numValue);
    } else {
      setRegularQualitiesWeight(numValue);
      setTopQualitiesWeight(100 - numValue);
    }
  };

  const manualSave = () => {
    const success = saveData({
      selectedTopTraits,
      selectedRegularTraits,
      ratings,
      personName,
      topQualitiesWeight,
      regularQualitiesWeight,
      lastSaved: new Date().toISOString()
    });
    setSaveStatus(success ? 'Manually saved' : 'Save failed');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setSelectedTopTraits([]);
      setSelectedRegularTraits([]);
      setRatings({});
      setPersonName('');
      setTopQualitiesWeight(60);
      setRegularQualitiesWeight(40);
      localStorage.removeItem('personalityRatingData');
      setSaveStatus('All data cleared');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  return {
    selectedTopTraits,
    selectedRegularTraits,
    ratings,
    topQualitiesWeight,
    regularQualitiesWeight,
    personName,
    setPersonName,
    saveStatus,
    updateRating,
    addTrait,
    removeTrait,
    handleWeightChange,
    manualSave,
    clearAllData,
  };
};
