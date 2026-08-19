import React from 'react';
import { adress, phone, email } from '../data/contact';
import { usePageMeta } from '../hooks/usePageMeta.jsx';

const TermsConditions = () => {
  const pageMetaTags = usePageMeta('terms');

  return (
    <div className="max-w-4xl py-16 pt-20 mx-auto px-4 text-gray-800">
      {pageMetaTags}
      <h1 className="text-3xl font-bold mb-6">Terms &amp; Conditions</h1>
      <p className="mb-4">These Terms &amp; Conditions ("Terms") govern your use of the Skillora Design Academy ("Skillora", "we", "our", "us") website and services. By accessing or using our site, you agree to comply with these Terms.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Use of Website</h2>
      <p className="mb-4">You agree to use our website for lawful purposes only and in a way that does not infringe the rights of others or restrict their use of the site.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Intellectual Property</h2>
      <p className="mb-4">All content, including text, graphics, logos, and course materials, are the property of Skillora or its licensors and are protected by applicable intellectual property laws. Unauthorized use is prohibited.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Course Enrollment & Payment</h2>
      <p className="mb-4">Enrollment in our courses is subject to availability and acceptance of our admission criteria. Fees are payable in advance and are non-refundable unless stated otherwise.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Limitation of Liability</h2>
      <p className="mb-4">Skillora shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Changes to Terms</h2>
      <p className="mb-4">We may revise these Terms at any time. Continued use of the website constitutes acceptance of the updated Terms.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Contact Us</h2>
      <p className="mb-1"><strong>Address:</strong> {adress}</p>
      <p className="mb-1"><strong>Phone:</strong> {phone}</p>
      <p className="mb-4"><strong>Email:</strong> {email}</p>

      <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default TermsConditions;
