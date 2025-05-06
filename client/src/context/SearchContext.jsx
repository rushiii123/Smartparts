import { createContext, useContext, useState } from 'react';

// Remove the TypeScript type `SearchMethod` since it's not needed in JSX
const SearchContext = createContext(undefined);

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMethod, setSearchMethod] = useState('text');  // Default is 'text'
  const [searchImage, setSearchImage] = useState(null);
  const [category, setCategory] = useState('');

  const clearSearch = () => {
    setSearchTerm('');
    setSearchImage(null);
    setCategory('');
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        searchMethod,
        searchImage,
        category,
        setSearchTerm,
        setSearchMethod,
        setSearchImage,
        setCategory,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
