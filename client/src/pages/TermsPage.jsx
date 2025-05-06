import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Terms and Conditions
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: April 24, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 mb-4">
                Welcome to SmartParts. By accessing or using our website, you agree to be bound by these terms and conditions. If you disagree with any part of these terms, you may not access our service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. User Accounts
              </h2>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
              <p className="text-gray-600 mb-4">
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Vendor Terms
              </h2>
              <p className="text-gray-600 mb-4">
                Vendors must maintain accurate inventory information and respond to order requests promptly. All product listings must include accurate descriptions and pricing information.
              </p>
              <p className="text-gray-600 mb-4">
                Vendors are responsible for their own return and refund policies, which must be clearly stated in their listings.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Order Requests
              </h2>
              <p className="text-gray-600 mb-4">
                Order requests through our platform are not final sales. They represent an intent to purchase, subject to vendor confirmation and arrangement of payment terms directly with the vendor.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Intellectual Property
              </h2>
              <p className="text-gray-600 mb-4">
                The service and its original content, features, and functionality are owned by SmartParts and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-600 mb-4">
                SmartParts shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please{' '}
                <Link to="/contact" className="text-blue-600 hover:text-blue-500">
                  contact us
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
