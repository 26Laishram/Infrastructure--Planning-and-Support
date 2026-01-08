import React, { useEffect, useState } from "react";
import axios from "axios";
import PageSkeleton from "./PageSkeleton.jsx";

const Building = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://opensheet.elk.sh/1DKZ5V2yOgGqSze5d0Yt6g881X6tBZ19qoJl8J2-Kh9w/BWC_Committee")
      .then(res => {
        
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 text-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
      Building Works Committee
      </h1>

      {loading ? (
        <PageSkeleton />
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-red-50 border border-red-200 rounded-lg shadow p-6 my-8">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            Unable to load Dean information
          </h2>
          <p className="text-red-600 mb-2">
            There was a problem fetching the data from the server.
          </p>
          <p className="text-sm text-red-500 mb-4">
            Please check your internet connection or try again later.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-purple-800">
                <th className="px-3 py-3 text-left text-m font-medium text-white uppercase tracking-wider">
                  S. No.
                </th>
               {/*  <th className="px-3 py-3 text-left text-m font-medium text-white uppercase tracking-wider">
                  name
                </th> */}
                <th className="px-3 py-3 text-left text-m font-medium text-white uppercase tracking-wider">
                member
                </th>
                <th  className="px-3 py-3 text-left text-m font-medium text-white uppercase tracking-wider">
                role
                </th>
              </tr>
             
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={row.id || index} className="hover:bg-gray-50">
                  <td className="px-3 py-4 text-sm font-medium text-gray-900 text-left">{index + 1}</td>
                 {/* <td className="px-3 py-4 text-sm font-medium text-gray-900 text-left">{row.name}</td> */}
                  <td className="px-3 py-4 text-sm font-medium text-gray-900 text-left">{row.member}</td>
                  <td className="px-3 py-4 text-sm font-medium text-gray-900 text-left">{row.role}</td>
                  {/* <td className="px-3 py-4 text-sm font-medium text-gray-900 text-center">{row.To}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Building;
