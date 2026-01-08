import React from 'react';
import { Link } from 'react-scroll';

export default function Documents() {
  const sections = [
    {
      heading: "Tender Scrutiny Committee",
      links: [
        {
          name: "View OM",
          url: "https://drive.google.com/file/d/1wUYkMTsguCaD_I_Nmkflr4FC2VsLKm_b/view?usp=sharing"
        }
      ]
    },
    {
      heading: "PMG Project Monitoring Group Committee",
      links: [
        {
          name: "View OM",
          url: "https://drive.google.com/file/d/1lc0OSbtJTokhhG7L5uPyhDH6YvM3RjjL/view?usp=sharing"
        }
      ]
    },
    {
      heading: "Approved List of Brands (IPS Section)",
      links: [
        {
          name: "View Approved Brands",
          url: "https://docs.google.com/spreadsheets/d/1mfJxEGhfT3hyL-F7CexKmKseER4fe481/edit?usp=sharing&ouid=102934502169713820872&rtpof=true&sd=true"
        }
      ]
    }
  ];

  return (
    <div id="doc-top" className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 text-gray-800">
      <h1 className="text-3xl sm:text-3xl font-bold mb-6 text-center">OM and Committee Documents</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-black mb-4">{section.heading}</h2>
            <ol className="list-decimal ml-6 space-y-2">
              {section.links.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800"
                    style={{ textDecoration: 'none' }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Back to Top Button */}
      <div className="cursor-pointer text-center mt-10">
        <Link
          to="doc-top"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 cursor-pointer z-50"
        >
          ↑
        </Link>
      </div>
    </div>
  );
}
