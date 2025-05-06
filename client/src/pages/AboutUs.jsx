import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About SmartParts
          </h1>
          <p className="text-xl text-gray-600">
            We're revolutionizing how people find and purchase spare parts through innovative AI-powered technology and a vast network of trusted suppliers.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              To simplify the spare parts sourcing process by connecting customers with reliable suppliers through innovative technology, making part identification and procurement efficient and hassle-free.
            </p>
          </div>
          <div className="bg-teal-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-teal-900 mb-4">Our Vision</h2>
            <p className="text-gray-700">
              To become the world's leading platform for spare parts discovery and procurement, powered by cutting-edge AI technology and a global network of trusted suppliers.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Visit Our Office
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600">Bambalapitiya, Colombo, Sri Lanka</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600">+94 721021026</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">info@smartparts.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Hours</h3>
                <p className="text-gray-600">Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>
              <img
                src="/images/photo3.jpg"
                alt="COO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-gray-900">Sandamila Pathirana</h3>
              <p className="text-gray-600">COO</p>
            </div>
            <div>
              <img
                src="/images/photo1.jpg"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-gray-900">Rusandi Pathirana</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            <div>
              <img
                src="/images/photo2.jpg"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-gray-900">Manuri Dananga</h3>
              <p className="text-gray-600">CTO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
