import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

// Mock data for autocomplete
const AUTOCOMPLETE_ITEMS = [
  'Alternator Toyota Camry 2012',
  'Brake pads Honda Civic 2018',
  'Fuel pump Ford F-150 2015',
  'Timing belt Volkswagen Golf 2016',
  'Oil filter Mazda 3 2019',
  'Spark plugs Chevrolet Silverado 2017',
  'Water pump BMW 3 Series 2014',
  'Radiator Audi A4 2013',
  'Battery Hyundai Elantra 2020',
  'Transmission fluid Nissan Altima 2011',
];

export default function SearchBar({ 
  variant = 'default', 
  showButton = true,
  placeholder = 'Search for spare parts...',
  className = ''
}) {
  const { searchTerm, setSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteItems, setAutocompleteItems] = useState([]);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        autocompleteRef.current && 
        !autocompleteRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setShowAutocomplete(false);
      return;
    }

    const filtered = AUTOCOMPLETE_ITEMS.filter(item => 
      item.toLowerCase().includes(value.toLowerCase())
    );
    
    setAutocompleteItems(filtered);
    setShowAutocomplete(filtered.length > 0);
  };

  const handleSelectAutocomplete = (item) => {
    setInputValue(item);
    setSearchTerm(item);
    setShowAutocomplete(false);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchTerm('');
    setShowAutocomplete(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchTerm(inputValue);
      navigate('/search');
    }
  };

  const variantClasses = {
    default: 'h-10 text-base',
    large: 'h-14 text-lg'
  };

  return (
    <div className={`w-full relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400" size={variant === 'large' ? 24 : 20} />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${variantClasses[variant]}`}
            onFocus={() => inputValue && setShowAutocomplete(autocompleteItems.length > 0)}
          />
          
          {inputValue && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={handleClear}
            >
              <X size={18} />
            </button>
          )}
        </div>
        
        {showButton && (
          <Button 
            type="submit" 
            className={`rounded-l-none ${variantClasses[variant]}`}
          >
            Search
          </Button>
        )}
      </form>
      
      {showAutocomplete && (
        <div 
          ref={autocompleteRef} 
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <ul>
            {autocompleteItems.map((item, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectAutocomplete(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
