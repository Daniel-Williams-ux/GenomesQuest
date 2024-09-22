'use client';

import { useEffect, useState } from 'react';

const Variants = () => {
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    // Fetch the data from your API
    fetch('/api/variants')
      .then(response => response.json())
      .then(data => setVariants(data))
      .catch(error => console.error('Error fetching variants:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Genomic Variants
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white text-left text-xs sm:text-sm uppercase">
                <th className="py-3 px-4 sm:px-6">Chromosome</th>
                <th className="py-3 px-4 sm:px-6">Start Position</th>
                <th className="py-3 px-4 sm:px-6">RSID</th>
                <th className="py-3 px-4 sm:px-6">Reference</th>
                <th className="py-3 px-4 sm:px-6">Alternate</th>
                <th className="py-3 px-4 sm:px-6">Quality</th>
                <th className="py-3 px-4 sm:px-6">Filter</th>
                <th className="py-3 px-4 sm:px-6">Info</th>
              </tr>
            </thead>
            <tbody>
              {variants.length > 0 ? (
                variants.map((variant, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100 text-xs sm:text-sm">
                    <td className="py-3 px-4 sm:px-6">{variant.chrm}</td>
                    <td className="py-3 px-4 sm:px-6">{variant.start_position}</td>
                    <td className="py-3 px-4 sm:px-6">{variant.rsid}</td>
                    <td className="py-3 px-4 sm:px-6">{variant.reference_bases}</td>
                    <td className="py-3 px-4 sm:px-6">{variant.alternate_bases}</td>
                    <td className="py-3 px-4 sm:px-6">{variant.qual}</td>
                    <td className="py-3 px-4 sm:px-6">{variant.filter}</td>
                    <td className="py-3 px-4 sm:px-6">{variant.info}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 px-6">
                    No variants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Variants;