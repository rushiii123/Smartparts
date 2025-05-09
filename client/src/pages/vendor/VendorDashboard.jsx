import React from 'react';
import { Link } from 'react-router-dom';
import { Package, DollarSign, ShoppingCart, Eye } from 'lucide-react';
import Button from '../../components/shared/Button';

const stats = [
  {
    label: 'Active Listings',
    value: '47',
    change: '+12%',
    trend: 'up',
    icon: Package,
  },
  {
    label: 'Total Sales',
    value: '$12,426',
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'Pending Requests',
    value: '8',
    change: '-2',
    trend: 'down',
    icon: ShoppingCart,
  },
  {
    label: 'Profile Views',
    value: '1,245',
    change: '+24%',
    trend: 'up',
    icon: Eye,
  },
];

const recentActivity = [
  {
    type: 'request',
    title: 'New order request',
    description: 'Brake Pads - Honda Civic 2018',
    time: '2 minutes ago',
  },
  {
    type: 'listing',
    title: 'Product listed',
    description: 'Alternator - Toyota Camry 2015',
    time: '1 hour ago',
  },
  {
    type: 'sale',
    title: 'Order completed',
    description: 'Water Pump - BMW 3 Series',
    time: '3 hours ago',
  },
];

export default function VendorDashboard() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                {React.createElement(stat.icon, { className: "w-8 h-8 text-blue-600" })}
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/vendor/add-product" className="block">
                <Button variant="outline" fullWidth>Add New Product</Button>
              </Link>
              <Link to="/vendor/listings" className="block">
                <Button variant="outline" fullWidth>Manage Listings</Button>
              </Link>
              <Link to="/order/history" className="block">
                <Button variant="outline" fullWidth>View Orders</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
