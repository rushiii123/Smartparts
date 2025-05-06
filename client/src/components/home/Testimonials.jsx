import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Aruna Rupasinghe',
    role: 'Auto Repair Shop Owner',
    content: 'SmartParts has completely transformed how we source parts. The image search feature saves us hours of research time!',
    rating: 5,
    image: '/images/testo1.jpg',
  },
  {
    id: 2,
    name: 'Samanthi Rajapaksha',
    role: 'Automotive Enthusiast',
    content: 'As someone who loves automotive industry, this platform is a game-changer. I can easily find exactly what I need without the hassle.',
    rating: 5,
    image: 'images/testo3.jpeg',
  },
  {
    id: 3,
    name: 'Jayawi Prabhath',
    role: 'Electronics Repair Technician',
    content: "The real-time inventory feature has saved me so many unnecessary trips. I can see what's in stock before I even leave my shop.",
    rating: 4,
    image: 'images/testo2.jpg',
  },
];

const partnerLogos = [
  {
    name: 'AutoZone',
    image: 'images/pic1.png',
  },
  {
    name: "O'Reilly Auto Parts",
    image: 'images/pic2.png',
  },
  {
    name: 'Advance Auto Parts',
    image: 'images/pic3.jpeg',
  },
  {
    name: 'NAPA Auto Parts',
    image: 'images/pic4.jpeg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have simplified their spare parts search
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>

              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>

        {/* PARTNERS UPDATED */}
        <div className="pt-10 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-8">
            Trusted Partners
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 place-items-center">
            {partnerLogos.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center transition-transform transform hover:scale-105">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="h-16 object-contain mb-3"
                />
                <p className="text-gray-700 text-sm font-medium text-center">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
