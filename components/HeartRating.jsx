// components/HeartRating.jsx
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { scoreMapping, ratingDescriptions } from '../utils/scoreMapping';

const HeartRating = ({ trait, currentRating, updateRating }) => {
  const [hoveredHeart, setHoveredHeart] = useState(0);

  const displayRating = hoveredHeart || currentRating;
  const displayDescription = ratingDescriptions[displayRating];

  return (
    <div className="space-y-3">
      {/* Hearts and Score */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((heart) => (
          <button
            key={heart}
            onClick={() => updateRating(trait, heart)}
            onMouseEnter={() => setHoveredHeart(heart)}
            onMouseLeave={() => setHoveredHeart(0)}
            className={`p-1 rounded transition-colors ${
              heart <= (hoveredHeart || currentRating)
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Heart size={20} fill={heart <= (hoveredHeart || currentRating) ? 'currentColor' : 'none'} />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {currentRating ? `${scoreMapping[currentRating]}%` : 'Not rated'}
        </span>
      </div>

      {/* Description Card */}
      <div className={`p-3 rounded-lg border transition-all duration-200 ${
        displayDescription 
          ? 'bg-rose-50 border-rose-200 opacity-100' 
          : 'bg-gray-50 border-gray-200 opacity-75'
      }`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {displayRating > 0 && (
              <>
                <Heart size={14} className="text-red-500 fill-current" />
                <span className="text-sm font-semibold text-gray-700">
                  {displayRating}
                </span>
              </>
            )}
          </div>
          <span className={`text-sm ${
            displayDescription ? 'text-rose-700 font-medium' : 'text-gray-500'
          }`}>
            {displayDescription || 'Hover over hearts to see descriptions'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeartRating;