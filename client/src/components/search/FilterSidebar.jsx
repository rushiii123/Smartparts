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
    <div className="border-b pb-4 mb-4">
      <button
        className="flex w-full items-center justify-between font-medium text-gray-800 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {options.map((option) => (
            <label key={option.id} className="flex items-center text-sm text-gray-700">
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
              <span className="ml-3">{option.name}</span>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMin = Math.max(min, parseInt(localMin, 10) || min);
    const newMax = Math.min(max, parseInt(localMax, 10) || max);
    onChange([newMin, newMax > newMin ? newMax : max]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-xs text-gray-500">Min</label>
          <input
            type="number"
            className="w-full p-2 border rounded text-sm"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500">Max</label>
          <input
            type="number"
            className="w-full p-2 border rounded text-sm"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700"
      >
        Apply
      </button>
    </form>
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
    <aside className="w-full p-4 md:w-64 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Filter size={18} />
          Filters
        </div>
        {isMobile && (
          <button onClick={onClose}>
            <X size={18} className="text-gray-500 hover:text-gray-700" />
          </button>
        )}
        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={onReset}
        >
          Reset
        </button>
      </div>

      <FilterItem
        title="Category"
        options={categories}
        selected={filters.categories}
        onChange={(v) => updateFilter('categories', v)}
      />
      <FilterItem
        title="Brand"
        options={brands}
        selected={filters.brands}
        onChange={(v) => updateFilter('brands', v)}
      />
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-2">Price Range</h3>
        <PriceRange
          min={0}
          max={5000}
          value={filters.priceRange}
          onChange={(v) => updateFilter('priceRange', v)}
        />
      </div>
      <FilterItem
        title="Condition"
        options={conditions}
        selected={filters.conditions}
        onChange={(v) => updateFilter('conditions', v)}
      />
      <FilterItem
        title="Availability"
        options={availability}
        selected={filters.availability}
        onChange={(v) => updateFilter('availability', v)}
      />

      <div className="mb-6">
        <label className="font-medium text-gray-800 mb-2 block">Distance</label>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>5 mi</span>
          <span>50 mi</span>
          <span>100 mi</span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          step={5}
          value={filters.distance}
          onChange={(e) =>
            updateFilter('distance', parseInt(e.target.value, 10))
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
