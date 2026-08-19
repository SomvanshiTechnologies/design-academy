import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { usePageMeta } from '../hooks/usePageMeta.jsx';

const Gallery = () => {
  const pageMetaTags = usePageMeta('gallery');
  const images = Array.from({ length: 9 }, (_, i) => `/assets/1 (${i + 1}).jpeg`);

  return (
    <>
    {pageMetaTags}
    {/* <Navbar /> */}
    <h2 className='py-10 text-center dm-sans text-4xl text-orange-500'>Made with ❤️ by our students -</h2>
    <div className="p-4 md:px-20">
        <h2></h2>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery Image ${index + 1}`}
            className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        ))}
      </div>
    </div>
    {/* <Footer /> */}
    </>
  );
};

export default Gallery;
