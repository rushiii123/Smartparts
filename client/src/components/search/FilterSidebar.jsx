import { useState } from 'react';
import { Filter, ChevronDown, Check, X } from 'lucide-react';

const FilterItem = ({ title, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOption = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((item) => item !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="mb-6">
      <button
        className="flex w-full items-center justify-between pb-2 font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {options.map((option) => (
            <label key={option.id} className="flex items-center">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selected.includes(option.id)}
                  onChange={() => toggleOption(option.id)}
                />
                <div
                  className={`h-5 w-5 rounded border flex items-center justify-center ${
                    selected.includes(option.id)
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selected.includes(option.id) && (
                    <Check size={12} className="text-white" />
                  )}
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-700">{option.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const PriceRange = ({ min, max, value, onChange }) => {
  const [localMin, setLocalMin] = useState(value[0].toString());
  const [localMax, setLocalMax] = useState(value[1].toString());

  const handleMinChange = (e) => {
    setLocalMin(e.target.value);
  };

  const handleMaxChange = (e) => {
    setLocalMax(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMin = Math.max(min, parseInt(localMin, 10) || min);
    const newMax = Math.min(max, parseInt(localMax, 10) || max);

    onChange([newMin, newMax > newMin ? newMax : max]);
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-2">
          <div className="w-1/2">
            <label className="block text-xs text-gray-600 mb-1">Min</label>
            <input
              type="number"
              min={min}
              max={max}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={localMin}
              onChange={handleMinChange}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-xs text-gray-600 mb-1">Max</label>
            <input
              type="number"
              min={min}
              max={max}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={localMax}
              onChange={handleMaxChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 w-full py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

const categories = [
  { id: 'automotive', name: 'Automotive' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'machinery', name: 'Machinery' },
  { id: 'tools', name: 'Tools' },
  { id: 'plumbing', name: 'Plumbing' },
  { id: 'appliances', name: 'Appliances' },
  { id: 'commercial', name: 'Commercial' },
];

const brands = [
  { id: 'toyota', name: 'Toyota' },
  { id: 'honda', name: 'Honda' },
  { id: 'ford', name: 'Ford' },
  { id: 'bmw', name: 'BMW' },
  { id: 'bosch', name: 'Bosch' },
  { id: 'denso', name: 'Denso' },
  { id: 'continental', name: 'Continental' },
];

const conditions = [
  { id: 'new', name: 'New' },
  { id: 'used', name: 'Used' },
  { id: 'refurbished', name: 'Refurbished' },
];

const availability = [
  { id: 'in_stock', name: 'In Stock' },
  { id: 'out_of_stock', name: 'Out of Stock' },
];

const FilterSidebar = ({ filters, onChange, onReset, isMobile, onClose }) => {
  const updateFilter = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className={`bg-white ${isMobile ? 'p-4 rounded-lg shadow-lg' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-lg font-semibold text-gray-900">
          <Filter size={20} className="mr-2" />
          <span>Filters</span>
        </div>

        {isMobile && (
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        )}

        <button
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={onReset}
        >
          Reset All
        </button>
      </div>

      <FilterItem
        title="Category"
        options={categories}
        selected={filters.categories}
        onChange={(selected) => updateFilter('categories', selected)}
      />

      <FilterItem
        title="Brand"
        options={brands}
        selected={filters.brands}
        onChange={(selected) => updateFilter('brands', selected)}
      />

      <div className="mb-6">
        <button
          className="flex w-full items-center justify-between pb-2 font-medium text-gray-900"
        >
          <span>Price Range</span>
        </button>

        <PriceRange
          min={0}
          max={5000}
          value={filters.priceRange}
          onChange={(value) => updateFilter('priceRange', value)}
        />
      </div>

      <FilterItem
        title="Condition"
        options={conditions}
        selected={filters.conditions}
        onChange={(selected) => updateFilter('conditions', selected)}
      />

      <FilterItem
        title="Availability"
        options={availability}
        selected={filters.availability}
        onChange={(selected) => updateFilter('availability', selected)}
      />

      <div className="mb-6">
        <div className="flex w-full items-center justify-between pb-2 font-medium text-gray-900">
          <span>Distance (miles)</span>
          <span>{filters.distance} mi</span>
        </div>

        <input
          type="range"
          min={5}
          max={100}
          step={5}
          value={filters.distance}
          onChange={(e) => updateFilter('distance', parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>5 mi</span>
          <span>50 mi</span>
          <span>100 mi</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
