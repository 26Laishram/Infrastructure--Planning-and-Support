import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageSkeleton from '../components/PageSkeleton';
import { Link } from 'react-scroll';

const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes cache expiry

export default function Forms() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const loadData = async () => {
    try {
      const response = await axios.get(
        'https://opensheet.vercel.app/1J5-BDOrjaxf-TS7OwWpXaFXBhSHy1vW-i7WmJhcY_4M/Sheet1'
      );
      console.log("✅ Google Sheet Response:", response.data);
      setFormData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("❌ Failed to fetch forms:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);


  return (
    <div id="forms-top" className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 text-gray-800">
      <h1 className="text-3xl sm:text-3xl font-bold mb-4 text-center">IPS Forms</h1>
      <div className="mb-4 text-center">
        <a
          href="https://drive.google.com/drive/u/2/folders/1EQ8rYC1ccBZHYn7UreO3Pn9TIUoCHF_Y"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-purple-900 text-purple-700 text-sm sm:text-base font-medium"
        >
          View all forms
        </a>
      </div>

      {loading ? (
        <PageSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-red-50 border border-red-200 rounded-lg shadow p-6 my-8">
          <h2 className="text-xl font-bold text-red-700 mb-2">Unable to load forms</h2>
          <p className="text-red-600 mb-2">
            There was a problem fetching the forms from the server.
          </p>
          <p className="text-sm text-red-500 mb-4">
            Please check your internet connection or try again later.
          </p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Serial No.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Form Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Word Format</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">PDF Format</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">{row['Serial no.'] || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {row['Form name'] || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {row['Word format'] ? (
                      <a
                        href={row['Word format']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-700 hover:text-purple-900 underline"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {row['PDF format'] ? (
                      <a
                        href={row['PDF format']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900 underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
