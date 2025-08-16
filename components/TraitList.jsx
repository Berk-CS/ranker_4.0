// components/TraitList.jsx
import React from 'react';
import { Plus, X, HelpCircle } from 'lucide-react';
import StarRating from './HeartRating';

const TraitList = ({
  title,
  traits,
  ratings,
  onRemove,
  updateRating,
  openModal,
  isTop,
  weight
}) => {
  const handleUnsureClick = (trait) => {
    // Set rating to a special value (like -1) to indicate "unsure"
    updateRating(trait, -1);
  };

  const isUnsure = (trait) => {
    return ratings[trait] === -1;
  };

  return (
    <div className={`${isTop ? 'bg-blue-50' : 'bg-green-50'} rounded-xl p-4 sm:p-6 shadow-sm`}>
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className={`text-lg sm:text-xl font-bold ${isTop ? 'text-blue-800' : 'text-green-800'} leading-tight`}>
          {title} 
          <span className="block sm:inline text-sm sm:text-base font-medium opacity-75 mt-1 sm:mt-0 sm:ml-1">
            ({weight}%)
          </span>
        </h2>
        <button
          onClick={() => openModal(isTop)}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 ${
            isTop ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
          } text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md w-full sm:w-auto`}
        >
          <Plus size={18} className="sm:w-4 sm:h-4" />
          <span className="text-sm sm:text-base">Add Trait</span>
        </button>
      </div>

      {/* Traits List - Mobile Optimized */}
      <div className="space-y-3 sm:space-y-4 max-h-96 sm:max-h-[28rem] overflow-y-auto">
        {traits.map((trait) => (
          <div key={trait} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Trait Header */}
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-semibold text-gray-900 flex-1 pr-3 text-base sm:text-lg leading-tight">
                {trait}
              </h4>
              <button
                onClick={() => onRemove(trait, isTop)}
                className="text-red-400 hover:text-red-600 active:text-red-700 transition-colors flex-shrink-0 p-1 hover:bg-red-50 rounded-lg"
                aria-label={`Remove ${trait}`}
              >
                <X size={18} className="sm:w-4 sm:h-4" />
              </button>
            </div>
            
            {/* Rating Content */}
            {isUnsure(trait) ? (
              <div className="space-y-4">
                {/* Unsure Status */}
                <div className="flex items-center justify-center gap-3 px-4 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="text-amber-800 font-semibold text-sm sm:text-base text-center">
                    Unsure - Need More Info
                  </span>
                </div>
                {/* Clear Button */}
                <button
                  onClick={() => updateRating(trait, 0)}
                  className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 rounded-xl transition-all duration-200 font-medium text-sm sm:text-base shadow-sm"
                >
                  Clear & Rate Instead
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Star Rating */}
                <div className="px-1">
                  <StarRating
                    trait={trait}
                    currentRating={ratings[trait] || 0}
                    updateRating={updateRating}
                  />
                </div>
                
                {/* Unsure Button */}
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => handleUnsureClick(trait)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 active:from-amber-200 active:to-orange-200 text-amber-700 rounded-xl transition-all duration-200 font-medium border border-amber-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                  >
                    <HelpCircle size={16} />
                    <span>Mark as Unsure</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {traits.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="max-w-sm mx-auto">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${
                isTop ? 'bg-blue-100' : 'bg-green-100'
              } flex items-center justify-center`}>
                <Plus className={`w-8 h-8 ${isTop ? 'text-blue-500' : 'text-green-500'}`} />
              </div>
              <p className="text-gray-600 text-base sm:text-lg font-medium mb-2">
                No traits selected yet
              </p>
              <p className="text-gray-500 text-sm">
                Click "Add Trait" to get started with your evaluation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraitList;