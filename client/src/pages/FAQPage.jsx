import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How does the image search feature work?",
    answer: "Our AI-powered image search allows you to upload a photo of your part. The system analyzes the image and matches it with similar parts in our database, making it easier to find exactly what you need without knowing the exact part number or name."
  },
  {
    question: "How do I become a vendor on SmartParts?",
    answer: "To become a vendor, click on the 'Become a Vendor' link in the navigation menu. Fill out the registration form, provide your business details, and choose a subscription plan. Once approved, you can start listing your products."
  },
  {
    question: "What payment methods are accepted?",
    answer: "Payment methods are handled directly between vendors and customers. When you submit an order request, the vendor will contact you to arrange payment and pickup details."
  },
  {
    question: "How do I know if a part is compatible with my vehicle/device?",
    answer: "Each product listing includes detailed compatibility information. You can also use our search filters to narrow down results by make, model, and year. If you're unsure, you can always contact the vendor directly."
  },
  {
    question: "What is the return/refund policy?",
    answer: "Return and refund policies are set by individual vendors. We recommend discussing these terms with the vendor before completing your purchase. All vendors are required to clearly state their policies in their listings."
  },
  {
    question: "How long does it take to process an order request?",
    answer: "Vendors typically respond to order requests within 24-48 hours. Once they confirm availability, you can arrange pickup or delivery details directly with them."
  },
  {
    question: "Can I track my order request?",
    answer: "Yes, you can track the status of your order requests through your user dashboard. You'll also receive email notifications when vendors respond to your requests."
  },
  {
    question: "What if I receive the wrong part?",
    answer: "Contact the vendor immediately through our platform. If you can't resolve the issue directly with the vendor, our support team is here to help mediate the situation."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about using SmartParts
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Still have questions?{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-500 font-medium">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
