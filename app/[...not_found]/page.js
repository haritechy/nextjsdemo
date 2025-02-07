import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-black">
      <h2 className="text-4xl font-bold mb-4">Oops! Page Not Found – 404</h2>
      <p className="mb-6 text-lg text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Go back to Home    
      </Link>
    </div>
  );
};

export default Custom404;
