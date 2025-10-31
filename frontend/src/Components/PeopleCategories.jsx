import React from "react";
import "../Styles/PeopleCategories.css";

const categories = [
  { key: "deans", label: "Deans" },
  { key: "associate_deans", label: "Associate Deans" },
  { key: "faculty_in_charge", label: "Faculty In-Charge" },
  { key: "staff", label: "Staff" },
];

function PeopleCategories({ onCategorySelect }) {
  return (
    <div className="people-container">
      <h2 className="people-title">People</h2>
      <p className="people-description">
        Meet faculty and staff of Deans, Associate Deans, Faculty In-Charge, and Staff departments.
      </p>

      <div className="people-grid">
        {categories.map((c) => (
          <div
            key={c.key}
            className="people-card"
            onClick={() => onCategorySelect(c.key)}
          >
            <h3 className="people-card-title">{c.label}</h3>
            <div className="people-card-subtitle">View Members</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeopleCategories;
