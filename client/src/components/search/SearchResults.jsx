import { useState } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import Button from '../shared/Button';
import FilterSidebar from './FilterSidebar';

// Mock data for product results
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Alternator - Toyota Camry 2012-2015',
    price: 129.99,
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'AutoZone North',
      rating: 4.7,
      distance: 2.3,
      location: '123 Main St, Anytown, USA',
      phone: '(555) 123-4567',
    },
    inStock: true,
    condition: 'New',
    partNumber: 'ALT-4589-TC',
  },
  {
    id: '2',
    name: 'Brake Pads - Honda Civic 2016-2020',
    price: 54.99,
    image: 'https://images.pexels.com/photos/6517323/pexels-photo-6517323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'O\'Reilly Auto Parts',
      rating: 4.5,
      distance: 3.1,
      location: '456 Oak Ave, Anytown, USA',
      phone: '(555) 234-5678',
    },
    inStock: true,
    condition: 'New',
    partNumber: 'BP-2347-HC',
  },
  {
    id: '3',
    name: 'Fuel Pump - Ford F-150 2014-2018',
    price: 179.99,
    image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'NAPA Auto Parts',
      rating: 4.2,
      distance: 5.7,
      location: '789 Pine St, Anytown, USA',
      phone: '(555) 345-6789',
    },
    inStock: false,
    condition: 'New',
    partNumber: 'FP-7823-FF',
  },
  {
    id: '4',
    name: 'Timing Belt Kit - Volkswagen Golf 2013-2017',
    price: 89.99,
    image: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'Advance Auto Parts',
      rating: 4.8,
      distance: 1.9,
      location: '101 Elm St, Anytown, USA',
      phone: '(555) 456-7890',
    },
    inStock: true,
    condition: 'New',
    partNumber: 'TB-3481-VG',
  },
  {
    id: '5',
    name: 'Water Pump - BMW 3 Series 2012-2016',
    price: 149.99,
    image: 'https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'BMW Dealership',
      rating: 4.9,
      distance: 8.2,
      location: '222 Luxury Ln, Richtown, USA',
      phone: '(555) 567-8901',
    },
    inStock: true,
    condition: 'New',
    partNumber: 'WP-9275-BMW',
  },
  {
    id: '6',
    name: 'Refurbished AC Compressor - Audi A4 2014-2017',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    vendor: {
      name: 'European Auto Parts',
      rating: 4.6,
      distance: 4.5,
      location: '333 Continental Dr, Anytown, USA',
      phone: '(555) 678-9012',
    },
    inStock: true,
    condition: 'Refurbished',
    partNumber: 'AC-6142-AA',
  },
];

export default function SearchResults({ searchTerm, category }) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: category ? [category] : [],
    brands: [],
    conditions: [],
    availability: [],
    priceRange: [0, 5000],
    distance: 50,
  });

  // Filter products
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (filters.conditions.length > 0) {
      const conditionMap = {
        'new': 'New',
        'used': 'Used',
        'refurbished': 'Refurbished',
      };
      if (!filters.conditions.some(c => conditionMap[c] === product.condition)) {
        return false;
      }
    }

    if (filters.availability.length > 0) {
      if (filters.availability.includes('in_stock') && !product.inStock) {
        return false;
      }
      if (filters.availability.includes('out_of_stock') && product.inStock) {
        return false;
      }
    }

    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    if (product.vendor.distance > filters.distance) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'distance':
        return a.vendor.distance - b.vendor.distance;
      default:
        return 0;
    }
  });

  const resetFilters = () => {
    setFilters({
      categories: category ? [category] : [],
      brands: [],
      conditions: [],
      availability: [],
      priceRange: [0, 5000],
      distance: 50,
    });
  };

  return (
    <div className="w-full">
      {/* Results header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm
              ? `Results for "${searchTerm}"`
              : category
                ? `Browse ${category}`
                : 'All Parts'}
          </h2>
          <p className="text-gray-600">{sortedProducts.length} results found</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            icon={<SlidersHorizontal size={16} />}
            className="sm:hidden"
            onClick={() => setShowMobileFilters(true)}
          >
            Filters
          </Button>

          <div className="flex gap-2">
            <div className="inline-flex border border-gray-300 rounded-md overflow-hidden">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product results */}
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>

      {/* Filter Sidebar for mobile */}
      <FilterSidebar
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />
    </div>
  );
}
