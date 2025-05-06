import { Search, Camera, MapPin } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Search or Snap',
    description: 'Enter product details or upload a photo of the part you need.',
    icon: Search,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    title: 'Find Matches',
    description: 'Browse results with real-time availability from local suppliers.',
    icon: Camera,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 3,
    title: 'Connect & Get',
    description: 'Request the part directly from the supplier and pick it up.',
    icon: MapPin,
    color: 'bg-teal-100 text-teal-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SmartParts makes finding spare parts simple, quick and hassle-free
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${step.color}`}>
                    <Icon size={28} />
                  </div>

                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-medium mb-4">
                    {step.id}
                  </span>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
