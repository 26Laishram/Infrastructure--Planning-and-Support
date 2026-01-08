import React from "react";

const categories = [
  { key: "deans", label: "Deans" },
  { key: "associate_deans", label: "Associate Deans" },
  { key: "faculty_in_charge", label: "Faculty In-Charge" },
  { key: "engineers", label: "Engineers" },
  { key: "staff", label: "Staff" },
];

function PeopleCategories({ onCategorySelect }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">People</h2>
      <p className="text-gray-600 mb-8">
        Meet faculty and staff of Deans, Associate Deans, Faculty In-Charge, Engineers, and Staff departments.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {categories.map((c) => (
          <div
            key={c.key}
            onClick={() => onCategorySelect(c.key)}
            className="cursor-pointer bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition-shadow duration-300 hover:bg-indigo-50 h-full flex flex-col items-center justify-center"
          >
            <h3 className="text-lg font-semibold text-gray-800">{c.label}</h3>
            <p className="text-sm text-gray-600 mt-2">View Members</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeopleCategories;
