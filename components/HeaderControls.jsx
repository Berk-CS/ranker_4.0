// components/HeaderControls.jsx
import React, { useState } from 'react';
import { Heart, Save, Trash2, User, Users, Star, ChevronDown, ChevronUp } from 'lucide-react';

const HeaderControls = ({
  personName,
  setPersonName,
  saveStatus,
  onSave,
  onClear,
  savedProfiles,
  selectedProfile,
  onProfileSelect,
  onProfileDelete
}) => {
  const [showProfiles, setShowProfiles] = React.useState(false);
  return (
    <div className="space-y-6 mb-8 px-4 sm:px-0">
      {/* Main Header */}
      <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-indigo-200 overflow-hidden">
        {/* Subtle floating elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-6 sm:top-8 sm:right-12 transform rotate-12">
            <Heart className="w-2 h-2 sm:w-3 sm:h-3 text-indigo-500" />
          </div>
          <div className="absolute bottom-4 left-8 sm:bottom-8 sm:left-16 transform -rotate-45">
            <Heart className="w-2 h-2 text-indigo-500" />
          </div>
          <div className="absolute top-8 left-4 sm:top-16 sm:left-8 transform rotate-45">
            <Heart className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-indigo-500" />
          </div>
        </div>
        
        <div className="relative z-10 space-y-6">
          {/* Title & Input Section */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div className="relative flex-shrink-0 mx-auto sm:mx-0">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur opacity-20"></div>
              <div className="relative bg-white p-3 sm:p-4 rounded-full shadow-md border border-indigo-200">
                <Heart className="text-indigo-600" size={24} />
              </div>
            </div>
            
            <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                  Personality Match
                </h1>
              </div>
              
              <p className="text-gray-600 text-base sm:text-lg">Evaluate compatibility and connection</p>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter their name"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base sm:text-lg placeholder-gray-400 shadow-sm transition-all duration-300 hover:shadow-md"
                />
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                  <Heart className="text-indigo-300 w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            {saveStatus && (
              <div className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-md order-first sm:order-none">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium text-sm sm:text-base">{saveStatus}</span>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:ml-auto">
              <button
                onClick={onSave}
                className="group relative flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Save size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-sm sm:text-base">Save Profile</span>
              </button>
              
              <button
                onClick={onClear}
                className="group relative flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Trash2 size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-sm sm:text-base">Clear All</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Profiles Section */}
      {Object.keys(savedProfiles).length > 0 && (
        <div className="relative bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-xl"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                <div className="absolute inset-0 bg-indigo-400 rounded-full blur opacity-20"></div>
                <div className="relative bg-white p-2 sm:p-3 rounded-full shadow-md border border-indigo-200">
                  <Users className="text-indigo-600" size={20} />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  Saved Profiles
                  <Heart className="w-4 h-4 text-indigo-500" />
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {Object.keys(savedProfiles).length} previously evaluated personalities
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowProfiles(!showProfiles)}
              className="group flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all duration-300 shadow-sm hover:shadow-md border border-indigo-200"
            >
              <span className="font-medium text-sm sm:text-base">
                {showProfiles ? 'Hide' : 'Show'} Profiles
              </span>
              {showProfiles ? (
                <ChevronUp size={18} className="group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <ChevronDown size={18} className="group-hover:scale-110 transition-transform duration-200" />
              )}
            </button>
          </div>
          
          {showProfiles && (
            <div className="max-h-80 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
              {Object.entries(savedProfiles)
                .sort((a, b) => (b[1].finalScore || 0) - (a[1].finalScore || 0))
                .map(([name, profile]) => (
                  <div key={name} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-300">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-indigo-400 rounded-full blur opacity-20"></div>
                        <div className="relative bg-indigo-50 p-2 rounded-full border border-indigo-200">
                          <User className="text-indigo-600" size={16} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                          {name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                            <span className="text-xs sm:text-sm font-medium text-gray-600">
                              {profile.finalScore ? `${profile.finalScore}%` : 'N/A'}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 hidden sm:inline">
                            • {profile.timestamp ? new Date(profile.timestamp).toLocaleDateString() : 'Unknown date'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => onProfileSelect(name)}
                        className="group flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 text-xs sm:text-sm font-medium"
                      >
                        <User size={14} className="group-hover:scale-110 transition-transform duration-200" />
                        <span className="hidden sm:inline">Load</span>
                      </button>
                      
                      <button
                        onClick={() => onProfileDelete(name)}
                        className="group flex items-center gap-1 px-2 sm:px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 border border-red-200 text-xs sm:text-sm"
                      >
                        <Trash2 size={14} className="group-hover:scale-110 transition-transform duration-200" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderControls;