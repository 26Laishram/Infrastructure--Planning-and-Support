import React, { useState } from "react";

const categories = [
  { key: "civil", label: "Civil" },
  { key: "mechanical", label: "Mechanical" },
  { key: "electrical", label: "Electrical" },
  { key: "ccs", label: "CCS" },
];

function PeopleCategories({ onCategorySelect }) {
  return (
    <div >
      <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a2958" , margin: "0px" }}>People</h2>
      <p style={{ fontSize: "1rem", color: "#516080", marginBottom: "30px", marginTop: "0px" }}>
        Meet faculty and staff of Civil, Mechanical, Electrical, and CCS departments.
      </p>
      <div style={{ display: "flex", gap: "30px", justifyContent: "flex-start", flexWrap: "wrap" }}>
        {categories.map(c => (
          <div
            key={c.key}
            style={{
              background: "#fff",
              width: "260px",
              height: "120px",
              padding: "28px 0",
              borderRadius: "18px",
              boxShadow: "0 4px 20px rgba(60, 60, 90, 0.12)",
              textAlign: "center",
              cursor: "pointer"
            }}
            onClick={() => onCategorySelect(c.key)}
          >
            <h3 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a2958", margin: "0" }}>{c.label}</h3>
            <div style={{ fontSize: "1rem", color: "#3d4956", marginTop: "5px" }}>
              View Members
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeopleCategories;
