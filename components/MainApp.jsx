
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TraitModal from './TraitModal';
import TraitList from './TraitList';
import HeaderControls from './HeaderControls';
import getGradeDescription from '../utils/getGradeDescriptions';
import { scoreMapping } from '../utils/scoreMapping';
import useLocalStorageSync from '../hooks/useLocalStorageSync';
import AuthHeader from './AuthHeader';
import { useAuth } from 'react-oidc-context';
import { useIdToken } from '../hooks/useIdToken';


const MainApp = () => {
  const [topQualitiesWeight, setTopQualitiesWeight] = useState(60);
  const [regularQualitiesWeight, setRegularQualitiesWeight] = useState(40);
  const [selectedTopTraits, setSelectedTopTraits] = useState([]);
  const [selectedRegularTraits, setSelectedRegularTraits] = useState([]);
  const [ratings, setRatings] = useState({});
  const [showTraitModal, setShowTraitModal] = useState(false);
  const [modalIsForTop, setModalIsForTop] = useState(true);
  const [customTrait, setCustomTrait] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [personName, setPersonName] = useState('');
  const [finalScore, setFinalScore] = useState(0);
  const [saveStatus, setSaveStatus] = useState('');

  const [savedProfiles, setSavedProfiles] = useState({});
  const [selectedProfile, setSelectedProfile] = useState('');
  const token = useIdToken(); 
  const auth = useAuth();

  const traitCategories = {
    'Character & Values': [
      'God fearing', 'Honest', 'Loyal', 'Takes accountablity', 'Trustworthy',
      'Understands me', 'Respects me', 'Likes me', 'Dominant', 'Submissive', 'Masculine',
      'Feminine','Kind', 'Patient', 'Mature', 'Puts effort'
    ],
    'Fun & Enjoyable': [
      'Humourous', 'Creative', 'Optimistic', 'Shared Interests',
      'Confident', 'Adaptable', 'Intelligent', 'Open-minded', 'Spontaneous', 
      'Passionate', 'playful', 'supportive'
    ]
  };

  const allDefaultTraits = [
    ...traitCategories['Fun & Enjoyable'],
    ...traitCategories['Character & Values'],
    'Emotional Intelligence', 'Communication Skills', 'Ambition',
    'Boldness'
  ];

  const availableTraits = useMemo(() => {
    const used = [...selectedTopTraits, ...selectedRegularTraits];
    const available = allDefaultTraits.filter(trait => !used.includes(trait));
    return searchTerm
      ? available.filter(trait => trait.toLowerCase().includes(searchTerm.toLowerCase()))
      : available;
  }, [selectedTopTraits, selectedRegularTraits, searchTerm]);

  useEffect(() => {
    const topScores = selectedTopTraits
      .filter(trait => ratings[trait] !== -1)
      .map(trait => scoreMapping[ratings[trait]] || 0);
    const regScores = selectedRegularTraits
      .filter(trait => ratings[trait] !== -1)
      .map(trait => scoreMapping[ratings[trait]] || 0);
  
    const topAvg = topScores.length ? topScores.reduce((a, b) => a + b, 0) / topScores.length : 0;
    const regAvg = regScores.length ? regScores.reduce((a, b) => a + b, 0) / regScores.length : 0;
  
    const weighted = (topAvg * (topQualitiesWeight / 100)) + (regAvg * (regularQualitiesWeight / 100));
    setFinalScore(Math.round(weighted * 100) / 100);
  }, [ratings, selectedTopTraits, selectedRegularTraits, topQualitiesWeight, regularQualitiesWeight]);
  
  // Auto-load and save preferences (traits + weights only)
  useLocalStorageSync({
    key: 'traitPreferences',
    initialLoad: (saved) => {
      if (saved.selectedTopTraits) setSelectedTopTraits(saved.selectedTopTraits);
      if (saved.selectedRegularTraits) setSelectedRegularTraits(saved.selectedRegularTraits);
      if (saved.topQualitiesWeight !== undefined) setTopQualitiesWeight(saved.topQualitiesWeight);
      if (saved.regularQualitiesWeight !== undefined) setRegularQualitiesWeight(saved.regularQualitiesWeight);
    },
    getDataToSave: () => ({
      selectedTopTraits,
      selectedRegularTraits,
      topQualitiesWeight,
      regularQualitiesWeight
    }),
    dependencies: [
      selectedTopTraits,
      selectedRegularTraits,
      topQualitiesWeight,
      regularQualitiesWeight
    ],
    onStatusChange: setSaveStatus
  });

  // Load saved profiles once
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const response = await fetch('https://intdt-api.work/api/get-profiles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch profiles from DB');
        }
  
        const data = await response.json();
        setSavedProfiles(data);
      } catch (err) {
        console.error('Failed to load saved profiles from DB', err);
      }
    };
  
    if (token) {
      loadProfiles();
    }
  }, [token]);

  const handleProfileSelect = (name) => {
    const profile = savedProfiles[name];
    if (profile) {
      setRatings(profile.ratings || {});
      setPersonName(profile.personName || '');
      setSelectedProfile(name);
    }
  };

  const handleProfileDelete = async (name) => {
    if (!window.confirm(`Delete profile "${name}"?`)) return;
  
    try {
      const response = await fetch('https://intdt-api.work/api/delete-profile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ personName: name }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }
  
      // Update local state after successful DB delete
      const updated = { ...savedProfiles };
      delete updated[name];
      setSavedProfiles(updated);
  
      if (selectedProfile === name) {
        setSelectedProfile('');
        setRatings({});
        setPersonName('');
      }
  
      setSaveStatus('Profile deleted');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error deleting profile:', error);
      setSaveStatus('Delete failed');
    }
  };
  



  const manualSave = async () => {
    if (!personName.trim()) {
      alert('Please enter a name before saving.');
      return;
    }
    const newProfile = {
      ratings,
      personName,
      finalScore,
      timestamp: new Date().toISOString(),
    };

    if (!token) {  
      // Save intended action
      sessionStorage.setItem('pendingSave', JSON.stringify(newProfile));
      console.warn('No access token found. Redirecting to login...');
      auth.signinRedirect();  // 🔁 Redirect to login
      return;
    }
   
    try {
      const response = await fetch('https://intdt-api.work/api/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProfile),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setSaveStatus(`Saved profile: ${personName}`);
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Failed to save profile', error);
      setSaveStatus('Save failed');
    }
  };

  useEffect(() => {
    const pending = sessionStorage.getItem('pendingSave');
    if (pending && token) {
      const parsed = JSON.parse(pending);
      sessionStorage.removeItem('pendingSave');
  
      fetch('https://intdt-api.work/api/save-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsed),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to auto-save');
          return res.json();
        })
        .then(() => {
          setSaveStatus(`Saved profile: ${parsed.personName}`);
          setTimeout(() => setSaveStatus(''), 3000);
          // update local state with new profile
          setPersonName(parsed.personName);
          setRatings(parsed.ratings);
          setSelectedProfile(parsed.personName);

          // update saved profiles
          setSavedProfiles((prev) => ({
            ...prev,
            [parsed.personName]: parsed,
          }));
        })
        .catch((err) => {
          console.error('Auto-save after login failed:', err);
          setSaveStatus('Auto-save failed');
        });
    }
  }, [token]);

  const clearAllData = () => {
    if (!window.confirm('Clear all current person data?')) return;
    setRatings({});
    setPersonName('');
    setSelectedProfile('');
    setSaveStatus('Cleared');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const openTraitModal = useCallback((isTop) => {
    setModalIsForTop(isTop);
    setShowTraitModal(true);
    setSearchTerm('');
    setCustomTrait('');
  }, []);

  const closeTraitModal = useCallback(() => {
    setShowTraitModal(false);
    setSearchTerm('');
    setCustomTrait('');
  }, []);

  const addTrait = useCallback((trait, isTop) => {
    if (isTop && !selectedTopTraits.includes(trait)) {
      setSelectedTopTraits(prev => [...prev, trait]);
    } else if (!isTop && !selectedRegularTraits.includes(trait)) {
      setSelectedRegularTraits(prev => [...prev, trait]);
    }
    closeTraitModal();
  }, [selectedTopTraits, selectedRegularTraits, closeTraitModal]);

  const addCustomTrait = useCallback((isTop, traitName = null) => {
    const trait = traitName || customTrait.trim();
    if (!trait) return;
    const used = [...selectedTopTraits, ...selectedRegularTraits];
    if (!used.includes(trait)) {
      isTop
        ? setSelectedTopTraits(prev => [...prev, trait])
        : setSelectedRegularTraits(prev => [...prev, trait]);
    }
    closeTraitModal();
  }, [customTrait, selectedTopTraits, selectedRegularTraits, closeTraitModal]);

  const removeTrait = (trait, isTop) => {
    isTop
      ? setSelectedTopTraits(traits => traits.filter(t => t !== trait))
      : setSelectedRegularTraits(traits => traits.filter(t => t !== trait));

    const newRatings = { ...ratings };
    delete newRatings[trait];
    setRatings(newRatings);
  };

  const updateRating = (trait, rating) => {
    setRatings(prev => ({ ...prev, [trait]: rating }));
  };

  const handleWeightChange = (value, isTop) => {
    const num = Math.max(0, Math.min(100, parseInt(value) || 0));
    if (isTop) {
      setTopQualitiesWeight(num);
      setRegularQualitiesWeight(100 - num);
    } else {
      setRegularQualitiesWeight(num);
      setTopQualitiesWeight(100 - num);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">      
        <AuthHeader />  {/*login/logout */}
        <HeaderControls
          personName={personName}
          setPersonName={setPersonName}
          saveStatus={saveStatus}
          onSave={manualSave}
          onClear={clearAllData}
          savedProfiles={savedProfiles}
          selectedProfile={selectedProfile}
          onProfileSelect={handleProfileSelect}
          onProfileDelete={handleProfileDelete}
        />
  
        {/* Weight Controls */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Category Weights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Top Qualities Weight</label>
              <input
                type="number"
                value={topQualitiesWeight}
                onChange={(e) => handleWeightChange(e.target.value, true)}
                className="w-20 px-2 py-1 border border-gray-300 rounded"
              /> %
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Regular Qualities Weight</label>
              <input
                type="number"
                value={regularQualitiesWeight}
                onChange={(e) => handleWeightChange(e.target.value, false)}
                className="w-20 px-2 py-1 border border-gray-300 rounded"
              /> %
            </div>
          </div>
          {(topQualitiesWeight + regularQualitiesWeight !== 100) && (
            <p className="text-red-600 text-sm mt-2">⚠️ Weights must sum to 100%</p>
          )}
        </div>
  
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <TraitList
            title="Qualities you value most"
            traits={selectedTopTraits}
            ratings={ratings}
            onRemove={removeTrait}
            updateRating={updateRating}
            openModal={openTraitModal}
            isTop={true}
            weight={topQualitiesWeight}
          />
  
          <TraitList
            title="Regular Qualities"
            traits={selectedRegularTraits}
            ratings={ratings}
            onRemove={removeTrait}
            updateRating={updateRating}
            openModal={openTraitModal}
            isTop={false}
            weight={regularQualitiesWeight}
          />
        </div>
  
        <TraitModal
          showTraitModal={showTraitModal}
          modalIsForTop={modalIsForTop}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          customTrait={customTrait}
          setCustomTrait={setCustomTrait}
          availableTraits={availableTraits}
          closeTraitModal={closeTraitModal}
          addTrait={addTrait}
          addCustomTrait={addCustomTrait}
          traitCategories={traitCategories}
        />
  
        {/* Mobile-Friendly Final Score Section */}
        <div className="mt-8">
          {/* Unsure Traits Warning */}
          {(() => {
            const allTraits = [...selectedTopTraits, ...selectedRegularTraits];
            const unsureCount = allTraits.filter(trait => ratings[trait] === -1).length;
            const totalTraits = allTraits.length;
            const unsurePercentage = totalTraits > 0 ? (unsureCount / totalTraits) * 100 : 0;
            
            if (unsurePercentage >= 30) {
              return (
                <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-amber-800">
                        Score May Be Less Accurate
                      </h3>
                      <div className="mt-1 text-sm text-amber-700">
                        <p>
                          You've marked {unsureCount} out of {totalTraits} traits ({Math.round(unsurePercentage)}%) as "unsure". 
                          Consider gathering more information for a more reliable assessment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })()}
  
          {/* Final Score Card */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8 text-white">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                  Final Score 
                  {personName && (
                    <span className="block sm:inline sm:ml-2 text-lg sm:text-xl lg:text-2xl font-semibold opacity-90 mt-1 sm:mt-0">
                      for {personName}
                    </span>
                  )}
                </h2>
              </div>
  
              {/* Score Display - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                {/* Score Number */}
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-2">
                    {finalScore}
                  </div>
                  <div className="text-lg sm:text-xl opacity-90 font-medium">
                    Score
                  </div>
                </div>
  
                {/* Divider - Hidden on mobile */}
                <div className="hidden sm:block w-px h-16 bg-white/30"></div>
                
                {/* Grade Description */}
                <div className="text-center sm:text-left flex-1 max-w-xs sm:max-w-none">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                    {getGradeDescription(finalScore)}
                  </div>
                </div>
              </div>
  
              {/* No Score Message */}
              {finalScore === 0 && (
                <div className="mt-6 pt-6 border-t border-white/20 text-center">
                  <p className="text-base sm:text-lg opacity-90">
                    Add traits and ratings to calculate your score
                  </p>
                </div>
              )}
  
              {/* Additional Info for Valid Scores */}
              {finalScore > 0 && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">
                        {[...selectedTopTraits, ...selectedRegularTraits].length}
                      </div>
                      <div className="text-sm opacity-75">Total Traits</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {[...selectedTopTraits, ...selectedRegularTraits].filter(trait => ratings[trait] > 0).length}
                      </div>
                      <div className="text-sm opacity-75">Rated Traits</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {[...selectedTopTraits, ...selectedRegularTraits].filter(trait => ratings[trait] === -1).length}
                      </div>
                      <div className="text-sm opacity-75">Unsure Traits</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h3>
              <p className="text-gray-600 mb-4">
                Have questions or feedback? We'd love to hear from you!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:dkworldink@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                  dkworldink@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-800 transition-colors">
                  +1 (234) 567-intentional-dating
                </a>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>&copy; 2025 intentional-dating.com All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainApp;