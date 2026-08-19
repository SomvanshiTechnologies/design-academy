import React from 'react';
import { Helmet } from 'react-helmet-async';
import { metaData } from '../data/metaData';

export const usePageMeta = (pageKey) => {
  const meta = metaData[pageKey];


  if (!meta) {
    console.warn(`Meta data not found for page: ${pageKey}`);
    return null;
  }

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Skillora Design Academy" />
      <meta name="theme-color" content="#FF7E38" />
      <link rel="canonical" href={meta.url} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Skillora Design Academy" />
      <meta property="og:image" content="https://skilloraacademy.com/images/skillora-og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://skilloraacademy.com/images/skillora-og-image.jpg" />
      <meta name="twitter:site" content="@skilloraacademy" />
      <meta name="twitter:creator" content="@skilloraacademy" />

      {/* Additional SEO Tags */}
      <meta name="google-site-verification" content="your-google-site-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Skillora Design Academy",
          "description": meta.description,
          "url": meta.url,
          "logo": "https://skilloraacademy.com/images/skillora-logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-8329339444",
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi", "Marathi"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Office No 205, 2nd Floor, Above HDFC Bank",
            "addressLocality": "Shivaji Nagar",
            "addressRegion": "Maharashtra",
            "postalCode": "411005",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://www.facebook.com/skilloraacademy",
            "https://www.instagram.com/skilloraacademy",
            "https://www.linkedin.com/company/skillora-academy"
          ]
        })}
      </script>
    </Helmet>
  );
};