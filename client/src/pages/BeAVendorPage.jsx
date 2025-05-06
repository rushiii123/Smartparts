import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, Users, TrendingUp, BarChart, ShieldCheck } from 'lucide-react';
import Button from '../components/shared/Button';

const benefits = [
  {
    icon: Users,
    title: 'Reach More Customers',
    description: 'Connect with thousands of potential customers actively searching for parts like yours.'
  },
  {
    icon: TrendingUp,
    title: 'Increase Sales',
    description: 'Our AI-powered search ensures your products appear in relevant search results.'
  },
  {
    icon: BarChart,
    title: 'Inventory Management',
    description: 'Easy-to-use dashboard to manage your listings and track performance.'
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description: 'Low listing fees with no hidden costs. Pay only for the features you need.'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Platform',
    description: 'Protected transactions and verified customer requests for peace of mind.'
  },
  {
    icon: CheckCircle,
    title: 'Quality Leads',
    description: 'Receive detailed order requests from genuine buyers ready to purchase.'
  }
];

const pricingTiers = [
  {
    name: 'Basic',
    price: 10,
    period: 'Year',
    features: [
      'Up to 250 active listings',
      'Basic analytics',
      'Email support',
      'Standard visibility'
    ]
  },
  {
    name: 'Professional',
    price: 30,
    period: 'Year',
    features: [
      'Up to 500 active listings',
      'Advanced analytics',
      'Priority support',
      'Enhanced visibility',
      'Custom branding'
    ],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 50,
    period: 'Year',
    features: [
      'Unlimited active listings',
      'Real-time analytics',
      '24/7 dedicated support',
      'Maximum visibility',
      'Custom branding',
      'API access'
    ]
  }
];

export default function BeAVendorPage() {
  const [selectedTier, setSelectedTier] = useState('Professional');

  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Grow Your Business with SmartParts
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join our network of trusted suppliers and connect with customers looking for exactly what you offer.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/register'}
          >
            Start Selling Today
          </Button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
              >
                <Icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple, Transparent Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 bg-white rounded-lg border transition-all ${
                  tier.recommended
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      ${tier.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{tier.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.recommended ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => window.location.href = '/register'}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful vendors already using SmartParts to grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/register'}
            >
              Create Vendor Account
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
