import React from 'react';
import { adress, phone, email } from '../data/contact';
import { usePageMeta } from '../hooks/usePageMeta.jsx';

const PrivacyPolicy = () => {
  const pageMetaTags = usePageMeta('privacy');

  return (
    <div className="max-w-4xl py-16 pt-20 mx-auto px-4 text-gray-800">
      {pageMetaTags}
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">At Skillora Design Academy ("Skillora", "we", "our", "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website, interact with our services, and enroll in our courses.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Personal Information:</strong> Name, email address, phone number, postal address, and any other information you voluntarily provide.</li>
        <li><strong>Usage Data:</strong> Pages visited, interactions, and other analytical data collected via cookies and similar technologies.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>To provide and maintain our educational services.</li>
        <li>To process inquiries, applications, and enrollments.</li>
        <li>To send important updates, newsletters, and promotional materials (you may opt out at any time).</li>
        <li>To improve website performance and user experience.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Data Sharing & Security</h2>
      <p className="mb-4">We do not sell or rent your personal information to third parties. Data may be shared with trusted partners who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep your information confidential. We implement industry-standard security measures to protect your data.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Your Rights</h2>
      <p className="mb-4">You have the right to access, correct, or delete your personal data, and to withdraw consent at any time. To exercise these rights, please contact us using the details below.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Contact Us</h2>
      <p className="mb-1"><strong>Address:</strong> {adress}</p>
      <p className="mb-1"><strong>Phone:</strong> {phone}</p>
      <p className="mb-4"><strong>Email:</strong> {email}</p>

      <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
};

export default PrivacyPolicy;
