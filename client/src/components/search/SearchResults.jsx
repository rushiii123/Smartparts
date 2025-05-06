import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import Button from '../shared/Button';
import FilterSidebar from './FilterSidebar';
import axios from 'axios';

const CATEGORY_MAP = {
  Automotive: ["Brakes", "Engine", "Cooling System", "Body Parts", "Transmission System"],
  Electronics: ["Electrical", "electronics"], // case-insensitive fallback
  Machinery: ["Machinery"],
  Tools: ["Tools"],
  Plumbing: ["Plumbing"],
  Appliances: ["Appliances"],
  Commercial: ["Commercial"]
};


export default function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromURL = searchParams.get('category') || 'All';
  

  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [categoryFromURL],
    brands: [],
    conditions: [],
    availability: [],
    priceRange: [0, 500000],
    distance: 50,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(searchParams.get('category'));
        const res = await axios.get('/api/products');
        const enriched = res.data.products.map((product) => ({
          ...product,
          vendor: {
            name: 'SmartParts Vendor',
            rating: 4.2,
            distance: 2.5,
            location: 'Colombo, Sri Lanka',
            phone: '+94 77 123 4567',
          },
        }));
        setProducts(enriched);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  const categoryKey = Object.keys(CATEGORY_MAP).find(
    key => key.toLowerCase() === categoryFromURL.toLowerCase()
  );
  
  const activeCategories =
    categoryKey && categoryKey.toLowerCase() !== 'all'
      ? CATEGORY_MAP[categoryKey].map(c => c.toLowerCase())
      : [];
  

  const filteredProducts = products.filter((product) => {
    if (
      activeCategories.length &&
      !activeCategories.includes(product.category.toLowerCase())
    ) return false;
    

    if (filters.conditions.length > 0) {
      const conditionMap = { new: 'New', used: 'Used', refurbished: 'Refurbished' };
      if (!filters.conditions.some((c) => conditionMap[c] === product.condition)) return false;
    }

    if (filters.availability.length > 0) {
      if (filters.availability.includes('in_stock') && product.quantity <= 0) return false;
      if (filters.availability.includes('out_of_stock') && product.quantity > 0) return false;
    }

    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    if (product.vendor.distance > filters.distance) return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLow': return a.price - b.price;
      case 'priceHigh': return b.price - a.price;
      case 'distance': return a.vendor.distance - b.vendor.distance;
      default: return 0;
    }
  });

  const resetFilters = () => {
    setFilters({
      categories: [categoryFromURL],
      brands: [],
      conditions: [],
      availability: [],
      priceRange: [0, 500000],
      distance: 50,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full pt-6 mt-[30px]">
      {/* Sidebar */}
      <div className="hidden lg:block w-full max-w-[280px] sticky top-[100px] h-fit">
        <FilterSidebar
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
          isMobile={false}
        />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {categoryFromURL !== 'All' ? `Browse ${categoryFromURL}` : 'All Parts'}
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

        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
          ))}
        </div>
      </div>

      {/* Mobile filter modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-start pt-12 px-4">
          <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
            <FilterSidebar
              isMobile={true}
              onClose={() => setShowMobileFilters(false)}
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
}
