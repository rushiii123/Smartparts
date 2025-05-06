import { Link } from 'react-router-dom';
import { Car, Cpu, PenTool as Tool, Wrench, Atom, Cog, Truck, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'automotive',
    name: 'Automotive',
    icon: Car,
    description: 'Car and truck replacement parts',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Cpu,
    description: 'Circuit boards and components',
    color: 'bg-green-100 text-green-700',
  },
  {
    id: 'machinery',
    name: 'Machinery',
    icon: Cog,
    description: 'Industrial equipment parts',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: Tool,
    description: 'Tool parts and accessories',
    color: 'bg-red-100 text-red-700',
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: Wrench,
    description: 'Pipes, fittings, and fixtures',
    color: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'appliances',
    name: 'Appliances',
    icon: Atom,
    description: 'Home and kitchen appliance parts',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    id: 'commercial',
    name: 'Commercial',
    icon: Truck,
    description: 'Commercial equipment parts',
    color: 'bg-orange-100 text-orange-700',
  }
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the exact spare parts you need for your project or repair
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-6 rounded-lg ${category.color} text-center hover:bg-gray-100`}
            >
              <category.icon className="mx-auto text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <Link 
                to={`/search-results?category=${category.id}`}
                className="text-blue-600 inline-flex items-center"
              >
                See products <ArrowRight className="ml-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
