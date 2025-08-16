// components/TraitModal.jsx
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const TraitModal = ({
  showTraitModal,
  modalIsForTop,
  searchTerm,
  setSearchTerm,
  customTrait,
  setCustomTrait,
  availableTraits,
  closeTraitModal,
  addTrait,
  addCustomTrait,
  traitCategories
}) => {
  const searchInputRef = useRef(null);
  const customTraitInputRef = useRef(null);

  // useEffect(() => {
  //   if (showTraitModal && searchInputRef.current) {
  //     setTimeout(() => {
  //       searchInputRef.current?.focus();
  //     }, 100);
  //   }
  // }, [showTraitModal]);

  if (!showTraitModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Add Trait to {modalIsForTop ? 'Top Qualities' : 'Regular Qualities'}
          </h3>
          <button
            onClick={closeTraitModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search traits or type to add custom trait..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchTerm.trim() && availableTraits.length === 0) {
                  addCustomTrait(modalIsForTop, searchTerm.trim());
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm.trim() && availableTraits.length === 0 && (
              <button
                onClick={() => addCustomTrait(modalIsForTop, searchTerm.trim())}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add
              </button>
            )}
          </div>
        </div>

        {/* Trait List by Category */}
        <div className="flex-1 overflow-y-auto p-6">
          {Object.entries(traitCategories).map(([category, traits]) => {
            const categoryTraits = traits.filter(trait =>
              availableTraits.includes(trait) &&
              (!searchTerm || trait.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            if (categoryTraits.length === 0) return null;
            return (
              <div key={category} className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                  {category}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {categoryTraits.map((trait) => (
                    <button
                      key={trait}
                      onClick={() => addTrait(trait, modalIsForTop)}
                      className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Other Traits */}
          {(() => {
            const otherTraits = availableTraits.filter(trait =>
              !Object.values(traitCategories).flat().includes(trait) &&
              (!searchTerm || trait.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            if (otherTraits.length === 0) return null;
            return (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                  Other Traits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {otherTraits.map((trait) => (
                    <button
                      key={trait}
                      onClick={() => addTrait(trait, modalIsForTop)}
                      className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {trait}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Fallback Messages */}
          {availableTraits.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No existing traits found matching "{searchTerm}"
              </p>
              <p className="text-sm text-gray-400">
                Press Enter or click the button above to add it as a custom trait
              </p>
            </div>
          )}

          {availableTraits.length === 0 && !searchTerm && (
            <p className="text-gray-500 text-center py-4">
              All default traits have been used. Add a custom trait below.
            </p>
          )}

          {/* Add Custom Trait */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-700 mb-4">Add Custom Trait</h4>
            <div className="flex gap-3">
              <input
                ref={customTraitInputRef}
                type="text"
                placeholder="Enter custom trait..."
                value={customTrait}
                onChange={(e) => setCustomTrait(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomTrait(modalIsForTop)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => addCustomTrait(modalIsForTop)}
                disabled={!customTrait.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={closeTraitModal}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraitModal;
