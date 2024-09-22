'use client';

import { useEffect, useState } from 'react';

const Variants = () => {
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the data from your API
    fetch('/api/variants')
      .then(response => response.json())
      .then(data => {
        setVariants(data);
        setFilteredVariants(data); // Initialize the filtered data with all variants
      })
      .catch(error => console.error('Error fetching variants:', error));
  }, []);

  // Handle input change for search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter the variants based on the search term
    const filtered = variants.filter(
      (variant) =>
        variant.rsid.toLowerCase().includes(term) || // Search by RSID
        variant.chrm.toLowerCase().includes(term)    // Search by chromosome
    );
    setFilteredVariants(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Genomic Variants
        </h1>

        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by RSID or Chromosome"
            className="w-full px-4 py-2 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Table */}
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
              {filteredVariants.length > 0 ? (
                filteredVariants.map((variant, index) => (
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